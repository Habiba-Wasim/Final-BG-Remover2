"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import PricingCard from "@/components/PricingCard"

export default function Pricing() {
  return (
    <div className="py-16 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your needs. All plans include access to our background removal tool.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            title="Free"
            price="$0"
            features={["5 images per day", "Standard quality", "Basic support", "No watermarks", "Web access only"]}
            buttonText="Get Started"
            buttonLink="/signup"
            popular={false}
            delay={0}
          />
          <PricingCard
            title="Pro"
            price="$9.99"
            period="per month"
            features={[
              "100 images per day",
              "HD quality",
              "Priority support",
              "No watermarks",
              "API access",
              "Bulk processing",
            ]}
            buttonText="Try Pro"
            buttonLink="/signup"
            popular={true}
            delay={0.1}
          />
          <PricingCard
            title="Enterprise"
            price="$49.99"
            period="per month"
            features={[
              "Unlimited images",
              "Ultra HD quality",
              "24/7 dedicated support",
              "No watermarks",
              "Full API access",
              "Bulk processing",
              "Custom integration",
            ]}
            buttonText="Contact Sales"
            buttonLink="/contact"
            popular={false}
            delay={0.2}
          />
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are
                  processed securely through our payment providers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Can I upgrade or downgrade my plan?</h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the
                  prorated difference. If you downgrade, you'll receive credit towards your next billing cycle.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Do you offer refunds?</h3>
                <p className="text-gray-600">
                  We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service,
                  contact our support team within 14 days of your purchase for a full refund.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">What happens if I exceed my daily image limit?</h3>
                <p className="text-gray-600">
                  If you exceed your daily image limit, you'll need to wait until the next day to process more images or
                  upgrade to a higher plan with a larger limit.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Do you offer custom plans?</h3>
                <p className="text-gray-600">
                  Yes, we offer custom plans for businesses with specific needs. Contact our sales team to discuss your
                  requirements and get a custom quote.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <Link href="/contact" className="btn-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

