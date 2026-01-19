"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageSquareIcon, SendIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const INITIAL_DISCUSSIONS = [
  {
    id: 1,
    author: "Sarah Chen",
    message: "I've uploaded the latest slides for our presentation",
    time: "2 hours ago",
    isMe: false,
  },
  {
    id: 2,
    author: "Mike Davis",
    message: "Can someone explain the quicksort partition step?",
    time: "5 hours ago",
    isMe: false,
  },
  {
    id: 3,
    author: "Alex Johnson",
    message: "Meeting rescheduled to 4 PM tomorrow",
    time: "20 mins ago",
    isMe: true,
  },
]

function DiscussionsSection() {
  const [messages, setMessages] = useState(INITIAL_DISCUSSIONS)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now(),
      author: "Alex Johnson", // Current User
      message: newMessage,
      time: "Just now",
      isMe: true,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft animate-slide-up flex flex-col h-[400px]">
      <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <MessageSquareIcon className="w-4 h-4 text-primary" />
          Discussions
        </h4>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto custom-scrollbar flex flex-col">
        {messages.map((discussion) => (
          <div
            key={discussion.id}
            className={cn(
              "flex flex-col max-w-[80%]",
              discussion.isMe ? "self-end items-end" : "self-start items-start",
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              {!discussion.isMe && (
                <span className="text-xs font-bold text-primary italic">
                  {discussion.author}
                </span>
              )}
              <span className="text-[10px] text-muted-foreground">
                {discussion.time}
              </span>
            </div>
            <div
              className={cn(
                "p-3 rounded-2xl text-sm shadow-sm",
                discussion.isMe
                  ? "bg-primary text-primary-foreground rounded-tr-none"
                  : "bg-muted text-foreground rounded-tl-none border border-border/50",
              )}
            >
              {discussion.message}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-border shrink-0 bg-background/50 backdrop-blur-sm">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 rounded-full px-4"
          />
          <Button
            size="icon"
            className="rounded-full shadow-md hover:scale-105 transition-transform"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <SendIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DiscussionsSection
