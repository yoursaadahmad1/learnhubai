import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    id: "web-development",
    title: "Complete Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, React, and Node.js in this comprehensive course",
    instructor: "Sarah Johnson",
    duration: "12 weeks",
    students: 1234,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
    price: 99.99
  },
  {
    id: "data-science",
    title: "Data Science Fundamentals",
    description: "Learn Python, pandas, NumPy, and machine learning basics",
    instructor: "Michael Chen",
    duration: "10 weeks",
    students: 856,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    price: 89.99
  },
  {
    id: "ui-design",
    title: "UI/UX Design Masterclass",
    description: "Create beautiful user interfaces and enhance user experience",
    instructor: "Emily Parker",
    duration: "8 weeks",
    students: 645,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80",
    price: 79.99
  }
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <div className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Explore Our Courses
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our wide range of professional courses designed to help you advance your career and achieve your goals.
            </p>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="group overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {course.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${course.price}</span>
                  <Button asChild>
                    <Link href={`/courses/${course.id}`}>
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}