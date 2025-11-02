import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trees, Droplets, Recycle, Users, Zap, Sprout, TrendingUp } from "lucide-react";

export default function Impact() {
  const metrics = [
    {
      id: "trees",
      title: "Trees Planted",
      value: "1,250",
      icon: Trees,
      description: "Across campus this year",
    },
    {
      id: "water",
      title: "Water Saved",
      value: "50,000L",
      icon: Droplets,
      description: "Monthly conservation",
    },
    {
      id: "waste",
      title: "Waste Recycled",
      value: "2.5 Tons",
      icon: Recycle,
      description: "Campus recycling program",
    },
    {
      id: "members",
      title: "Active Members",
      value: "180",
      icon: Users,
      description: "And growing",
    },
    {
      id: "energy",
      title: "Clean Energy",
      value: "40%",
      icon: Zap,
      description: "From solar panels",
    },
    {
      id: "organic",
      title: "Organic Produce",
      value: "500 kg",
      icon: Sprout,
      description: "From campus gardens",
    },
  ];

  const monthlyStats = [
    { month: "Jan", trees: 80, waste: 180, water: 42000 },
    { month: "Feb", trees: 95, waste: 220, water: 45000 },
    { month: "Mar", trees: 120, waste: 250, water: 50000 },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">Our Environmental Impact</h1>
        <p className="text-lg text-muted-foreground mb-12" data-testid="text-page-description">
          Measurable progress toward a sustainable future
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} {...metric} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Monthly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyStats.map((stat) => (
                  <div key={stat.month} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{stat.month} 2024</span>
                      <span className="text-muted-foreground">{stat.trees} trees planted</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(stat.trees / 150) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="border-l-4 border-primary pl-4">
                  <p className="font-medium">Solar Panel Installation</p>
                  <p className="text-sm text-muted-foreground">
                    100 panels installed, 40% energy independence achieved
                  </p>
                </li>
                <li className="border-l-4 border-primary pl-4">
                  <p className="font-medium">Water Conservation</p>
                  <p className="text-sm text-muted-foreground">
                    Rainwater harvesting saves 50,000L monthly
                  </p>
                </li>
                <li className="border-l-4 border-primary pl-4">
                  <p className="font-medium">Waste Reduction</p>
                  <p className="text-sm text-muted-foreground">
                    2.5 tons diverted from landfills this quarter
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Together, We're Making a Difference</h3>
            <p className="text-lg text-muted-foreground">
              Every action counts. Join us in our mission to create a sustainable campus and inspire environmental stewardship.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
