import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { sectors, avatar, inventoryItems, leaderboard, chatMessages } from "@/data/demo-data";
import AppLayout from "@/components/layout/AppLayout";
import { Progress } from "@/components/ui/progress";
import { useState, lazy, Suspense } from "react";

const OasisGlobe = lazy(() => import("@/components/OasisGlobe"));

const rarityColor: Record<string, string> = {
  legendary: "border-neon-orange text-neon-orange",
  rare: "border-neon-magenta text-neon-magenta",
  common: "border-border text-muted-foreground",
};

const rarityBg: Record<string, string> = {
  legendary: "bg-neon-orange/10",
  rare: "bg-neon-magenta/10",
  common: "bg-muted/30",
};

const sectorGlowClass: Record<string, string> = {
  "neon-cyan": "hover:shadow-[0_0_20px_hsl(185,100%,50%,0.3)]",
  "neon-magenta": "hover:shadow-[0_0_20px_hsl(300,100%,60%,0.3)]",
  "neon-blue": "hover:shadow-[0_0_20px_hsl(220,100%,60%,0.3)]",
  "neon-green": "hover:shadow-[0_0_20px_hsl(150,100%,50%,0.3)]",
  "neon-orange": "hover:shadow-[0_0_20px_hsl(30,100%,55%,0.3)]",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [chatInput, setChatInput] = useState("");

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="neon-text-cyan text-3xl font-black tracking-wide">Neural Interface</h1>
          <p className="text-sm text-muted-foreground">Willkommen zurück, {avatar.name}</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 lg:grid-cols-3">
          {/* === WORLD OVERVIEW (spans 2 cols) === */}
          <motion.section variants={item} className="glass-card p-5 lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold text-foreground">🌐 Welt-Übersicht</h2>
            {/* 3D Globe */}
            <Suspense fallback={<div className="flex h-[350px] items-center justify-center text-muted-foreground">Lade 3D-Welt...</div>}>
              <OasisGlobe onSectorClick={(id) => navigate(`/sector/${id}`)} />
            </Suspense>
            <p className="mt-2 text-xs text-muted-foreground text-center">Klicke auf eine Kugel oder wähle unten einen Sektor</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-3">
              {sectors.map((s) => (
                <button
                  key={s.id}
                  onClick={() => navigate(`/sector/${s.id}`)}
                  className={`flex items-center gap-2 rounded-md bg-muted/20 px-3 py-2 text-left text-sm transition-all duration-300 hover:bg-muted/40 ${sectorGlowClass[s.color] || ""}`}
                >
                  <span className="text-lg">{s.icon}</span>
                  <div>
                    <span className="font-medium text-foreground">{s.name}</span>
                    <span className="ml-2 text-[10px] text-primary">{s.players.toLocaleString()} online</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.section>

          {/* === AVATAR PREVIEW === */}
          <motion.section variants={item} className="glass-card flex flex-col items-center gap-4 p-5 text-center">
            <h2 className="self-start text-lg font-semibold text-foreground">🤖 Avatar</h2>
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/50 bg-primary/10 text-5xl animate-float">
              {avatar.symbol}
            </div>
            <span className="font-bold text-foreground">{avatar.name}</span>
            <div className="w-full space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Level {avatar.level}</span>
                <span className="text-primary">{avatar.xp}/{avatar.xpMax} XP</span>
              </div>
              <Progress value={(avatar.xp / avatar.xpMax) * 100} className="h-2 bg-muted" />
              <div className="flex items-center justify-center gap-1 pt-1 text-neon-orange font-semibold">
                <span>🪙</span> {avatar.coins.toLocaleString()} Coins
              </div>
            </div>
            <button
              onClick={() => navigate("/avatar")}
              className="mt-auto w-full rounded-md border border-primary/30 bg-primary/10 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              Avatar anpassen
            </button>
          </motion.section>

          {/* === INVENTORY === */}
          <motion.section variants={item} className="glass-card p-5 lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold text-foreground">🎒 Inventar</h2>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {inventoryItems.map((i) => (
                <div
                  key={i.id}
                  className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition-colors ${rarityColor[i.rarity]} ${rarityBg[i.rarity]}`}
                >
                  <span className="text-2xl">{i.icon}</span>
                  <span className="text-[10px] leading-tight text-center">{i.name}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* === LEADERBOARD === */}
          <motion.section variants={item} className="glass-card p-5 row-span-2">
            <h2 className="mb-4 text-lg font-semibold text-foreground">🏆 Easter Egg Hunter</h2>
            <div className="space-y-2">
              {leaderboard.map((p) => (
                <div
                  key={p.rank}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                    p.name === avatar.name ? "bg-primary/10 border border-primary/30" : "bg-muted/20"
                  }`}
                >
                  <span className={`w-6 text-center font-bold ${p.rank <= 3 ? "text-neon-orange" : "text-muted-foreground"}`}>
                    {p.rank}
                  </span>
                  <span className="text-lg">{p.avatar}</span>
                  <span className="flex-1 truncate font-medium text-foreground">{p.name}</span>
                  <span className="text-xs text-primary">{p.eggs} 🥚</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* === QUICK CHAT === */}
          <motion.section variants={item} className="glass-card flex flex-col p-5 lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold text-foreground">💬 Quick-Chat</h2>
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto max-h-52 mb-3">
              {chatMessages.map((m, idx) => (
                <div key={idx} className="rounded-md bg-muted/20 px-3 py-2 text-sm">
                  <span className="font-semibold text-primary">{m.user}</span>
                  <span className="mx-2 text-muted-foreground">·</span>
                  <span className="text-[10px] text-muted-foreground">{m.time}</span>
                  <p className="mt-1 text-foreground/80">{m.message}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Nachricht senden..."
                className="flex-1 rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
              />
              <button className="rounded-md bg-primary/20 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/30">
                Senden
              </button>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </AppLayout>
  );
}
