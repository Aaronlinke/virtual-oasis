import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GameState = "idle" | "waiting" | "ready" | "clicked" | "toosoon";

export default function ReactionGame() {
  const [state, setState] = useState<GameState>("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const readyAt = useRef<number>(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const start = useCallback(() => {
    setState("waiting");
    setReactionTime(null);
    const delay = 1500 + Math.random() * 3500;
    timer.current = setTimeout(() => {
      readyAt.current = Date.now();
      setState("ready");
    }, delay);
  }, []);

  const handleClick = useCallback(() => {
    if (state === "waiting") {
      clearTimeout(timer.current);
      setState("toosoon");
    } else if (state === "ready") {
      const time = Date.now() - readyAt.current;
      setReactionTime(time);
      setHistory((h) => [...h.slice(-9), time]);
      if (!bestTime || time < bestTime) setBestTime(time);
      setState("clicked");
    }
  }, [state, bestTime]);

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  const avg = history.length ? Math.round(history.reduce((a, b) => a + b, 0) / history.length) : null;

  const bgClass =
    state === "waiting"
      ? "bg-destructive/20 border-destructive/40"
      : state === "ready"
      ? "bg-neon-green/20 border-neon-green/40"
      : state === "toosoon"
      ? "bg-neon-orange/20 border-neon-orange/40"
      : state === "clicked"
      ? "bg-primary/20 border-primary/40"
      : "bg-muted/20 border-border";

  return (
    <div className="space-y-4">
      {/* Game area */}
      <motion.div
        onClick={state === "waiting" || state === "ready" ? handleClick : undefined}
        className={`relative flex min-h-[200px] cursor-pointer select-none flex-col items-center justify-center rounded-lg border-2 p-6 transition-colors ${bgClass}`}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <p className="text-2xl font-bold text-foreground">⚡ Reaktionstest</p>
              <p className="mt-2 text-sm text-muted-foreground">Wie schnell bist du? Teste deine Reflexe!</p>
              <button
                onClick={start}
                className="mt-4 rounded-md border border-primary/40 bg-primary/20 px-6 py-2.5 font-semibold text-primary transition-colors hover:bg-primary/30"
              >
                Spiel starten
              </button>
            </motion.div>
          )}
          {state === "waiting" && (
            <motion.div key="wait" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <p className="text-3xl font-black text-destructive">Warte...</p>
              <p className="mt-1 text-sm text-muted-foreground">Klicke wenn es GRÜN wird!</p>
            </motion.div>
          )}
          {state === "ready" && (
            <motion.div key="go" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <p className="text-4xl font-black text-neon-green">JETZT!</p>
              <p className="mt-1 text-sm text-foreground/70">Klick so schnell du kannst!</p>
            </motion.div>
          )}
          {state === "toosoon" && (
            <motion.div key="toosoon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <p className="text-2xl font-black text-neon-orange">Zu früh! 😅</p>
              <p className="mt-2 text-sm text-muted-foreground">Du musst warten bis es grün wird.</p>
              <button
                onClick={start}
                className="mt-4 rounded-md border border-primary/40 bg-primary/20 px-6 py-2.5 font-semibold text-primary transition-colors hover:bg-primary/30"
              >
                Nochmal
              </button>
            </motion.div>
          )}
          {state === "clicked" && (
            <motion.div key="result" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <p className="text-lg text-muted-foreground">Deine Zeit:</p>
              <p className={`text-5xl font-black ${reactionTime && reactionTime < 250 ? "neon-text-cyan" : reactionTime && reactionTime < 400 ? "text-neon-green" : "text-neon-orange"}`}>
                {reactionTime} ms
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {reactionTime && reactionTime < 200
                  ? "🏆 Übermenschlich!"
                  : reactionTime && reactionTime < 300
                  ? "⚡ Blitzschnell!"
                  : reactionTime && reactionTime < 400
                  ? "👍 Gut!"
                  : "🐢 Übung macht den Meister!"}
              </p>
              <button
                onClick={start}
                className="mt-4 rounded-md border border-primary/40 bg-primary/20 px-6 py-2.5 font-semibold text-primary transition-colors hover:bg-primary/30"
              >
                Nochmal
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Stats */}
      {history.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-3">
          <div className="glass-card p-3 text-center">
            <p className="text-[10px] uppercase text-muted-foreground">Beste</p>
            <p className="text-lg font-bold neon-text-cyan">{bestTime} ms</p>
          </div>
          <div className="glass-card p-3 text-center">
            <p className="text-[10px] uppercase text-muted-foreground">Durchschnitt</p>
            <p className="text-lg font-bold text-foreground">{avg} ms</p>
          </div>
          <div className="glass-card p-3 text-center">
            <p className="text-[10px] uppercase text-muted-foreground">Versuche</p>
            <p className="text-lg font-bold text-foreground">{history.length}</p>
          </div>
        </motion.div>
      )}

      {/* History bar chart */}
      {history.length > 1 && (
        <div className="glass-card p-4">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">Verlauf</p>
          <div className="flex items-end gap-1 h-16">
            {history.map((t, i) => {
              const maxT = Math.max(...history);
              const h = Math.max(10, (t / maxT) * 100);
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className={`flex-1 rounded-sm ${t === bestTime ? "bg-primary" : "bg-muted-foreground/30"}`}
                  title={`${t} ms`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
