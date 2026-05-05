import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";

export interface CartItem {
  lineId: string | null;
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  cartMessage: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  clearCartMessage: () => void;
  addItem: (item: Omit<CartItem, "lineId">) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
}

const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) {
      id
      checkoutUrl
      totalQuantity
      lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } quantity } } }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { id lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } } }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { id } userErrors { field message } }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { id } userErrors { field message } }
  }
`;

function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

function isCartNotFoundError(userErrors: Array<{ field: string[] | null; message: string }>): boolean {
  return userErrors.some((e) => {
    const m = e.message.toLowerCase();
    return m.includes("cart not found") || m.includes("does not exist");
  });
}

function formatUserErrors(userErrors: Array<{ message: string }>, fallback: string): string {
  return userErrors.map((e) => e.message).filter(Boolean).join(" ") || fallback;
}

async function createShopifyCart(item: CartItem) {
  const data = await storefrontApiRequest<any>(CART_CREATE_MUTATION, {
    input: { lines: [{ quantity: item.quantity, merchandiseId: item.variantId }] },
  });
  if (!data) return { error: "Shopify did not return a cart. Please try again." };
  if (data?.data?.cartCreate?.userErrors?.length > 0) {
    console.error("Cart creation failed:", data.data.cartCreate.userErrors);
    return { error: formatUserErrors(data.data.cartCreate.userErrors, "This item could not be added to the cart.") };
  }
  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return { error: "Shopify did not return a checkout link. Please try again." };
  const lineId = cart.lines.edges[0]?.node?.id;
  if (!lineId) return { error: "Shopify did not add this item to the cart." };
  return { cartId: cart.id as string, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId: lineId as string };
}

async function addLineToShopifyCart(cartId: string, item: CartItem) {
  const data = await storefrontApiRequest<any>(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity: item.quantity, merchandiseId: item.variantId }],
  });
  const userErrors = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false, error: formatUserErrors(userErrors, "This item could not be added to the cart.") };
  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const newLine = lines.find((l: any) => l.node.merchandise.id === item.variantId);
  return { success: true, lineId: newLine?.node?.id as string | undefined };
}

async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number) {
  const data = await storefrontApiRequest<any>(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  const userErrors = data?.data?.cartLinesUpdate?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false, error: formatUserErrors(userErrors, "This quantity could not be updated.") };
  return { success: true };
}

async function removeLineFromShopifyCart(cartId: string, lineId: string) {
  const data = await storefrontApiRequest<any>(CART_LINES_REMOVE_MUTATION, { cartId, lineIds: [lineId] });
  const userErrors = data?.data?.cartLinesRemove?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false, error: formatUserErrors(userErrors, "This item could not be removed.") };
  return { success: true };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      cartMessage: null,
      isLoading: false,
      isSyncing: false,
      isOpen: false,
      setOpen: (v) => set({ isOpen: v }),
      clearCartMessage: () => set({ cartMessage: null }),

      addItem: async (item) => {
        const { items, cartId, clearCart } = get();
        const existing = items.find((i) => i.variantId === item.variantId);
        set({ isLoading: true });
        try {
          if (!cartId) {
            const result = await createShopifyCart({ ...item, lineId: null });
            if ("error" in result) {
              set({ cartMessage: result.error, isOpen: true });
            } else {
              set({
                cartId: result.cartId,
                checkoutUrl: result.checkoutUrl,
                items: [{ ...item, lineId: result.lineId }],
                isOpen: true,
                cartMessage: null,
              });
            }
          } else if (existing) {
            if (!existing.lineId) return;
            const newQty = existing.quantity + item.quantity;
            const result = await updateShopifyCartLine(cartId, existing.lineId, newQty);
            if (result.success) {
              const cur = get().items;
              set({
                items: cur.map((i) => (i.variantId === item.variantId ? { ...i, quantity: newQty } : i)),
                isOpen: true,
                cartMessage: null,
              });
            } else if (result.cartNotFound) clearCart();
            else set({ cartMessage: result.error ?? "This cart item could not be updated." });
          } else {
            const result = await addLineToShopifyCart(cartId, { ...item, lineId: null });
            if (result.success) {
              const cur = get().items;
              set({ items: [...cur, { ...item, lineId: result.lineId ?? null }], isOpen: true, cartMessage: null });
            } else if (result.cartNotFound) clearCart();
            else set({ cartMessage: result.error ?? "This item could not be added to the cart.", isOpen: true });
          }
        } catch (e) {
          console.error("Failed to add item:", e);
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(variantId);
          return;
        }
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const result = await updateShopifyCartLine(cartId, item.lineId, quantity);
          if (result.success) {
            const cur = get().items;
            set({ items: cur.map((i) => (i.variantId === variantId ? { ...i, quantity } : i)), cartMessage: null });
          } else if (result.cartNotFound) clearCart();
          else set({ cartMessage: result.error ?? "This quantity could not be updated." });
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (variantId) => {
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const result = await removeLineFromShopifyCart(cartId, item.lineId);
          if (result.success) {
            const cur = get().items;
            const next = cur.filter((i) => i.variantId !== variantId);
            if (next.length === 0) clearCart();
            else set({ items: next, cartMessage: null });
          } else if (result.cartNotFound) clearCart();
          else set({ cartMessage: result.error ?? "This item could not be removed." });
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null, cartMessage: null }),
      getCheckoutUrl: () => get().checkoutUrl,

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;
        set({ isSyncing: true });
        try {
          const data = await storefrontApiRequest<any>(CART_QUERY, { id: cartId });
          if (!data) return;
          const cart = data?.data?.cart;
          if (!cart || cart.totalQuantity === 0) clearCart();
          else {
            const cartLines = cart.lines?.edges ?? [];
            const lineIds = new Set(cartLines.map((l: any) => l.node.id));
            const variantIds = new Set(cartLines.map((l: any) => l.node.merchandise.id));
            const syncedItems = get().items.filter((i) => (i.lineId ? lineIds.has(i.lineId) : variantIds.has(i.variantId)));
            const removedItems = syncedItems.length < get().items.length;
            set({
              items: syncedItems,
              checkoutUrl: cart.checkoutUrl ? formatCheckoutUrl(cart.checkoutUrl) : get().checkoutUrl,
              cartMessage: removedItems
                ? "Shopify removed one or more items before checkout because they are not currently available for this checkout setup."
                : get().cartMessage,
            });
          }
        } catch (e) {
          console.error("Failed to sync cart:", e);
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: "shopify-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
      }),
    },
  ),
);