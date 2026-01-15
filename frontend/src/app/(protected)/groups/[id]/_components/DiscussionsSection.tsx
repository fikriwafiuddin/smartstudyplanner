import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageSquareIcon, SendIcon } from "lucide-react"

const discussions = [
  {
    id: 1,
    author: "Sarah Chen",
    message: "I've uploaded the latest slides for our presentation",
    time: "2 hours ago",
  },
  {
    id: 2,
    author: "Mike Davis",
    message: "Can someone explain the quicksort partition step?",
    time: "5 hours ago",
  },
  {
    id: 3,
    author: "Emma Wilson",
    message: "Meeting rescheduled to 4 PM tomorrow",
    time: "1 day ago",
  },
]

function DiscussionsSection() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-soft animate-slide-up flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <MessageSquareIcon className="w-4 h-4 text-primary" />
          Discussions
        </h4>
      </div>
      <div className="p-4 space-y-4 flex-1 max-h-48 overflow-y-auto custom-scrollbar">
        {discussions.map((discussion) => (
          <div key={discussion.id} className="group">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-foreground">
                {discussion.author}
              </span>
              <span className="text-xs text-muted-foreground">
                {discussion.time}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {discussion.message}
            </p>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            // value={newMessage}
            // onChange={(e) => setNewMessage(e.target.value)}
            // onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button size="icon">
            <SendIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DiscussionsSection
