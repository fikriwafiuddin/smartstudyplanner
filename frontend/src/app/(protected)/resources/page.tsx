"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  FileText,
  Link as LinkIcon,
  Download,
  ExternalLink,
  MoreVertical,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSemester } from "@/context/SemesterContext"

const mockResources = [
  {
    id: 1,
    semesterId: 1,
    title: "Introduction to HCI Slides",
    course: "Human Computer Interaction",
    type: "file",
    extension: "pdf",
    size: "2.4 MB",
    updatedAt: "2024-01-10",
  },
  {
    id: 2,
    semesterId: 1,
    title: "React Documentation",
    course: "Human Computer Interaction",
    type: "link",
    url: "https://react.dev",
    updatedAt: "2024-01-12",
  },
  {
    id: 3,
    semesterId: 2,
    title: "Database Normalization Exercises",
    course: "Database Systems",
    type: "file",
    extension: "docx",
    size: "1.1 MB",
    updatedAt: "2024-01-15",
  },
]

interface Resource {
  id: number
  semesterId: number
  title: string
  course: string
  type: string
  extension?: string
  size?: string
  updatedAt: string
  url?: string
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="group hover:shadow-md transition-shadow border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {resource.type === "file" ? (
              <FileText className="w-5 h-5" />
            ) : (
              <LinkIcon className="w-5 h-5" />
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem className="text-xs">Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-xs text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h3 className="font-semibold leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {resource.title}
          </h3>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
            {resource.course}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            {resource.type === "file" && (
              <Badge
                variant="secondary"
                className="text-[10px] h-5 px-1.5 font-mono"
              >
                {resource.extension?.toUpperCase()}
              </Badge>
            )}
            {resource.size && (
              <span className="text-[10px] text-muted-foreground my-auto font-medium">
                {resource.size}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 hover:bg-primary/5 hover:text-primary px-2"
          >
            {resource.type === "file" ? (
              <>
                <Download className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Get</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Open</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ResourcesPage() {
  const { activeSemester } = useSemester()
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)

  const filteredResources = mockResources.filter(
    (r) =>
      r.semesterId === activeSemester?.id &&
      (r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.course.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const coursesWithResources = Array.from(
    new Set(filteredResources.map((r) => r.course)),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Resource Library
          </h1>
          <p className="text-muted-foreground">
            Access your course materials and shared study resources for{" "}
            {activeSemester?.name}.
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="title"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Week 1 Lecture Slides"
                  className="h-10 bg-muted/30 border-border/50"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="course"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Course
                </Label>
                <Select>
                  <SelectTrigger className="h-10 bg-muted/30 border-border/50">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hci">
                      Human Computer Interaction
                    </SelectItem>
                    <SelectItem value="db">Database Systems</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="type"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="h-10 bg-muted/30 border-border/50">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="file">File (Upload)</SelectItem>
                    <SelectItem value="link">Web Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="url"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Resource Point
                </Label>
                <Input
                  id="url"
                  placeholder="https://..."
                  className="h-10 bg-muted/30 border-border/50"
                />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="ghost"
                onClick={() => setIsAddOpen(false)}
                className="h-10"
              >
                Cancel
              </Button>
              <Button onClick={() => setIsAddOpen(false)} className="h-10">
                Save Resource
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              By Course
            </TabsTrigger>
            <TabsTrigger
              value="groups"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Groups
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-64 h-10 bg-muted/30 border-border/50"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border-border/50"
            >
              <Filter className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0 focus-visible:outline-none">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl border-border/50 bg-muted/5">
              <div className="p-4 rounded-full bg-muted/50 mb-4">
                <FileText className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground font-medium">
                No resources found in this semester.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent
          value="courses"
          className="mt-0 focus-visible:outline-none"
        >
          <div className="space-y-10">
            {coursesWithResources.length > 0 ? (
              coursesWithResources.map((courseName) => (
                <div key={courseName} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold tracking-tight">
                      {courseName}
                    </h2>
                    <Badge
                      variant="secondary"
                      className="rounded-full bg-primary/10 text-primary border-primary/20"
                    >
                      {
                        filteredResources.filter((r) => r.course === courseName)
                          .length
                      }{" "}
                      items
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources
                      .filter((r) => r.course === courseName)
                      .map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl border-border/50 bg-muted/5">
                <p className="text-muted-foreground font-medium">
                  No course-grouped resources yet.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="mt-0 focus-visible:outline-none">
          <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl border-border/50 bg-muted/5">
            <div className="p-4 rounded-full bg-muted/50 mb-4">
              <LinkIcon className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground font-medium text-center max-w-xs">
              Connect with groups in the &quot;Groups&quot; tab to see shared
              study materials here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
