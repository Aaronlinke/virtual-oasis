import { ReactNode } from "react";
import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, Globe, User, Backpack, Trophy, MessageCircle } from "lucide-react";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Welten", url: "/sectors", icon: Globe },
  { title: "Avatar", url: "/avatar", icon: User },
  { title: "Inventar", url: "/inventory", icon: Backpack },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Chat", url: "/chat", icon: MessageCircle },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="group fixed inset-y-0 left-0 z-40 flex w-16 flex-col border-r border-border/50 bg-sidebar transition-all duration-300 hover:w-52">
        {/* Logo */}
        <div className="flex h-14 items-center justify-center border-b border-border/50">
          <span className="neon-text-cyan text-xl font-black tracking-wider">O</span>
          <span className="neon-text-cyan hidden text-xl font-black tracking-wider group-hover:inline">ASIS</span>
        </div>

        {/* Nav items */}
        <nav className="mt-4 flex flex-1 flex-col gap-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-primary"
              activeClassName="bg-sidebar-accent text-primary neon-glow-cyan"
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="hidden whitespace-nowrap group-hover:inline">{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-border/50 p-3 text-center">
          <span className="text-[10px] text-muted-foreground hidden group-hover:inline">v0.1 · Phase 1</span>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-16 flex-1 overflow-auto">
        {/* Subtle background grid */}
        <div className="pointer-events-none fixed inset-0 ml-16">
          <div className="animated-grid absolute inset-0 opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80" />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
