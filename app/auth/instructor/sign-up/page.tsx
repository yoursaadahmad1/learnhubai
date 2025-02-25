"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { GraduationCap } from "lucide-react"

export default function InstructorSignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [expertise, setExpertise] = useState("")
  const [experience, setExperience] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      })

      if (signUpError) throw signUpError

      if (user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: user.id,
              full_name: fullName,
              role: 'instructor',
            }
          ])

        if (profileError) throw profileError

        // Create instructor application
        const { error: applicationError } = await supabase
          .from('instructor_applications')
          .insert([
            {
              user_id: user.id,
              expertise: expertise.split(',').map(item => item.trim()),
              experience,
              status: 'pending'
            }
          ])

        if (applicationError) throw applicationError

        router.push('/dashboard/instructor')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Become an Instructor</h1>
          <p className="text-muted-foreground mt-2">Share your knowledge with the world</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <Label htmlFor="expertise">Areas of Expertise</Label>
            <Input
              id="expertise"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              placeholder="e.g., Web Development, Data Science (comma-separated)"
              required
            />
          </div>

          <div>
            <Label htmlFor="experience">Teaching Experience</Label>
            <Textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Describe your teaching experience and qualifications"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/instructor/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
          <p className="mt-2">
            <Link href="/auth" className="text-muted-foreground hover:text-primary">
              ← Back to selection
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}