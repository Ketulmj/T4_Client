import { useState } from "react"
import PaymentModal from "./PaymentModal"

function PricingCard({ name, price, period, features, featured }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  return (
    <>
      <div className="relative p-6 bg-zinc-900 rounded-lg border border-zinc-800">
        {featured && (
          <div className="absolute -top-2 right-4 bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white">{name}</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-5xl font-bold tracking-tight text-white">${price}</span>
              <span className="ml-1 text-sm font-medium text-zinc-400">/{period}</span>
            </div>
          </div>
          <button
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            onClick={() => setShowPaymentModal(true)}
          >
            Get {name}
          </button>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-zinc-400"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-sm text-zinc-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        plan={{ name, price, period }}
      />
    </>
  )
}

export default PricingCard