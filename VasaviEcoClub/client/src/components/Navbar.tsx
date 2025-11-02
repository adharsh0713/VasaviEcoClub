import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/activities", label: "Events" },
    { path: "/members", label: "Members" },
    { path: "/projects", label: "Projects" },
    { path: "/gallery", label: "Gallery" },
    { path: "/impact", label: "Impact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/90 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1" data-testid="link-home">
            <div className="bg-primary text-primary-foreground p-2 rounded-md">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">VCE Eco Club</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} data-testid={`link-${item.label.toLowerCase()}`}>
                <Button
                  variant="ghost"
                  className={isActive(item.path) ? "bg-accent" : ""}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/admin">
              <Button variant="default" className="hidden md:inline-flex" data-testid="button-admin">
                Admin
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${isActive(item.path) ? "bg-accent" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <Link href="/admin">
              <Button
                variant="default"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-button-admin"
              >
                Admin
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
