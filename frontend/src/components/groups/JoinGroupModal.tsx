"use client"

import { UserPlusIcon } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { JoinGroupValues } from "@/types/form"
import { joinGroupSchema } from "@/validations/groupvalidation"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

function JoinGroupModal() {
  const [open, setOpen] = useState<boolean>(false)
  const form = useForm<JoinGroupValues>({
    resolver: zodResolver(joinGroupSchema),
    defaultValues: {
      inviteCode: "",
    },
  })

  const handleSubmit = (values: JoinGroupValues) => {
    console.log(values)
    setOpen(false)
  }

  return (
    <>
      <Button
        variant="secondary"
        className="w-full"
        onClick={() => setOpen(true)}
      >
        Enter Invite Code
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlusIcon className="w-5 h-5 text-primary" />
              Join Study Group
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="inviteCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invite Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., DST-2025-A"
                        className="font-mono uppercase"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.toUpperCase())
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-sm text-muted-foreground">
                Ask your group admin for the invite code to join their study
                group.
              </p>

              <div className="flex gap-3 pt-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="flex-1">
                  Join Group
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default JoinGroupModal
