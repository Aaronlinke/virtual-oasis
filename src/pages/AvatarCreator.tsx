import { useState } from "react";
import { motion } from "framer-motion";
import { avatarOptions } from "@/data/demo-data";
import AppLayout from "@/components/layout/AppLayout";

export default function AvatarCreator() {
  const [name, setName] = useState("NeonRider_X");
  const [selectedSymbol, setSelectedSymbol] = useState("🤖");
  const [selectedColor, setSelectedColor] = useState(avatarOptions.colors[0].value);

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="neon-text-cyan text-3xl font-black mb-2">Avatar Creator</h1>
          <p className="text-sm text-muted-foreground mb-8">Erstelle deinen einzigartigen OASIS-Avatar</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Preview */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-card flex flex-col items-center gap-6 p-8">
            <h2 className="text-lg font-semibold">Vorschau</h2>
            <div
              className="flex h-32 w-32 items-center justify-center rounded-full text-6xl animate-float"
              style={{ border: `3px solid ${selectedColor}`, boxShadow: `0 0 30px ${selectedColor}40` }}
            >
              {selectedSymbol}
            </div>
            <span className="text-xl font-bold text-foreground">{name || "Unbenannt"}</span>
            <p className="text-xs text-muted-foreground text-center">
              ReadyPlayerMe-Integration kommt in Phase 2 – dann kannst du einen vollständigen 3D-Avatar erstellen!
            </p>
          </motion.div>

          {/* Options */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            {/* Name */}
            <div className="glass-card p-5">
              <label className="mb-2 block text-sm font-semibold">Avatar-Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                className="w-full rounded-md border border-border bg-muted/30 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
              />
            </div>

            {/* Symbol */}
            <div className="glass-card p-5">
              <label className="mb-3 block text-sm font-semibold">Symbol</label>
              <div className="grid grid-cols-6 gap-2">
                {avatarOptions.symbols.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSymbol(s)}
                    className={`flex h-12 items-center justify-center rounded-md text-2xl transition-all ${
                      s === selectedSymbol ? "bg-primary/20 border border-primary/50 neon-glow-cyan scale-110" : "bg-muted/20 hover:bg-muted/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="glass-card p-5">
              <label className="mb-3 block text-sm font-semibold">Akzentfarbe</label>
              <div className="grid grid-cols-3 gap-3">
                {avatarOptions.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.value)}
                    className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-all ${
                      c.value === selectedColor ? "border-foreground/50 bg-muted/40" : "border-border bg-muted/10 hover:bg-muted/20"
                    }`}
                  >
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: c.value }} />
                    <span className="text-xs">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full rounded-md bg-primary/20 border border-primary/40 py-3 font-semibold text-primary hover:bg-primary/30 transition-colors neon-glow-cyan">
              Avatar speichern
            </button>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
