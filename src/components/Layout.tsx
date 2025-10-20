import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Bot, 
  MessageSquare, 
  BarChart3,
  Phone,
  Settings,
  LogOut,
  Target
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Leads", path: "/leads" },
  { icon: Bot, label: "Agentes IA", path: "/agents" },
  { icon: Phone, label: "Números WhatsApp", path: "/whatsapp" },
  { icon: Target, label: "Campanhas", path: "/campaigns" },
  { icon: MessageSquare, label: "Conversas", path: "/conversations" },
  { icon: BarChart3, label: "Relatórios", path: "/reports" },
];

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logout realizado com sucesso!" });
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card shadow-card">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">WhatsApp AI</h1>
            <p className="text-xs text-muted-foreground">Prospecção Inteligente</p>
          </div>
        </div>
        
        <nav className="space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 space-y-2 p-4 border-t border-border bg-card">
          <Link
            to="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 transition-all hover:bg-accent text-muted-foreground hover:text-foreground",
              location.pathname === "/settings" && "bg-accent text-primary font-medium"
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Configurações</span>
          </Link>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-64">
        <main className="min-h-screen p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
