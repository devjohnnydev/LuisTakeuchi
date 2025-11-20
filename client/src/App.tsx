import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Consent from "@/pages/consent";
import Identify from "@/pages/identify";
import FormPage from "@/pages/form";
import Results from "@/pages/results";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import { SurveyProvider } from "@/lib/survey-context";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/consent" component={Consent} />
      <Route path="/identify" component={Identify} />
      <Route path="/form" component={FormPage} />
      <Route path="/results" component={Results} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SurveyProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </SurveyProvider>
    </QueryClientProvider>
  );
}

export default App;
