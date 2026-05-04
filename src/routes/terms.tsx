import { createFileRoute, Link } from '@tanstack/react-router'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { Reveal } from '../components/Reveal'

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [
      { title: 'Terms & Conditions — ORIGEN' },
      { name: 'description', content: 'Terms and Conditions for ORIGEN morning ritual products.' },
    ],
  }),
  component: TermsPage,
})

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="serif text-2xl text-primary mb-4">{title}</h2>
      <div className="text-foreground/80 leading-[1.9] space-y-3">{children}</div>
    </div>
  )
}

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-40 pb-32 px-6 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="eyebrow">Legal</span>
            <h1 className="serif mt-6 text-5xl md:text-6xl leading-[1.05]">Terms &amp; Conditions</h1>
            <p className="mt-4 text-sm text-muted-foreground">Last updated: May 2026</p>
          </Reveal>

          <Reveal delay={150} className="mt-16 space-y-12">
            <Section title="1. Acceptance of Terms">
              <p>By accessing and using the ORIGEN website, you accept and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our website or purchase our products.</p>
            </Section>

            <Section title="2. Products and Descriptions">
              <p>We take care to ensure all product descriptions, images, and specifications are accurate. However, colours and appearances may vary slightly due to individual monitor settings and screen calibrations.</p>
              <p>We reserve the right to modify product descriptions, pricing, and availability at any time without prior notice. Products are subject to availability.</p>
            </Section>

            <Section title="3. Pricing and Payment">
              <p>All prices are displayed in your selected currency. Prices are inclusive of applicable VAT where required by law. We accept all major credit and debit cards. Payment is processed securely at checkout via Shopify's encrypted payment gateway.</p>
              <p>We reserve the right to change prices at any time. The price applicable to your order will be the price displayed at the time you place your order.</p>
            </Section>

            <Section title="4. Order Processing">
              <p>Once you place an order, you will receive a confirmation email to the address provided. This confirmation does not constitute acceptance of your order — it is an acknowledgment that we have received it.</p>
              <p>We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraudulent activity. If payment has been taken for a cancelled order, a full refund will be issued within 5–10 business days.</p>
            </Section>

            <Section title="5. Shipping and Delivery">
              <p>We aim to dispatch orders within 2–3 business days of payment confirmation. Estimated delivery times vary by location and are provided as a guide only. We are not responsible for delays caused by postal services, customs processing, or circumstances beyond our reasonable control.</p>
              <p>Risk of loss and title for products purchased pass to you upon delivery. Please ensure your delivery address is correct at the time of ordering.</p>
            </Section>

            <Section title="6. Returns and Refunds">
              <p>Please refer to our <Link to="/refund-policy" className="text-primary hover:underline">Refund Policy</Link> for full details on returns, refunds, and exchanges.</p>
            </Section>

            <Section title="7. Intellectual Property">
              <p>All content on this website, including but not limited to text, images, logos, videos, and design, is the property of ORIGEN and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without our prior written permission.</p>
            </Section>

            <Section title="8. Limitation of Liability">
              <p>To the fullest extent permitted by applicable law, ORIGEN shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products, even if we have been advised of the possibility of such damages.</p>
              <p>Our total liability to you for any claim arising from these Terms shall not exceed the amount you paid for the product giving rise to that claim.</p>
            </Section>

            <Section title="9. Governing Law">
              <p>These Terms and Conditions are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
            </Section>

            <Section title="10. Changes to These Terms">
              <p>We reserve the right to update these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following any changes constitutes your acceptance of the updated Terms.</p>
            </Section>

            <Section title="11. Contact">
              <p>For any questions regarding these Terms and Conditions, please contact us at <a href="mailto:hello@origen.co" className="text-primary hover:underline">hello@origen.co</a>.</p>
            </Section>
          </Reveal>

          <Reveal delay={300} className="mt-16">
            <Link to="/" className="btn-gold">← Back to home</Link>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  )
}
