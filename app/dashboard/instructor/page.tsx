"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Users,
  BookOpen,
  DollarSign,
  Upload,
  Plus
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function InstructorDashboard() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <Button asChild>
            <Link href="/dashboard/instructor/upload">
              <Plus className="h-4 w-4 mr-2" />
              Create New Course
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <h3 className="text-2xl font-bold">1,234</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <h3 className="text-2xl font-bold">$9,876</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <h3 className="text-2xl font-bold">4.8</h3>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-4">
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <Card className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Web Development Bootcamp</TableCell>
                    <TableCell>234</TableCell>
                    <TableCell>4.8</TableCell>
                    <TableCell>$4,680</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        Active
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Earnings Overview</h2>
              <div className="h-[300px] flex items-center justify-center border rounded-lg">
                <BarChart className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Earnings Chart</span>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Student Enrollments</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Enrolled Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Alice Smith</TableCell>
                    <TableCell>Web Development Bootcamp</TableCell>
                    <TableCell>75%</TableCell>
                    <TableCell>2024-03-15</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}