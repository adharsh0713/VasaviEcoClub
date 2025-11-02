import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, FolderKanban, Image, BarChart3, Edit, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminPanel() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Event Created",
      description: "The event has been successfully added.",
    });
    console.log("Event added");
  };

  const quickStats = [
    { icon: Calendar, label: "Upcoming Events", value: "8", color: "text-blue-500" },
    { icon: Users, label: "Total Members", value: "180", color: "text-green-500" },
    { icon: FolderKanban, label: "Active Projects", value: "5", color: "text-purple-500" },
    { icon: Image, label: "Gallery Photos", value: "124", color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">Admin Panel</h1>
        <p className="text-lg text-muted-foreground mb-8" data-testid="text-page-description">
          Manage your Eco Club content and track engagement
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-auto">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="events" data-testid="tab-events">Events</TabsTrigger>
            <TabsTrigger value="members" data-testid="tab-members">Members</TabsTrigger>
            <TabsTrigger value="projects" data-testid="tab-projects">Projects</TabsTrigger>
            <TabsTrigger value="gallery" data-testid="tab-gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates across your platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">New event registration</p>
                      <p className="text-sm text-muted-foreground">45 students registered for Tree Planting Drive</p>
                    </div>
                    <Badge>Today</Badge>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Project completed</p>
                      <p className="text-sm text-muted-foreground">Solar Panel Installation marked as complete</p>
                    </div>
                    <Badge variant="secondary">Yesterday</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New member joined</p>
                      <p className="text-sm text-muted-foreground">3 new volunteers added to the team</p>
                    </div>
                    <Badge variant="secondary">2 days ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Event</CardTitle>
                <CardDescription>Create a new event for the community</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-title">Event Title</Label>
                      <Input id="event-title" placeholder="Campus Tree Planting Drive" data-testid="input-event-title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-date">Date</Label>
                      <Input id="event-date" type="date" data-testid="input-event-date" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-location">Location</Label>
                      <Input id="event-location" placeholder="Main Campus Lawn" data-testid="input-event-location" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-category">Category</Label>
                      <Input id="event-category" placeholder="Planting" data-testid="input-event-category" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea
                      id="event-description"
                      placeholder="Describe the event..."
                      data-testid="input-event-description"
                    />
                  </div>
                  <Button type="submit" data-testid="button-add-event">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Events</CardTitle>
                <CardDescription>View and edit existing events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Tree Planting Drive", "Beach Cleanup", "Recycling Workshop"].map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{event}</p>
                        <p className="text-sm text-muted-foreground">45 registrations</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" data-testid={`button-edit-event-${index}`}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" data-testid={`button-delete-event-${index}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Member Management</CardTitle>
                <CardDescription>Add and manage club members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Member management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Management</CardTitle>
                <CardDescription>Track and update project status</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Project management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
                <CardDescription>Upload and organize photos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Gallery management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
