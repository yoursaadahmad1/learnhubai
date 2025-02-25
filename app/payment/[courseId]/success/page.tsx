"use client"

import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const params = useParams()
  const courseId = params.courseId as string

  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. You can now access your course.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href={`/courses/${courseId}`}>
              Start Learning
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}