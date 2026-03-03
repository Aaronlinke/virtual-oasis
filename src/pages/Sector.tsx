import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { sectors } from "@/data/demo-data";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft } from "lucide-react";
import ReactionGame from "@/components/ReactionGame";

export default function Sector() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sector = sectors.find((s) => s.id === id);

  if (!sector) {
    return (
      <AppLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">Sektor nicht gefunden.</p>
        </div>
      </AppLayout>
    );
  }

  const demoPlayers = [
    { name: "Art3mis_XX", status: "online" },
    { name: "Parzival_2049", status: "online" },
    { name: "Aech_Prime", status: "idle" },
    { name: "GlitchQueen", status: "online" },
    { name: "ByteHunter", status: "offline" },
  ];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => navigate("/dashboard")} className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Zurück zum Dashboard
          </button>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-5xl">{sector.icon}</span>
            <div>
              <h1 className="neon-text-cyan text-3xl font-black">{sector.name}</h1>
              <p className="text-muted-foreground">{sector.description}</p>
              <span className="text-xs text-primary">{sector.players.toLocaleString()} Spieler online</span>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Mini-Game for Arena sector */}
          {id === "arena" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card p-5 lg:col-span-2">
              <h2 className="mb-4 text-lg font-semibold">🎮 Mini-Spiel: Reaktionstest</h2>
              <ReactionGame />
            </motion.div>
          )}

          {/* Activities */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
            <h2 className="mb-4 text-lg font-semibold">📋 Verfügbare Aktivitäten</h2>
            <div className="space-y-3">
              {sector.activities.map((a) => (
                <div key={a} className="flex items-center justify-between rounded-md bg-muted/20 px-4 py-3">
                  <span className="text-foreground">{a}</span>
                  <button className="rounded border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
                    Beitreten
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Active Players */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
            <h2 className="mb-4 text-lg font-semibold">👥 Aktive Spieler</h2>
            <div className="space-y-2">
              {demoPlayers.map((p) => (
                <div key={p.name} className="flex items-center gap-3 rounded-md bg-muted/20 px-4 py-3">
                  <div className={`h-2 w-2 rounded-full ${p.status === "online" ? "bg-neon-green" : p.status === "idle" ? "bg-neon-orange" : "bg-muted-foreground"}`} />
                  <span className="text-foreground">{p.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground capitalize">{p.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
