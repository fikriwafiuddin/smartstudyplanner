"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, UserPlus } from "lucide-react"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { inviteMemberSchema } from "@/validations/groupvalidation"
import { InviteMemberValues } from "@/types/form"

function InviteMemberModal() {
  const [open, setOpen] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  const form = useForm({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: "",
    },
  })

  const copyInviteCode = () => {
    navigator.clipboard.writeText("DST-2025-A")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (data: InviteMemberValues) => {
    console.log(data)
    form.reset()
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="ghost" size="sm">
        Invite
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" />
              Invite to Data Structures Study Group
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Invite Code Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Share Invite Code
              </label>
              <div className="flex gap-2">
                <div className="flex-1 bg-secondary rounded-lg px-4 py-3 font-mono text-center text-lg tracking-wider">
                  DST-2025-A
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={copyInviteCode}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Share this code with anyone you want to invite to the group
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or send invite
                </span>
              </div>
            </div>

            {/* Email Invite Section */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="friend@university.edu"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3">
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="flex-1">
                      Done
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="flex-1">
                    Send Invite
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default InviteMemberModal
