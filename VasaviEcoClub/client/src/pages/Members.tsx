import { MemberCard } from "@/components/MemberCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Members() {
  const members = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "President",
      year: "Senior, Environmental Science",
      email: "sarah.j@college.edu",
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Vice President",
      year: "Junior, Biology",
      email: "michael.c@college.edu",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Secretary",
      year: "Sophomore, Sustainability Studies",
      email: "emily.r@college.edu",
    },
    {
      id: "4",
      name: "David Kim",
      role: "Treasurer",
      year: "Senior, Business Administration",
      email: "david.k@college.edu",
    },
    {
      id: "5",
      name: "Aisha Patel",
      role: "Events Coordinator",
      year: "Junior, Environmental Engineering",
      email: "aisha.p@college.edu",
    },
    {
      id: "6",
      name: "James Wilson",
      role: "Outreach Lead",
      year: "Senior, Communications",
      email: "james.w@college.edu",
    },
    {
      id: "7",
      name: "Lisa Martinez",
      role: "Volunteer",
      year: "Freshman, Biology",
      email: "lisa.m@college.edu",
    },
    {
      id: "8",
      name: "Ryan Thompson",
      role: "Volunteer",
      year: "Sophomore, Environmental Science",
      email: "ryan.t@college.edu",
    },
  ];

  const leadership = members.filter((m) => 
    ["President", "Vice President", "Secretary", "Treasurer"].includes(m.role)
  );
  const coordinators = members.filter((m) => 
    ["Events Coordinator", "Outreach Lead"].includes(m.role)
  );
  const volunteers = members.filter((m) => m.role === "Volunteer");

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">Our Team</h1>
        <p className="text-lg text-muted-foreground mb-8" data-testid="text-page-description">
          Meet the passionate individuals driving our environmental mission
        </p>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList>
            <TabsTrigger value="all" data-testid="tab-all">
              All Members ({members.length})
            </TabsTrigger>
            <TabsTrigger value="leadership" data-testid="tab-leadership">
              Leadership
            </TabsTrigger>
            <TabsTrigger value="coordinators" data-testid="tab-coordinators">
              Coordinators
            </TabsTrigger>
            <TabsTrigger value="volunteers" data-testid="tab-volunteers">
              Volunteers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {members.map((member) => (
                <MemberCard key={member.id} {...member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leadership">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadership.map((member) => (
                <MemberCard key={member.id} {...member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="coordinators">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coordinators.map((member) => (
                <MemberCard key={member.id} {...member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="volunteers">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {volunteers.map((member) => (
                <MemberCard key={member.id} {...member} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
