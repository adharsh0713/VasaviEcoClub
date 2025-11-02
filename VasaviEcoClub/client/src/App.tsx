import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Activities from "@/pages/Activities";
import Members from "@/pages/Members";
import Projects from "@/pages/Projects";
import Gallery from "@/pages/Gallery";
import Impact from "@/pages/Impact";
import AdminPanel from "@/pages/AdminPanel";
import AdminLogin from "@/pages/AdminLogin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/activities" component={Activities} />
          <Route path="/members" component={Members} />
          <Route path="/projects" component={Projects} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/impact" component={Impact} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin" component={AdminPanel} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
