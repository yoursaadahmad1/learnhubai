"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function PaymentErrorPage() {
  const params = useParams()
  const courseId = params.courseId as string

  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
          <p className="text-muted-foreground">
            We couldn't process your payment. Please try again or contact support.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href={`/payment/${courseId}`}>
              Try Again
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/support">
              Contact Support
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}