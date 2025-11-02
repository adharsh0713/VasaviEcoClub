import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, FolderKanban, Image, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import type { Event, Member, Project, Gallery } from "@shared/schema";

function AdminPanelContent() {
  const { toast } = useToast();
  const { logout } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: eventsData, isLoading: eventsLoading } = useQuery<{ data: Event[] }>({ queryKey: ["/api/events"] });
  const { data: membersData, isLoading: membersLoading } = useQuery<{ data: Member[] }>({ queryKey: ["/api/members"] });
  const { data: projectsData, isLoading: projectsLoading } = useQuery<{ data: Project[] }>({ queryKey: ["/api/projects"] });
  const { data: galleryData, isLoading: galleryLoading } = useQuery<{ data: Gallery[] }>({ queryKey: ["/api/gallery"] });

  const events = eventsData?.data || [];
  const members = membersData?.data || [];
  const projects = projectsData?.data || [];
  const gallery = galleryData?.data || [];

  const isLoading = eventsLoading || membersLoading || projectsLoading || galleryLoading;

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    setLocation("/admin/login");
  };

  const quickStats = [
    { icon: Calendar, label: "Total Events", value: events.length.toString(), color: "text-blue-500" },
    { icon: Users, label: "Current Members", value: members.length.toString(), color: "text-green-500" },
    { icon: FolderKanban, label: "Active Projects", value: projects.length.toString(), color: "text-purple-500" },
    { icon: Image, label: "Gallery Photos", value: gallery.length.toString(), color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">Admin Panel</h1>
            <p className="text-lg text-muted-foreground" data-testid="text-page-description">
              Manage your Eco Club content and track engagement
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-auto">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="events" data-testid="tab-events">Events</TabsTrigger>
            <TabsTrigger value="members" data-testid="tab-members">Members</TabsTrigger>
            <TabsTrigger value="projects" data-testid="tab-projects">Projects</TabsTrigger>
            <TabsTrigger value="gallery" data-testid="tab-gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="h-16 bg-muted animate-pulse rounded-lg" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
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
            )}

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your Eco Club content</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button onClick={() => setActiveTab("events")} data-testid="button-manage-events">
                  Manage Events
                </Button>
                <Button onClick={() => setActiveTab("members")} variant="outline" data-testid="button-manage-members">
                  Manage Members
                </Button>
                <Button onClick={() => setActiveTab("projects")} variant="outline" data-testid="button-manage-projects">
                  Manage Projects
                </Button>
                <Button onClick={() => setActiveTab("gallery")} variant="outline" data-testid="button-manage-gallery">
                  Upload Photos
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Events Management</CardTitle>
                <CardDescription>View and manage all events</CardDescription>
              </CardHeader>
              <CardContent>
                {eventsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {events.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No events found</p>
                    ) : (
                      events.map((event) => (
                        <div key={event.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg gap-4">
                          <div className="flex-1">
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{event.date} • {event.location}</p>
                            <Badge variant={event.status === "upcoming" ? "default" : "secondary"} className="mt-2">
                              {event.status}
                            </Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Member Management</CardTitle>
                <CardDescription>Manage current year members</CardDescription>
              </CardHeader>
              <CardContent>
                {membersLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {members.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No members found</p>
                    ) : (
                      members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.branch} • {member.year}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Management</CardTitle>
                <CardDescription>Manage projects with team details</CardDescription>
              </CardHeader>
              <CardContent>
                {projectsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No projects found</p>
                    ) : (
                      projects.map((project) => (
                        <div key={project.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg gap-4">
                          <div className="flex-1">
                            <p className="font-medium">{project.title}</p>
                            <p className="text-sm text-muted-foreground">{project.year}</p>
                            <Badge variant={project.status === "ongoing" ? "default" : "secondary"} className="mt-2">
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
                <CardDescription>View and manage gallery photos</CardDescription>
              </CardHeader>
              <CardContent>
                {galleryLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : gallery.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gallery.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No images in gallery</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  return (
    <ProtectedRoute>
      <AdminPanelContent />
    </ProtectedRoute>
  );
}
