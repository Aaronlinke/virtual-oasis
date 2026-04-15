import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: "Wie heißt der Schöpfer der OASIS?",
    options: ["Wade Watts", "James Halliday", "Nolan Sorrento", "Ogden Morrow"],
    correct: 1,
    explanation: "James Halliday erschuf die OASIS und versteckte darin die Easter Eggs.",
  },
  {
    question: "Welcher Schlüssel wird zuerst in Ready Player One gefunden?",
    options: ["Jade-Schlüssel", "Kristall-Schlüssel", "Kupfer-Schlüssel", "Gold-Schlüssel"],
    correct: 2,
    explanation: "Der Kupfer-Schlüssel war der erste der drei Schlüssel.",
  },
  {
    question: "Wie heißt Wades Avatar in der OASIS?",
    options: ["Art3mis", "Aech", "Parzival", "Daito"],
    correct: 2,
    explanation: "Wade Watts nutzt den Avatar-Namen Parzival, nach dem Ritter der Artus-Sage.",
  },
  {
    question: "Welches Unternehmen will die OASIS übernehmen?",
    options: ["Gregarious Games", "IOI (Innovative Online Industries)", "Halliday Corp", "Morrow Digital"],
    correct: 1,
    explanation: "IOI unter Nolan Sorrento wollte die OASIS kontrollieren und monetarisieren.",
  },
  {
    question: "Welches Jahrzehnt spielt eine zentrale Rolle in Hallidays Easter Egg Hunt?",
    options: ["1970er", "1980er", "1990er", "2000er"],
    correct: 1,
    explanation: "Halliday war besessen von der Popkultur der 1980er Jahre.",
  },
  {
    question: "Was ist die mächtigste Waffe in der OASIS?",
    options: ["BFG9000", "Die Cataclyst-Bombe", "Excalibur", "Mega-Blaster"],
    correct: 1,
    explanation: "Die Cataclyst kann einen gesamten Sektor der OASIS zerstören.",
  },
  {
    question: "In welchem Jahr spielt Ready Player One?",
    options: ["2035", "2045", "2050", "2077"],
    correct: 1,
    explanation: "Die Handlung spielt im Jahr 2045.",
  },
  {
    question: "Wie heißt das reale Zuhause von Wade Watts?",
    options: ["The Stacks", "Neo Tokyo", "Sector 7", "The Grid"],
    correct: 0,
    explanation: "Die 'Stacks' sind gestapelte Wohnwagen-Siedlungen in Columbus, Ohio.",
  },
];

export default function QuizGame() {
  const [state, setState] = useState<"idle" | "playing" | "result">("idle");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  const startGame = useCallback(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
    setShuffledQuestions(shuffled);
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowExplanation(false);
    setState("playing");
  }, []);

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setShowExplanation(true);
    if (index === shuffledQuestions[currentQ].correct) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= shuffledQuestions.length) {
      setState("result");
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  const q = shuffledQuestions[currentQ];

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex min-h-[250px] flex-col items-center justify-center rounded-lg border-2 border-border bg-muted/20 p-6 text-center">
            <p className="text-2xl font-bold text-foreground">🗺️ OASIS-Wissensquiz</p>
            <p className="mt-2 text-sm text-muted-foreground">Teste dein Wissen über die OASIS und Ready Player One!</p>
            <p className="mt-1 text-xs text-muted-foreground">5 Fragen • Mehrere Schwierigkeitsgrade</p>
            <button onClick={startGame} className="mt-4 rounded-md border border-primary/40 bg-primary/20 px-6 py-2.5 font-semibold text-primary transition-colors hover:bg-primary/30">
              Quiz starten
            </button>
          </motion.div>
        )}

        {state === "playing" && q && (
          <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Frage {currentQ + 1} von {shuffledQuestions.length}</span>
              <span className="font-semibold text-primary">{score} Punkte</span>
            </div>
            <div className="h-1 rounded-full bg-muted/30">
              <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${((currentQ + 1) / shuffledQuestions.length) * 100}%` }} />
            </div>
            <div className="rounded-lg border-2 border-border bg-muted/20 p-5">
              <p className="text-lg font-semibold text-foreground">{q.question}</p>
            </div>
            <div className="grid gap-2">
              {q.options.map((opt, i) => {
                let cls = "border-border bg-muted/20 hover:bg-muted/40 text-foreground";
                if (selected !== null) {
                  if (i === q.correct) cls = "border-neon-green/60 bg-neon-green/20 text-neon-green";
                  else if (i === selected) cls = "border-destructive/60 bg-destructive/20 text-destructive";
                  else cls = "border-border bg-muted/10 text-muted-foreground opacity-50";
                }
                return (
                  <motion.button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={selected !== null}
                    className={`rounded-lg border-2 px-4 py-3 text-left font-medium transition-colors ${cls}`}
                    whileTap={selected === null ? { scale: 0.98 } : {}}
                  >
                    <span className="mr-2 text-xs text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                );
              })}
            </div>
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm text-foreground">
                  💡 {q.explanation}
                </div>
                <button onClick={nextQuestion} className="w-full rounded-md border border-primary/40 bg-primary/20 px-6 py-2.5 font-semibold text-primary transition-colors hover:bg-primary/30">
                  {currentQ + 1 >= shuffledQuestions.length ? "Ergebnis anzeigen" : "Nächste Frage →"}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {state === "result" && (
          <motion.div key="result" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="flex min-h-[250px] flex-col items-center justify-center rounded-lg border-2 border-border bg-muted/20 p-6 text-center">
            <p className="text-lg text-muted-foreground">Dein Ergebnis:</p>
            <p className={`text-5xl font-black ${score >= 4 ? "neon-text-cyan" : score >= 2 ? "text-neon-green" : "text-neon-orange"}`}>
              {score}/{shuffledQuestions.length}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {score === 5 ? "🏆 Perfekt! Du bist ein wahrer Gunter!" : score >= 4 ? "⚡ Fast perfekt! Beeindruckend!" : score >= 2 ? "👍 Nicht schlecht! Weiter üben!" : "📚 Zeit für eine Rewatch-Session!"}
            </p>
            <button onClick={startGame} className="mt-4 rounded-md border border-primary/40 bg-primary/20 px-6 py-2.5 font-semibold text-primary transition-colors hover:bg-primary/30">
              Nochmal spielen
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
