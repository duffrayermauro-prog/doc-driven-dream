import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "./components/auth/AuthPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Agents from "./pages/Agents";
import WhatsApp from "./pages/WhatsApp";
import Campaigns from "./pages/Campaigns";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Conversations from "./pages/Conversations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
          <Route path="/agents" element={<ProtectedRoute><Agents /></ProtectedRoute>} />
          <Route path="/whatsapp" element={<ProtectedRoute><WhatsApp /></ProtectedRoute>} />
          <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/conversations" element={<ProtectedRoute><Conversations /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
