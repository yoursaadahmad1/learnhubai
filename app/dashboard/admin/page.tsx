"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Users,
  GraduationCap,
  DollarSign,
  UserPlus,
  BookOpen,
  CheckCircle,
  XCircle
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

export default function AdminDashboard() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-bold">1,234</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Instructors</p>
                <h3 className="text-2xl font-bold">56</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <h3 className="text-2xl font-bold">89</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold">$12,345</h3>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="instructors" className="space-y-4">
          <TabsList>
            <TabsTrigger value="instructors">Instructor Applications</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          <TabsContent value="instructors" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Pending Applications</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Expertise</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell>john@example.com</TableCell>
                    <TableCell>Web Development</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Courses</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Web Development Bootcamp</TableCell>
                    <TableCell>Sarah Johnson</TableCell>
                    <TableCell>234</TableCell>
                    <TableCell>$4,680</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        Active
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
              <div className="h-[300px] flex items-center justify-center border rounded-lg">
                <BarChart className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Revenue Chart</span>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}