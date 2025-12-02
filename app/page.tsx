"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Search, Send, Play } from "lucide-react"

type Message = {
  id: number
  sender: "ai" | "influencer"
  content: string
  timestamp: string
  type: "text" | "video"
  videoUrl?: string
}

type Influencer = {
  id: number
  username: string
  followers: string
  status: "Negotiating" | "Agreed" | "Content Received" | "Published"
  avatar: string
}

const influencers: Influencer[] = [
  {
    id: 1,
    username: "@fashionista_elena",
    followers: "250K",
    status: "Negotiating",
    avatar: "/stylish-woman-city.png",
  },
  { id: 2, username: "@sustainable_style", followers: "180K", status: "Agreed", avatar: "/woman-sustainable.jpg" },
  {
    id: 3,
    username: "@urban_chic",
    followers: "320K",
    status: "Content Received",
    avatar: "/urban-woman.jpg",
  },
  {
    id: 4,
    username: "@eco_fashion_guru",
    followers: "150K",
    status: "Negotiating",
    avatar: "/woman-eco.jpg",
  },
  {
    id: 5,
    username: "@minimalist_wardrobe",
    followers: "200K",
    status: "Published",
    avatar: "/minimalist-woman.jpg",
  },
]

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "ai",
    content:
      "Hello Elena! We're excited to collaborate on our sustainable fashion campaign. We'd love to work with you for 3 Instagram posts and stories showcasing our new eco-friendly collection. Our budget for this collaboration is €5,000. Would you be interested?",
    timestamp: "2:34 PM",
    type: "text",
  },
  {
    id: 2,
    sender: "influencer",
    content:
      "Hi! Thank you for reaching out. I love sustainable fashion and would be interested in collaborating. However, my rate for 3 posts and stories is typically €6,500. This includes professional photography, content creation, and story highlights for extended visibility.",
    timestamp: "2:45 PM",
    type: "text",
  },
  {
    id: 3,
    sender: "ai",
    content:
      "I understand your value proposition and appreciate the comprehensive package. We can work with your rate of €6,500. Would you be able to deliver the content within 2 weeks?",
    timestamp: "2:47 PM",
    type: "text",
  },
  {
    id: 4,
    sender: "influencer",
    content:
      "Perfect! Yes, 2 weeks works well for me. Here's a sample of my recent sustainable fashion content to give you an idea of the style:",
    timestamp: "2:50 PM",
    type: "video",
    videoUrl: "/fashion-video-preview.jpg",
  },
]

export default function CampaignNegotiations() {
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer>(influencers[0])
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [messageInput, setMessageInput] = useState("")
  const [filterStatus, setFilterStatus] = useState<"All" | Influencer["status"]>("All")

  const filteredInfluencers = influencers.filter((inf) => filterStatus === "All" || inf.status === filterStatus)

  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "influencer",
      content: messageInput,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      type: "text",
    }

    setMessages([...messages, newMessage])
    setMessageInput("")
  }

  const getStatusColor = (status: Influencer["status"]) => {
    switch (status) {
      case "Negotiating":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Agreed":
        return "bg-success/20 text-success-foreground hover:bg-success/20"
      case "Content Received":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "Published":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-semibold text-foreground">Campaign Negotiations</h1>
            <div className="flex gap-3">
              <Badge
                variant="secondary"
                className="bg-success/20 text-success-foreground hover:bg-success/20 px-3 py-1"
              >
                42 Active Negotiations
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 px-3 py-1">
                18 Agreements
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Total Budget</div>
              <div className="text-lg font-semibold">€78,000 / €100,000</div>
            </div>
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "78%" }} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Influencer List Sidebar */}
        <aside className="w-96 border-r border-border bg-card overflow-y-auto">
          <div className="p-4 space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-3">Influencer List</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search influencers..." className="pl-9 bg-background" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", "Negotiating", "Agreed", "Content Received", "Published"].map((status) => (
                <Button
                  key={status}
                  variant="secondary"
                  size="sm"
                  onClick={() => setFilterStatus(status as any)}
                  className={filterStatus === status ? "bg-primary/10 text-primary" : ""}
                >
                  {status}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              {filteredInfluencers.map((influencer) => (
                <Card
                  key={influencer.id}
                  className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
                    selectedInfluencer.id === influencer.id ? "bg-accent" : ""
                  }`}
                  onClick={() => setSelectedInfluencer(influencer)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={influencer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{influencer.username[1]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{influencer.username}</div>
                        <div className="text-xs text-muted-foreground">{influencer.followers} followers</div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(influencer.status)} variant="secondary">
                      {influencer.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col bg-background">
          {/* Chat Header */}
          <div className="border-b border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedInfluencer.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedInfluencer.username[1]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-lg">{selectedInfluencer.username}</h2>
                  <p className="text-sm text-muted-foreground">Negotiating terms for fashion campaign</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-primary font-medium">AI responds in:</div>
                  <div className="text-lg font-semibold text-primary">30m-2h</div>
                </div>
                <Button variant="destructive" className="bg-destructive hover:bg-destructive/90">
                  Take Over
                </Button>
              </div>
            </div>
          </div>

          {/* Negotiation Summary */}
          <div className="border-b border-border bg-card p-4">
            <h3 className="font-semibold mb-3">Negotiation Summary</h3>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Target Budget</div>
                <div className="font-semibold">€5,000</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Current Offer</div>
                <div className="font-semibold text-primary">€6,500</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Deliverables</div>
                <div className="font-semibold">3 Posts + Stories</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Timeline</div>
                <div className="font-semibold">2 weeks</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "influencer" ? "flex-row-reverse" : ""}`}
              >
                {message.sender === "ai" && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                      <div className="text-xs font-semibold text-primary">AI</div>
                    </div>
                  </Avatar>
                )}
                {message.sender === "influencer" && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={selectedInfluencer.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedInfluencer.username[1]}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`flex flex-col gap-1 max-w-2xl ${message.sender === "influencer" ? "items-end" : ""}`}>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {message.sender === "ai" ? "AI Assistant" : selectedInfluencer.username}
                    <span>{message.timestamp}</span>
                  </div>
                  {message.type === "text" ? (
                    <div
                      className={`rounded-lg px-4 py-3 ${
                        message.sender === "ai" ? "bg-accent text-accent-foreground" : "bg-primary/5 text-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div
                        className={`rounded-lg px-4 py-3 ${
                          message.sender === "ai" ? "bg-accent text-accent-foreground" : "bg-primary/5 text-foreground"
                        }`}
                      >
                        {message.content}
                      </div>
                      {/* Video message with Instagram aspect ratio (4:5) */}
                      <div
                        className="relative rounded-lg overflow-hidden bg-muted"
                        style={{ aspectRatio: "4/5", width: "320px" }}
                      >
                        <img
                          src={message.videoUrl || "/placeholder.svg"}
                          alt="Video preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="h-16 w-16 bg-white/90 rounded-full flex items-center justify-center">
                            <Play className="h-8 w-8 text-gray-800 ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-border bg-card p-4">
            <div className="flex gap-3">
              <Input
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-background"
              />
              <Button onClick={handleSendMessage} size="icon" className="flex-shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              AI is currently handling this negotiation. Click "Take Over" to intervene.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
