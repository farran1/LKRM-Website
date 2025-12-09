import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSession } from "./contexts/AuthContext";
import Index from "./pages/Index";
import HighSchool from "./pages/HighSchool";
import Tournaments from "./pages/Tournaments";
import NotFound from "./pages/NotFound";
import Apply from "./pages/apply";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Referrals from "./pages/Referrals";
import Tickets from "./pages/Tickets";
import Suggestions from "./pages/Suggestions";
import Forum from "./pages/Forum";
import CoachFeedback from "./pages/CoachFeedback";
import { AppLayout } from "./components/AppLayout";

const queryClient = new QueryClient();

const Protected = ({ element }: { element: JSX.Element }) => {
  const session = useSession();
  if (!session) return <Login />;
  return element;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Tournaments />} />
          <Route path="/high-school" element={<HighSchool />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/original" element={<Index />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/app" element={<Protected element={<AppLayout />} />} >
            <Route path="referrals" element={<Referrals />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="suggestions" element={<Suggestions />} />
            <Route path="forum" element={<Forum />} />
            <Route path="feedback" element={<CoachFeedback />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
