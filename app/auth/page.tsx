"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, UserCog, Users } from "lucide-react"
import Link from "next/link"

export default function AuthSelectionPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Welcome to LearnHub</h1>
          <p className="text-muted-foreground">Choose how you want to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student Option */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Student</h2>
              <p className="text-sm text-muted-foreground">
                Learn from expert instructors and advance your skills
              </p>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/auth/student/sign-in">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/auth/student/sign-up">Create Account</Link>
              </Button>
            </div>
          </Card>

          {/* Instructor Option */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Instructor</h2>
              <p className="text-sm text-muted-foreground">
                Share your knowledge and teach students worldwide
              </p>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/auth/instructor/sign-in">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/auth/instructor/sign-up">Create Account</Link>
              </Button>
            </div>
          </Card>

          {/* Admin Option */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCog className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Admin</h2>
              <p className="text-sm text-muted-foreground">
                Manage the platform and oversee operations
              </p>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/auth/admin/sign-in">Sign In</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}