import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <div className="relative flex flex-col items-center">
            <div className="relative h-24 w-24">
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 grid place-items-center font-display text-6xl text-brand"
              >
                ₹
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                animate={{ opacity: 1, y: -10, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                className="absolute inset-0 grid place-items-center text-5xl text-brand-gold"
              >
                ↗
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-6 font-display text-4xl text-brand-deep"
            >
              RSI
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted"
            >
              Think Beyond Limits
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
