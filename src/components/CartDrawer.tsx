import { useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export function CartDrawer() {
  const {
    items,
    isLoading,
    isSyncing,
    isOpen,
    setOpen,
    updateQuantity,
    removeItem,
    getCheckoutUrl,
    syncCart,
  } = useCartStore();

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode || "USD";

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Cart"
          className="relative text-foreground/80 hover:text-primary transition-colors"
        >
          <ShoppingBag className="h-5 w-5" strokeWidth={1.25} />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-4 min-w-4 px-1 rounded-full text-[10px] flex items-center justify-center bg-primary text-primary-foreground border-0">
              {totalItems}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-l border-border/50">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="serif text-2xl font-normal">Your ritual</SheetTitle>
          <SheetDescription className="eyebrow text-foreground/60">
            {totalItems === 0 ? "Empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <ShoppingBag className="h-10 w-10 text-foreground/30 mx-auto mb-4" strokeWidth={1} />
                <p className="serif italic text-foreground/60">Your ritual awaits.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-1 min-h-0">
                <div className="space-y-6">
                  {items.map((item) => {
                    const img = item.product.node.images?.edges?.[0]?.node;
                    return (
                      <div key={item.variantId} className="flex gap-4 pb-6 border-b border-border/40">
                        <div className="w-20 h-24 bg-card overflow-hidden flex-shrink-0">
                          {img ? (
                            <img src={img.url} alt={img.altText || item.product.node.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full grain" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col">
                          <h4 className="serif text-base leading-tight">{item.product.node.title}</h4>
                          {item.variantTitle !== "Default Title" && (
                            <p className="text-xs text-foreground/60 mt-1">{item.variantTitle}</p>
                          )}
                          <p className="text-sm text-primary mt-2">
                            {currency} {parseFloat(item.price.amount).toFixed(2)}
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center gap-2 border border-border/60">
                              <button
                                className="h-7 w-7 grid place-items-center hover:text-primary"
                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                aria-label="Decrease"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-xs w-5 text-center">{item.quantity}</span>
                              <button
                                className="h-7 w-7 grid place-items-center hover:text-primary"
                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                aria-label="Increase"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.variantId)}
                              className="text-foreground/50 hover:text-primary"
                              aria-label="Remove"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-5 pt-6 border-t border-border/40">
                <div className="flex justify-between items-baseline">
                  <span className="eyebrow">Subtotal</span>
                  <span className="serif text-2xl text-primary">
                    {currency} {totalPrice.toFixed(2)}
                  </span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full btn-gold justify-center"
                  disabled={items.length === 0 || isLoading || isSyncing}
                  variant="ghost"
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Checkout <ExternalLink className="w-3 h-3 ml-2" />
                    </>
                  )}
                </Button>
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-foreground/40 text-center">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}