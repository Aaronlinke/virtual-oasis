import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animated-grid absolute -inset-[100px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      </div>

      {/* Radial glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-8 px-4 text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="neon-text-cyan text-7xl font-black tracking-[0.2em] sm:text-8xl md:text-9xl">
            OASIS
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mx-auto mt-2 h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-md text-lg text-muted-foreground"
        >
          Die virtuelle Welt wartet auf dich. Erstelle deinen Avatar, erkunde
          Sektoren und werde zur Legende.
        </motion.p>

        {/* Enter Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/dashboard")}
          className="neon-glow-cyan mt-4 rounded-lg border border-primary/40 bg-primary/10 px-10 py-4 text-lg font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary/20"
        >
          ▶ Enter the OASIS
        </motion.button>

        {/* Version tag */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5 }}
          className="text-xs text-muted-foreground"
        >
          Phase 1 · Neural Interface v0.1
        </motion.span>
      </motion.div>
    </div>
  );
};

export default Index;
