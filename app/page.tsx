import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, BookOpen, Users, Trophy, Timer } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals and subject matter experts"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Interactive Learning",
      description: "Engage with peers and instructors in real-time discussions"
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Earn Certificates",
      description: "Get recognized for your achievements with verified certificates"
    },
    {
      icon: <Timer className="h-6 w-6" />,
      title: "Learn at Your Pace",
      description: "Access course content anytime, anywhere at your convenience"
    }
  ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Transform Your Future with
              <span className="text-primary block mt-2">Online Learning</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000">
              Access world-class education from anywhere. Learn new skills, advance your career, and explore your passions with our comprehensive online courses.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <Button size="lg" asChild>
                <Link href="/courses">
                  Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Why Choose LearnHub?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover the advantages of learning with our platform
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="group relative overflow-hidden transition-all hover:shadow-lg">
                <div className="p-6">
                  <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}