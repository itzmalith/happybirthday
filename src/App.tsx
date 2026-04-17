/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Heart, Camera, Sparkles, Feather, Quote, Stars } from "lucide-react";

const TARGET_DATE = new Date("2026-04-18T00:00:00").getTime();

const POEMS = [
  {
    title: "Freudian slip",
    date: "11/03/25",
    content: "The first “i guess i love you” text was a freudian slip. \nIt wasn’t in the plan to say it too soon.\nI cherished that one sided moment, and i wanted more of it. \nBut things went fine, then i wanted more of this. \n\nAs time goes by, we met highs and lows.\nWhen times were hard, we defined what’s right and wrong.\nIt’s hard to live six years with an opinionated man like me,\nYet, you made it home. \nSo if after life is real , in each and every life ,\nI’ll sing our song.",
    author: "Malith lekamge"
  },
  {
    title: "The Best Mistake",
    date: "12/03/25",
    content: "It wasn’t meant to come out like that,\nno rehearsed line, no perfect timing—\njust me, somewhere between overthinking and truth,\ntyping what I couldn’t fully explain.\n\n\"i don't know why, don't know how. i guess im in love with you.\"\n\nEven now, I don’t think I could’ve said it better,\nor worse\nbecause that’s exactly how it felt.",
    footer: "and thats the best thing i did in my life <3"
  },
  {
    title: "The Art",
    date: "12/06/25",
    content: "The first thing I noticed\nthe way your fingers danced on the keys,\nsoft, certain, like they knew\nexactly where to be.\n“well, that’s art,” I thought to myself.\n\nSomewhere down the line,\nyou read the things I write,\nsaid you love those poems\n“that’s art,” you said it this time.\n\nPhilosophers can argue\nwhat art is all about,\nnow i feels that’s too personal\nto map it out.\nIt’s not something we play,\nit’s not something we write \n\nwe are the art, babe\nwild, fragile, and alive\nTell them to hang us in the Louvre,\nnext to Mona Lisa’s fate"
  },
  {
    title: "The Vow",
    content: "“Do you promise to love, support, and care for this person,\nand to stand by them through all of life’s joys and challenges?”\n\nWell I did, and she did too,\ntwo outlaw hearts, still seeing it through.\nStraight outta chaos, that’s the path we knew.\nPain came loud we survived it too.\n\nYou got no damn idea what vows can weigh,\nHow forever talks when the skies go gray,\nEven When the times were bitch she chose to stay\nto hell with vows, we were born to slay"
  }
];

const imageModules = import.meta.glob("./components/photos/*.{jpeg,jpg,png,webp}", { eager: true });
const SAMPLE_MEMORIES = Object.values(imageModules).map((mod: any, i) => ({
  id: i + 1,
  url: mod.default,
  caption: "" 
}));

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(TARGET_DATE - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(TARGET_DATE - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return useMemo(() => {
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return { timeLeft, hours, minutes, seconds };
  }, [timeLeft]);
}

export default function App() {
  const { timeLeft, hours, minutes, seconds } = useCountdown();
  const [isTestMode, setIsTestMode] = useState(false);

  const isBdayTime = timeLeft <= 0 || isTestMode;

  useEffect(() => {
    if (isBdayTime) {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isBdayTime]);

  return (
    <div className="min-h-screen selection:bg-rose-500/30">
      <div className="atmosphere" />
      
      {/* Background Floating Hearts */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-romantic-rose"
            initial={{ y: "110%", x: `${Math.random() * 100}%` }}
            animate={{
              y: "-10%",
              x: `${Math.random() * 100}%`,
              rotate: [0, 90, 180, 270],
              scale: [0.5, 1, 0.5],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          >
            <Heart size={15 + Math.random() * 30} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <main className="relative z-10 container mx-auto px-4 min-h-screen py-20 flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          {!isBdayTime ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center space-y-24 w-full max-w-4xl"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-4 text-accent font-sans tracking-[6px] text-[12px] uppercase font-bold gold-glow"
                >
                  <Heart size={16} fill="currentColor" className="heart-glow" />
                  <span>The 25th Milestone</span>
                  <Heart size={16} fill="currentColor" className="heart-glow" />
                </motion.div>
                <h1 className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-white/90 leading-[1.1] tracking-[-2px]">
                  Where your story <br /> meets <span className="text-romantic-rose text-glow">Twenty-Five</span>
                </h1>
              </div>

              <div className="flex gap-4 md:gap-16 justify-center items-center">
                <TimeUnit value={hours} label="Hours" />
                <TimeUnit value={minutes} label="Mins" />
                <TimeUnit value={seconds} label="Secs" />
              </div>

              <div className="space-y-12">
                <p className="font-serif italic text-xl md:text-3xl text-white/40 max-w-2xl mx-auto leading-relaxed">
                  "Counting each heart-beat until you reach this beautiful new chapter, love."
                </p>
                
                <div className="flex flex-col items-center gap-6">
                  <motion.button 
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsTestMode(true)}
                    className="p-4 rounded-full text-romantic-rose opacity-20 hover:opacity-100 transition-all duration-500 cursor-pointer"
                  >
                    <Heart size={24} fill="currentColor" className="heart-glow" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="birthday"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-5xl py-12 space-y-32"
            >
              {/* Hero Section */}
              <div className="text-center space-y-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="relative inline-block"
                >
                  <motion.h1 
                    className="font-display italic text-7xl md:text-9xl lg:text-[11rem] leading-[0.85] text-glow relative z-10 px-6"
                  >
                    Happy <br /> 
                    <span className="text-romantic-rose">25th</span><br />
                    <span className="text-white">Love!</span>
                  </motion.h1>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-16 -right-16 text-accent opacity-30 blur-[1px]"
                  >
                    <Sparkles size={160} />
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <p className="font-serif italic text-2xl md:text-4xl text-romantic-rose/70">
                    "Starting the journey of your 25th year <br /> with all the love my heart can carry."
                  </p>
                  <div className="flex justify-center gap-2 text-accent/40">
                    <Stars size={20} />
                    <Stars size={20} />
                    <Stars size={20} />
                  </div>
                </motion.div>
              </div>

              {/* Poem Section */}
              <div className="space-y-20">
                <SectionHeader icon={<Feather size={24} />} title="Letters for my heart" />
                
                <div className="grid grid-cols-1 gap-12">
                  {POEMS.map((poem, i) => (
                    <PoemCard key={i} poem={poem} index={i} />
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center font-serif italic text-2xl text-accent py-12 gold-glow"
                  >
                    "and thats the best thing i did in my life ❤️"
                  </motion.div>
                </div>
              </div>

              {/* Digital Art Gallery */}
              <div className="space-y-20">
                <SectionHeader icon={<Camera size={24} />} title="The art we are" />
                
                <div className="frosted-glass p-4 md:p-12 rounded-[4rem]">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SAMPLE_MEMORIES.map((memory, i) => (
                      <MemoryCard key={memory.id} memory={memory} index={i} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Final Love Letter */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="frosted-glass p-16 md:p-24 rounded-[5rem] inline-block space-y-10 max-w-4xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-romantic-rose to-transparent opacity-30" />
                  
                  <Heart className="mx-auto text-romantic-rose heart-glow animate-pulse" fill="currentColor" size={64} />
                  <h3 className="font-display text-5xl italic text-accent uppercase tracking-[-2px] gold-glow">To my most beautiful soul</h3>
                  <p className="font-serif italic text-2xl leading-[1.8] text-white/90">
                    "Happy 25th, love. You are the heartbeat of my soul and the most beautiful part of my world. 
                    I hope this new chapter is as radiant as your smile and as kind as your heart. 
                    I love you today, tomorrow, and in every life we ever live."
                  </p>
                  
                  <div className="pt-8 font-mono text-[10px] tracking-[4px] opacity-40 uppercase">
                    Your Always & Forever
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-12 left-0 right-0 z-20 pointer-events-none px-12">
        <div className="container mx-auto flex justify-between items-end">
          <div className="space-y-1 opacity-20">
            <p className="text-[9px] uppercase tracking-[0.4em] font-bold">Chronicle 2026</p>
            <p className="text-[9px] uppercase tracking-[0.4em] font-bold">Chapter XXV</p>
          </div>
          <div className="h-px bg-white/10 w-24 hidden md:block" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-20 text-right">
            For you, <br /> my home
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-romantic-rose heart-glow">{icon}</div>
      <h2 className="font-serif italic text-4xl md:text-5xl tracking-tight text-white/80">{title}</h2>
      <div className="h-px w-32 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </div>
  );
}

function PoemCard({ poem, index, key }: { poem: any; index: number; key?: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="frosted-glass p-12 md:p-20 rounded-[3rem] relative group"
    >
      <Quote className="absolute top-10 right-10 text-romantic-rose/10 group-hover:text-romantic-rose/20 transition-colors" size={100} />
      
      <div className="space-y-8 relative z-10">
        <div className="flex justify-between items-end border-b border-white/5 pb-6">
          <h3 className="font-display text-3xl italic text-accent gold-glow uppercase tracking-tighter">{poem.title}</h3>
          {poem.date && <p className="font-mono text-[10px] opacity-30 tracking-[3px] uppercase">{poem.date}</p>}
        </div>
        
        <p className="font-serif italic text-xl md:text-2xl leading-[2] text-white/80 whitespace-pre-wrap">
          {poem.content}
        </p>

        {(poem.author || poem.footer) && (
          <div className="pt-8 border-t border-white/5">
            {poem.author && <p className="font-mono text-[11px] tracking-[4px] text-accent/50 uppercase">{poem.author}</p>}
            {poem.footer && <p className="font-serif italic text-lg text-romantic-rose/80 mt-2">{poem.footer}</p>}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center frosted-glass w-[110px] md:w-[140px] h-[130px] md:h-[160px] justify-center rounded-[3rem] group hover:border-romantic-rose/30 transition-all duration-500">
      <motion.span
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-mono text-[42px] md:text-[56px] font-bold tabular-nums text-glow"
      >
        {String(value).padStart(2, '0')}
      </motion.span>
      <span className="text-[10px] uppercase tracking-[4px] font-bold opacity-30 group-hover:opacity-60 transition-opacity mt-1">{label}</span>
    </div>
  );
}

function MemoryCard({ memory, index }: { memory: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative group aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-black border border-white/5 cursor-pointer shadow-2xl"
    >
      <img
        src={memory.url}
        alt={memory.caption}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 grayscale contrast-[1.1] brightness-[0.6] group-hover:scale-110 group-hover:brightness-[0.8]"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-10 pt-20 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="h-px w-0 group-hover:w-full bg-accent/30 transition-all duration-700 mt-4" />
      </div>
    </motion.div>
  );
}
