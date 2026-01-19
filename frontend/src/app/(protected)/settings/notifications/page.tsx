"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Bell,
  Mail,
  Smartphone,
  Clock,
  Save,
  Volume2,
  Moon,
} from "lucide-react"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function NotificationsSettingsPage() {
  const [preferences, setPreferences] = useState({
    push: true,
    email: false,
    inApp: true,
    snooze: "5",
    quietHours: true,
    sounds: true,
    deadlineAlerts: true,
    classReminders: true,
  })

  const handleSave = () => {
    toast.success("Notification preferences saved!")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-1 text-center sm:text-left mb-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Notification Settings
        </h1>
        <p className="text-muted-foreground">
          Customize how and when you want to be notified.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Delivery Channels */}
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Delivery Channels
            </CardTitle>
            <CardDescription>
              Where should we send your notifications?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <Label className="font-semibold">Push Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Instant alerts on your browser
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.push}
                onCheckedChange={(val) =>
                  setPreferences({ ...preferences, push: val })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <Label className="font-semibold">Email Updates</Label>
                  <p className="text-xs text-muted-foreground">
                    Daily summaries and important alerts
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.email}
                onCheckedChange={(val) =>
                  setPreferences({ ...preferences, email: val })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <Label className="font-semibold">In-App Alerts</Label>
                  <p className="text-xs text-muted-foreground">
                    Notification bell in the app
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.inApp}
                onCheckedChange={(val) =>
                  setPreferences({ ...preferences, inApp: val })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Reminder Types */}
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-warning" />
              Reminder Preferences
            </CardTitle>
            <CardDescription>
              Choose which updates matters most.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Deadline Warnings</Label>
              <Switch
                checked={preferences.deadlineAlerts}
                onCheckedChange={(val) =>
                  setPreferences({ ...preferences, deadlineAlerts: val })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                Upcoming Class Alerts
              </Label>
              <Switch
                checked={preferences.classReminders}
                onCheckedChange={(val) =>
                  setPreferences({ ...preferences, classReminders: val })
                }
              />
            </div>

            <div className="pt-4 border-t border-border">
              <Label className="text-sm font-medium mb-2 block">
                Default Snooze Duration
              </Label>
              <Select
                value={preferences.snooze}
                onValueChange={(val) =>
                  setPreferences({ ...preferences, snooze: val })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Minutes</SelectItem>
                  <SelectItem value="10">10 Minutes</SelectItem>
                  <SelectItem value="15">15 Minutes</SelectItem>
                  <SelectItem value="30">30 Minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* advanced settings */}
        <Card className="shadow-soft border-border/50 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-muted-foreground" />
              Advanced Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-primary" />
                <div>
                  <Label className="font-semibold">Notification Sounds</Label>
                  <p className="text-xs text-muted-foreground">
                    Play a soft chime for alerts
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.sounds}
                onCheckedChange={(val) =>
                  setPreferences({ ...preferences, sounds: val })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-indigo-400" />
                <div>
                  <Label className="font-semibold">Quiet Hours</Label>
                  <p className="text-xs text-muted-foreground">
                    Silence all alerts during night
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.quietHours}
                onCheckedChange={(val) =>
                  setPreferences({ ...preferences, quietHours: val })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline">Reset to Defaults</Button>
        <Button
          onClick={handleSave}
          className="px-8 shadow-lg shadow-primary/20"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Preferences
        </Button>
      </div>
    </div>
  )
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
