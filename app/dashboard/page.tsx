"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Clock,
  GraduationCap,
  BarChart,
  CreditCard
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
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function UserDashboard() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <Button asChild>
            <Link href="/courses">
              Browse Courses
            </Link>
          </Button>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                <h3 className="text-2xl font-bold">4</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Hours Learned</p>
                <h3 className="text-2xl font-bold">26</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Certificates</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Avg. Progress</p>
                <h3 className="text-2xl font-bold">68%</h3>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-4">
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <Card className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Web Development Bootcamp</TableCell>
                    <TableCell>Sarah Johnson</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={75} className="w-[100px]" />
                        <span>75%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm">Continue</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-4">
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Web Development Certificate</h3>
                    <p className="text-sm text-muted-foreground">Completed on March 15, 2024</p>
                  </div>
                  <Button variant="outline">Download</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Web Development Bootcamp</TableCell>
                    <TableCell>$99.99</TableCell>
                    <TableCell>March 15, 2024</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        Completed
                      </span>
                    </TableCell>
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