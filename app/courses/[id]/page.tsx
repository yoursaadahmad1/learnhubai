"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, Users, Star, BookOpen, Award, CheckCircle } from "lucide-react"

const courses = {
  "web-development": {
    title: "Complete Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, React, and Node.js in this comprehensive course",
    instructor: "Sarah Johnson",
    duration: "12 weeks",
    students: 1234,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
    price: 99.99,
    curriculum: [
      "Introduction to Web Development",
      "HTML5 & CSS3 Fundamentals",
      "JavaScript Programming",
      "React.js Framework",
      "Node.js & Express",
      "Database Integration",
      "Authentication & Security",
      "Deployment & Best Practices"
    ],
    features: [
      "24/7 Access to Course Content",
      "Project-Based Learning",
      "Live Coding Sessions",
      "Code Reviews",
      "Certificate of Completion",
      "Job Support"
    ]
  },
  "data-science": {
    title: "Data Science Fundamentals",
    description: "Learn Python, pandas, NumPy, and machine learning basics",
    instructor: "Michael Chen",
    duration: "10 weeks",
    students: 856,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    price: 89.99,
    curriculum: [
      "Python Programming Basics",
      "Data Analysis with Pandas",
      "Statistical Analysis",
      "Machine Learning Fundamentals",
      "Data Visualization",
      "Real-world Projects",
      "Model Deployment"
    ],
    features: [
      "Hands-on Projects",
      "Real Dataset Analysis",
      "Industry Case Studies",
      "Mentorship Support",
      "Career Guidance",
      "Certification"
    ]
  },
  "ui-design": {
    title: "UI/UX Design Masterclass",
    description: "Create beautiful user interfaces and enhance user experience",
    instructor: "Emily Parker",
    duration: "8 weeks",
    students: 645,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80",
    price: 79.99,
    curriculum: [
      "Design Principles",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Visual Design",
      "Design Systems",
      "User Testing"
    ],
    features: [
      "Design Software Training",
      "Portfolio Development",
      "Design Critiques",
      "Industry Projects",
      "Job Interview Prep",
      "Design Community Access"
    ]
  }
}

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  const course = courses[courseId as keyof typeof courses]

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold text-white mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-white/90 mb-6">
                {course.description}
              </p>
              <div className="flex items-center gap-6 text-white/80 mb-8">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  {course.students} students
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-400" />
                  {course.rating} rating
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button size="lg" className="animate-pulse">
                  Enroll Now for ${course.price}
                </Button>
                <Button variant="outline" size="lg">
                  Preview Course
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <BookOpen className="h-6 w-6 mr-2" />
                Course Curriculum
              </h2>
              <div className="space-y-4">
                {course.curriculum.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Award className="h-6 w-6 mr-2" />
                Course Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 rounded-lg bg-muted/50"
                  >
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold mb-2">${course.price}</div>
                <Button className="w-full mb-4">Enroll Now</Button>
                <p className="text-sm text-muted-foreground">
                  30-day money-back guarantee
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Instructor</span>
                  <span className="font-medium">{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Students</span>
                  <span className="font-medium">{course.students}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-medium flex items-center">
                    {course.rating}
                    <Star className="h-4 w-4 text-yellow-400 ml-1" />
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}