"use client"

import { useState, useEffect, useRef } from "react"

const paymentMethods = [
  {
    id: "paypal",
    name: "PayPal",
    logo: "https://placeholder.pics/svg/120x40/DEDEDE/555555/PayPal",
    description: "Pay with your PayPal account",
  },
  {
    id: "stripe",
    name: "Stripe",
    logo: "https://placeholder.pics/svg/120x40/DEDEDE/555555/Stripe",
    description: "Pay with credit card",
  },
  {
    id: "mollie",
    name: "Mollie",
    logo: "https://placeholder.pics/svg/120x40/DEDEDE/555555/Mollie",
    description: "Pay with European payment methods",
  },
]

function PaymentModal({ isOpen, onClose, plan }) {
  const [selectedMethod, setSelectedMethod] = useState("stripe")
  const [isLoading, setIsLoading] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose()
    }

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulated payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="w-full max-w-[500px] bg-zinc-900 border border-zinc-800 text-white rounded-lg shadow-xl"
      >
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-medium">Choose payment method</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-medium text-zinc-400">Selected plan</h3>
              <div className="text-right">
                <div className="text-sm font-medium">{plan.name}</div>
                <div className="text-2xl font-bold">
                  €{plan.price}
                  <span className="text-sm text-zinc-400">/{plan.period}</span>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedMethod === method.id
                      ? "border-blue-600 bg-blue-600/10"
                      : "border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="payment-method"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={() => setSelectedMethod(method.id)}
                        className="sr-only"
                      />
                      <div
                        className={`h-4 w-4 rounded-full border ${
                          selectedMethod === method.id ? "border-2 border-blue-600" : "border-zinc-700"
                        }`}
                      >
                        {selectedMethod === method.id && (
                          <div className="h-2 w-2 rounded-full bg-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-zinc-400">{method.description}</div>
                    </div>
                  </div>
                  <div className="h-8 w-20 relative">
                    <img src={method.logo || "/placeholder.svg"} alt={method.name} className="object-contain h-full" />
                  </div>
                </label>
              ))}
            </div>
          </div>
          <button
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              isLoading ? "bg-blue-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Continue to payment"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal