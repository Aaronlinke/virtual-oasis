import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ICONS = ["⚔️", "🛡️", "🔥", "💎", "🚀", "👾", "🎮", "⚡"];

interface Card {
  id: number;
  icon: string;
  flipped: boolean;
  matched: boolean;
}

function createDeck(): Card[] {
  const pairs = [...ICONS, ...ICONS];
  return pairs
    .sort(() => Math.random() - 0.5)
    .map((icon, i) => ({ id: i, icon, flipped: false, matched: false }));
}

export default function MemoryGame() {
  const [state, setState] = useState<"idle" | "playing" | "won">("idle");
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [bestMoves, setBestMoves] = useState<number | null>(null);
  const locked = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const startGame = useCallback(() => {
    setCards(createDeck());
    setFlipped([]);
    setMoves(0);
    setTime(0);
    setState("playing");
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
  }, []);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleClick = (id: number) => {
    if (locked.current || state !== "playing") return;
    const card = cards[id];
    if (card.flipped || card.matched) return;

    const newFlipped = [...flipped, id];
    setCards((c) => c.map((card, i) => (i === id ? { ...card, flipped: true } : card)));
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      locked.current = true;
      setMoves((m) => m + 1);
      const [a, b] = newFlipped;
      if (cards[a].icon === cards[id].icon) {
        setTimeout(() => {
          setCards((c) => {
            const updated = c.map((card, i) => (i === a || i === b ? { ...card, matched: true } : card));
            if (updated.every((c) => c.matched)) {
              clearInterval(timerRef.current);
              setState("won");
              const totalMoves = moves + 1;
              if (!bestMoves || totalMoves < bestMoves) setBestMoves(totalMoves);
            }
            return updated;
          });
          setFlipped([]);
          locked.current = false;
        }, 400);
      } else {
        setTimeout(() => {
          setCards((c) => c.map((card, i) => (i === a || i === b ? { ...card, flipped: false } : card)));
          setFlipped([]);
          locked.current = false;
        }, 800);
      }
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex min-h-[250px] flex-col items-center justify-center rounded-lg border-2 border-border bg-muted/20 p-6 text-center">
            <p className="text-2xl font-bold text-foreground">🕹️ Cyber Memory</p>
            <p className="mt-2 text-sm text-muted-foreground">Finde alle Paare! Trainiere dein Gedächtnis im Arcade-Stil.</p>
            <p className="mt-1 text-xs text-muted-foreground">16 Karten • 8 Paare</p>
            <button onClick={startGame} className="mt-4 rounded-md border border-primary/40 bg-primary/20 px-6 py-2.5 font-semibold text-primary transition-colors hover:bg-primary/30">
              Spiel starten
            </button>
          </motion.div>
        )}

        {(state === "playing" || state === "won") && (
          <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>⏱ {formatTime(time)}</span>
              <span>Züge: <span className="font-semibold text-primary">{moves}</span></span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {cards.map((card, i) => (
                <motion.button
                  key={card.id}
                  onClick={() => handleClick(i)}
                  className={`relative flex aspect-square items-center justify-center rounded-lg border-2 text-2xl transition-colors ${
                    card.matched
                      ? "border-neon-green/40 bg-neon-green/10"
                      : card.flipped
                      ? "border-primary/40 bg-primary/20"
                      : "border-border bg-muted/30 hover:bg-muted/50"
                  }`}
                  whileTap={!card.flipped && !card.matched ? { scale: 0.9 } : {}}
                  layout
                >
                  <AnimatePresence mode="wait">
                    {card.flipped || card.matched ? (
                      <motion.span key="icon" initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} exit={{ rotateY: 90 }} transition={{ duration: 0.15 }}>
                        {card.icon}
                      </motion.span>
                    ) : (
                      <motion.span key="back" initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} exit={{ rotateY: 90 }} transition={{ duration: 0.15 }} className="text-muted-foreground/40">
                        ?
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>

            {state === "won" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border-2 border-neon-green/40 bg-neon-green/10 p-5 text-center">
                <p className="text-2xl font-black neon-text-cyan">🎉 Geschafft!</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {moves} Züge in {formatTime(time)}
                </p>
                {bestMoves && <p className="text-xs text-primary mt-1">🏆 Bestleistung: {bestMoves} Züge</p>}
                <button onClick={startGame} className="mt-3 rounded-md border border-primary/40 bg-primary/20 px-6 py-2.5 font-semibold text-primary transition-colors hover:bg-primary/30">
                  Nochmal spielen
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
