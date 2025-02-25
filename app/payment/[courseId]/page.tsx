"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Shield, GoalIcon as PaypalIcon, AppleIcon, CirclePlayIcon as GooglePayIcon } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"

const courses = {
  "web-development": {
    title: "Complete Web Development Bootcamp",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  },
  "data-science": {
    title: "Data Science Fundamentals",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
  },
  "ui-design": {
    title: "UI/UX Design Masterclass",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5"
  }
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PaymentPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string
  const course = courses[courseId as keyof typeof courses]
  
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: ""
  })

  if (!course) {
    return <div>Course not found</div>
  }

  const handlePayment = async () => {
    setLoading(true)
    setError("")

    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error("Stripe failed to initialize")

      // Create payment intent
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          amount: course.price * 100, // Convert to cents
          paymentMethod
        }),
      })

      if (!response.ok) {
        throw new Error("Payment failed")
      }

      const { clientSecret } = await response.json()

      // Confirm the payment
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            number: cardDetails.number,
            exp_month: parseInt(cardDetails.expiry.split("/")[0]),
            exp_year: parseInt(cardDetails.expiry.split("/")[1]),
            cvc: cardDetails.cvc,
          },
          billing_details: {
            name: cardDetails.name,
          },
        },
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }

      // Payment successful
      router.push(`/payment/${courseId}/success`)
    } catch (err: any) {
      setError(err.message)
      router.push(`/payment/${courseId}/error`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Summary */}
          <Card className="p-6">
            <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
              <img
                src={course.image}
                alt={course.title}
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <div className="text-2xl font-bold text-primary">${course.price}</div>
          </Card>

          {/* Payment Form */}
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="font-medium">Secure Payment</span>
                </div>
                <Shield className="h-5 w-5 text-primary" />
              </div>

              {error && (
                <Alert variant="destructive">
                  {error}
                </Alert>
              )}

              <div className="space-y-4">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input
                          id="cardExpiry"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardCvc">CVC</Label>
                        <Input
                          id="cardCvc"
                          value={cardDetails.cvc}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handlePayment}
                  className="w-full text-lg h-12"
                  disabled={loading}
                >
                  {loading ? "Processing..." : `Pay $${course.price}`}
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  By clicking Pay, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}