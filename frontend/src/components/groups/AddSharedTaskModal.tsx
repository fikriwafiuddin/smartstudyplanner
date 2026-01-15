"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CheckSquare } from "lucide-react"
import { addSharedTaskSchema } from "@/validations/groupvalidation"
import { AddSharedTaskValues } from "@/types/form"
import { useState } from "react"

const members = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "",
    role: "Admin",
    status: "online",
  },
  { id: 2, name: "Sarah Chen", avatar: "", role: "Member", status: "online" },
  {
    id: 3,
    name: "Mike Davis",
    avatar: "",
    role: "Member",
    status: "offline",
  },
  { id: 4, name: "Emma Wilson", avatar: "", role: "Member", status: "away" },
  {
    id: 5,
    name: "James Brown",
    avatar: "",
    role: "Member",
    status: "online",
  },
]

export function AddSharedTaskModal() {
  const [open, setOpen] = useState<boolean>(false)
  const form = useForm<AddSharedTaskValues>({
    resolver: zodResolver(addSharedTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee: "",
    },
  })

  const handleSubmit = (data: AddSharedTaskValues) => {
    console.log(data)
    form.reset()
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="ghost" size="sm">
        Add
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-primary" />
              Add Shared Task
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Complete group presentation"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add task details..."
                        className="resize-none"
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign To</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a member" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {members.map((member) => (
                          <SelectItem key={member.id} value={member.name}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="flex-1">
                  Add Task
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
