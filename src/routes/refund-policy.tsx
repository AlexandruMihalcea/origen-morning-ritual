import { createFileRoute, Link } from '@tanstack/react-router'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { Reveal } from '../components/Reveal'

export const Route = createFileRoute('/refund-policy')({
  head: () => ({
    meta: [
      { title: 'Refund Policy — ORIGEN' },
      { name: 'description', content: "ORIGEN's returns and refund policy. 30-day returns on unused items." },
    ],
  }),
  component: RefundPage,
})

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="serif text-2xl text-primary mb-4">{title}</h2>
      <div className="text-foreground/80 leading-[1.9] space-y-3">{children}</div>
    </div>
  )
}

function RefundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-40 pb-32 px-6 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="eyebrow">Legal</span>
            <h1 className="serif mt-6 text-5xl md:text-6xl leading-[1.05]">Refund Policy</h1>
            <p className="mt-4 text-sm text-muted-foreground">Last updated: May 2026</p>
          </Reveal>

          <Reveal delay={150} className="mt-16 space-y-12">
            <Section title="Our Promise">
              <p>We want you to love your ORIGEN morning ritual. If for any reason you are not completely satisfied with your purchase, we are here to help. Please read our policy carefully before initiating a return.</p>
            </Section>

            <Section title="30-Day Returns">
              <p>You have 30 days from the date of delivery to return any eligible item. To qualify for a return, items must be:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Unused and in the same condition as received</li>
                <li>In their original packaging</li>
                <li>Accompanied by proof of purchase</li>
              </ul>
            </Section>

            <Section title="How to Return">
              <p>To initiate a return, please email us at <a href="mailto:origenltd@proton.me" className="text-primary hover:underline">origenltd@proton.me</a> with:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Your order number</li>
                <li>The item(s) you wish to return</li>
                <li>The reason for your return</li>
              </ul>
              <p className="mt-3">We will respond within 24 hours with return instructions and a return address.</p>
            </Section>

            <Section title="Hygiene Items">
              <p>For hygiene and safety reasons, the following items cannot be returned once opened, unless they are faulty or materially not as described:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>The Roller (jade facial roller) — personal care item</li>
                <li>The Oil (facial oil) — once the seal is broken</li>
              </ul>
              <p className="mt-3">The Mat (acupressure mat) may be returned unused and in original packaging within 30 days.</p>
            </Section>

            <Section title="Refunds">
              <p>Once we receive and inspect your returned item, we will notify you of the outcome. If approved, your refund will be processed within 5–10 business days and credited to your original payment method.</p>
              <p>Please note that original shipping costs are non-refundable unless the return is due to a faulty or incorrect item.</p>
            </Section>

            <Section title="Return Shipping">
              <p>Return shipping costs are the responsibility of the customer, unless the item arrived damaged, faulty, or not as described. We recommend using a tracked shipping service for your return, as we cannot be held responsible for items lost in transit.</p>
            </Section>

            <Section title="Faulty or Incorrect Items">
              <p>If your item arrives damaged, defective, or is not the item you ordered, please contact us immediately at <a href="mailto:origenltd@proton.me" className="text-primary hover:underline">origenltd@proton.me</a> with your order number and photos of the issue.</p>
              <p>We will arrange a full refund or replacement at no additional cost to you, including covering return shipping where applicable.</p>
            </Section>

            <Section title="Exchanges">
              <p>We do not currently offer direct exchanges. If you wish to exchange an item, please return it for a refund and place a new order for the desired item.</p>
            </Section>

            <Section title="Contact">
              <p>If you have any questions about our refund policy, please contact us at <a href="mailto:origenltd@proton.me" className="text-primary hover:underline">origenltd@proton.me</a>. We aim to respond to all enquiries within 24 hours.</p>
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
