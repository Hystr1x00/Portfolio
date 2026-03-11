"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, MotionValue } from "framer-motion";


// ─── Reused from Introduction ───────────────────────────────────────────────

const PixelStar = ({
  className,
  delay = "0s",
  duration = "4s",
}: {
  className?: string;
  delay?: string;
  duration?: string;
}) => (
  <div
    className={`absolute flex flex-col items-center pointer-events-none animate-twinkle ${className}`}
    style={{ animationDelay: delay, animationDuration: duration }}
  >
    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#e5e5e5]" />
    <div className="flex">
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#e5e5e5]" />
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white" />
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#e5e5e5]" />
    </div>
    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#e5e5e5]" />
  </div>
);

const SmallStar = ({
  className,
  delay = "0s",
}: {
  className?: string;
  delay?: string;
}) => (
  <div
    className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white pointer-events-none animate-pulse ${className}`}
    style={{ animationDelay: delay }}
  />
);

const ShootingStar = ({
  x,
  y,
  opacity,
  rotate = 0,
}: {
  x: any;
  y: any;
  opacity: any;
  rotate?: number;
}) => (
  <motion.div
    className="absolute pointer-events-none z-[100]"
    style={{ x, y, opacity, rotate }}
  >
    <div className="flex items-center flex-row">
      <div className="flex items-center -mr-1">
        <div className="w-32 h-1 bg-gradient-to-r from-transparent to-white/10" />
        <div className="w-24 h-1.5 bg-gradient-to-r from-transparent to-white/40 -ml-8" />
        <div className="w-16 h-2.5 bg-gradient-to-r from-transparent to-white/80 -ml-4" />
      </div>
      <div className="w-5 h-5 bg-white shadow-[0_0_25px_rgba(255,255,255,1),0_0_12px_rgba(255,255,255,0.9)] relative z-10" />
    </div>
  </motion.div>
);

// ─── Experience Data ─────────────────────────────────────────────────────────

const experiences = [
  {
    company: "Human Plus Institute",
    role: "Full-stack Developer",
    period: "Jan - Present 2026",
    color: "#f5c400",
    glowColor: "rgba(245,196,0,0.35)",
    index: "01",
    tag: "CURRENT MISSION",
  },
  {
    company: "Telkom Indonesia",
    role: "System Analyst",
    period: "Jun - Sept 2025",
    color: "#ff4560",
    glowColor: "rgba(255,69,96,0.35)",
    index: "02",
    tag: "COMPLETED",
  },
  {
    company: "Humic Engineering",
    role: "Front-end Dev",
    period: "Apr - Jul 2025",
    color: "#00cfff",
    glowColor: "rgba(0,207,255,0.35)",
    index: "03",
    tag: "COMPLETED",
  },
];

// ─── Pixel Grid ──────────────────────────────────────────────────────────────

function PixelGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="exp-pg-s" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
          </pattern>
          <pattern id="exp-pg-b" x="0" y="0" width="96" height="96" patternUnits="userSpaceOnUse">
            <path d="M 96 0 L 0 0 0 96" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#exp-pg-s)" />
        <rect width="100%" height="100%" fill="url(#exp-pg-b)" />
      </svg>
    </div>
  );
}

// ─── Stair Connector ─────────────────────────────────────────────────────────

function StairConnector({ color }: { color: string }) {
  return (
    <div className="flex justify-center my-0.5" style={{ height: 44 }}>
      <svg width="80" height="44" viewBox="0 0 80 44">
        <polyline
          points="40,0 40,14 60,14 60,30 80,30 80,44"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="square"
          strokeLinejoin="miter"
          style={{ filter: `drop-shadow(0 0 5px ${color})` }}
        />
        <rect x="37" y="11" width="6" height="6" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
        <rect x="57" y="27" width="6" height="6" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
      </svg>
    </div>
  );
}

// ─── Scroll Moon ─────────────────────────────────────────────────────────────

function ScrollMoon({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [frame, setFrame] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalFrames = 18;
    const currentFrame = Math.min(totalFrames, Math.max(0, Math.floor(latest * (totalFrames + 1))));
    setFrame(currentFrame);
  });

  const frameStr = frame.toString().padStart(2, "0");
  const src = `/Moon/frame_${frameStr}_delay-0.08s.gif`;

  // Adjust blending for Cyber Midnight transition
  const moonOpacity = useTransform(scrollYProgress, [0.7, 0.95], [0.8, 1.0]);
  const glowOpacity = useTransform(scrollYProgress, [0.7, 0.95], [0.2, 0.35]);

  return (
    <motion.div
      style={{ opacity: moonOpacity }}
      className="absolute bottom-[-250] left-1/2 -translate-x-1/2 translate-y-[200px] sm:translate-y-[350px] w-[800px] h-[800px] sm:w-[1100px] sm:h-[1100px] pointer-events-none z-10 mix-blend-screen flex items-center justify-center"
    >
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 bg-blue-500 rounded-full blur-3xl"
      />
      <img
        src={src}
        alt="Animated Moon"
        className="relative z-10 w-full h-full object-contain pixelated"
      />
    </motion.div>
  );
}

// ─── Auto Satellite (flies on its own loop) ──────────────────────────────────

function AutoSatellite({
  startX,
  endX,
  startY,
  endY,
  duration,
  delay,
  size = 500,
  rotate = -30,
}: {
  startX: string;
  endX: string;
  startY: string;
  endY: string;
  duration: number;
  delay: number;
  size?: number;
  rotate?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none z-[60]"
      initial={{ x: startX, y: startY, opacity: 0 }}
      animate={{
        x: [startX, endX],
        y: [startY, endY],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ rotate }}
    >
      <div className="relative flex items-center">
        {/* Light trail */}
        <div
          className="absolute right-full top-1/2 -translate-y-1/2"
          style={{
            width: size * 4,
            height: size * 0.15,
            background: "linear-gradient(to left, rgba(100,180,255,0.6), rgba(100,180,255,0.2), transparent)",
            filter: "blur(2px)",
            borderRadius: 999,
          }}
        />
        <div
          className="absolute right-full top-1/2 -translate-y-1/2"
          style={{
            width: size * 2.5,
            height: size * 0.4,
            background: "linear-gradient(to left, rgba(255,255,255,0.4), transparent)",
            filter: "blur(4px)",
            borderRadius: 999,
          }}
        />
        {/* Glow */}
        <div
          className="absolute inset-[-8px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(100,180,255,0.5) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
        {/* Satellite image */}
        <img
          src="/satelite.webp"
          alt="Satellite"
          className="pixelated relative z-10"
          style={{ width: size, height: size }}
        />
      </div>
    </motion.div>
  );
}

// ─── Scroll Satellite (controlled by scroll) ─────────────────────────────────

function ScrollSatellite({
  scrollYProgress,
  inputRange,
  xOutput,
  yOutput,
  size = 48,
  rotate = -25,
}: {
  scrollYProgress: MotionValue<number>;
  inputRange: [number, number];
  xOutput: [string, string];
  yOutput: [string, string];
  size?: number;
  rotate?: number;
}) {
  const x = useTransform(scrollYProgress, inputRange, xOutput);
  const y = useTransform(scrollYProgress, inputRange, yOutput);
  const opacity = useTransform(
    scrollYProgress,
    [inputRange[0], inputRange[0] + 0.05, inputRange[1] - 0.05, inputRange[1]],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute pointer-events-none z-[60]"
      style={{ x, y, opacity, rotate }}
    >
      <div className="relative flex items-center">
        {/* Light trail */}
        <div
          className="absolute right-full top-1/2 -translate-y-1/2"
          style={{
            width: size * 5,
            height: size * 0.12,
            background: "linear-gradient(to left, rgba(255,200,60,0.7), rgba(255,200,60,0.2), transparent)",
            filter: "blur(2px)",
            borderRadius: 999,
          }}
        />
        <div
          className="absolute right-full top-1/2 -translate-y-1/2"
          style={{
            width: size * 3,
            height: size * 0.35,
            background: "linear-gradient(to left, rgba(255,255,255,0.3), transparent)",
            filter: "blur(5px)",
            borderRadius: 999,
          }}
        />
        {/* Glow */}
        <div
          className="absolute inset-[-12px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,200,60,0.5) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
        {/* Satellite image */}
        <img
          src="/satelite.webp"
          alt="Satellite"
          className="pixelated relative z-10"
          style={{ width: size, height: size }}
        />
      </div>
    </motion.div>
  );
}

// ─── Experience Card ─────────────────────────────────────────────────────────


function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.38"],
  });

  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -100 : 100, 0]
  );
  const x = useSpring(rawX, { stiffness: 110, damping: 22 });
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.55], [0, 1]),
    { stiffness: 110, damping: 22 }
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.9, 1]),
    { stiffness: 110, damping: 22 }
  );

  return (
    <motion.div ref={ref} style={{ x, opacity, scale }} className="relative">
      {/* Glow shadow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `0 0 28px 4px ${exp.glowColor}, 6px 6px 0px rgba(0,0,0,0.85)`,
        }}
      />

      {/* Card */}
      <div
        className="relative border-2 overflow-hidden"
        style={{
          borderColor: exp.color,
          backgroundColor: "rgba(4,4,18,0.88)",
          clipPath:
            "polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Top glow bar */}
        <div
          className="h-1 w-full"
          style={{ backgroundColor: exp.color, boxShadow: `0 0 10px ${exp.color}` }}
        />

        {/* CRT scanlines */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
          }}
        />

        <div className="p-5 relative z-20">
          {/* Mission tag */}
          <div className="mb-3 flex items-center gap-2">
            <motion.div
              className="w-2 h-2"
              style={{ backgroundColor: exp.color, boxShadow: `0 0 6px ${exp.color}` }}
              animate={{ opacity: [1, 0.15, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span
              className="text-xs font-bold tracking-widest uppercase pixelated"
              style={{ color: exp.color, fontFamily: "'Courier New', monospace" }}
            >
              {exp.tag}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Index + Role */}
            <div className="flex items-start gap-4">
              <div
                className="text-5xl font-black leading-none select-none"
                style={{
                  color: exp.color,
                  fontFamily: "'Courier New', monospace",
                  textShadow: `0 0 24px ${exp.glowColor}, 3px 3px 0px rgba(0,0,0,0.9)`,
                }}
              >
                {exp.index}
              </div>
              <div>
                <h3
                  className="text-white text-xl md:text-2xl font-black uppercase tracking-tight leading-tight pixelated"
                  style={{ textShadow: "2px 2px 0px rgba(0,0,0,1)" }}
                >
                  {exp.role}
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="w-2 h-2" style={{ backgroundColor: exp.color }} />
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "#8899bb", fontFamily: "'Courier New', monospace" }}
                  >
                    {exp.company}
                  </span>
                </div>
              </div>
            </div>

            {/* Period badge */}
            <div
              className="self-start md:self-auto px-3 py-2 border-2 font-black text-xs uppercase tracking-widest"
              style={{
                borderColor: exp.color,
                color: exp.color,
                fontFamily: "'Courier New', monospace",
                backgroundColor: "rgba(0,0,0,0.6)",
                boxShadow: `3px 3px 0px ${exp.color}55, 0 0 14px ${exp.glowColor}`,
              }}
            >
              {exp.period}
            </div>
          </div>

          {/* Pixel progress bar */}
          <div className="mt-4 flex gap-0.5 items-end">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 5,
                  height: 3 + (i % 4) * 2,
                  backgroundColor: exp.color,
                  opacity: 0.15 + (i / 18) * 0.85,
                  boxShadow: i > 13 ? `0 0 5px ${exp.color}` : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* Pixel corner cuts */}
        {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-2.5 h-2.5`} style={{ backgroundColor: "#040412" }} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, 0]),
    { stiffness: 100, damping: 20 }
  );
  const titleOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.7], [0, 1]),
    { stiffness: 100, damping: 20 }
  );

  // Shooting stars tied to section scroll
  const s1x = useTransform(scrollYProgress, [0.0, 0.5], ["120vw", "-50vw"]);
  const s1y = useTransform(scrollYProgress, [0.0, 0.5], ["-20vh", "110vh"]);
  const s1o = useTransform(scrollYProgress, [0.0, 0.05, 0.45, 0.5], [0, 1, 1, 0]);

  const s2x = useTransform(scrollYProgress, [0.2, 0.7], ["140vw", "-40vw"]);
  const s2y = useTransform(scrollYProgress, [0.2, 0.7], ["-25vh", "120vh"]);
  const s2o = useTransform(scrollYProgress, [0.2, 0.25, 0.65, 0.7], [0, 1, 1, 0]);

  const s3x = useTransform(scrollYProgress, [0.5, 0.95], ["110vw", "-60vw"]);
  const s3y = useTransform(scrollYProgress, [0.5, 0.95], ["-15vh", "110vh"]);
  const s3o = useTransform(scrollYProgress, [0.5, 0.55, 0.9, 0.95], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full min-h-[100vh] bg-[#111] flex flex-col items-center py-24"
    >
      {/* Twinkle keyframes — same as Introduction */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8) translateY(0px); }
          50% { opacity: 1; transform: scale(1.1) translateY(-10px); }
        }
        .animate-twinkle { animation: twinkle infinite ease-in-out; }
      `}</style>

      {/* Pixel Grid */}
      <PixelGrid />
      <ScrollMoon scrollYProgress={scrollYProgress} />

      {/* Shooting Stars (scroll-linked, same component as Introduction) */}
      <ShootingStar x={s1x} y={s1y} opacity={s1o} rotate={120} />
      <ShootingStar x={s2x} y={s2y} opacity={s2o} rotate={130} />
      <ShootingStar x={s3x} y={s3y} opacity={s3o} rotate={160} />

      {/* Auto Satellites */}
      <AutoSatellite
        startX="-10vw" endX="120vw"
        startY="25vh" endY="35vh"
        duration={18} delay={2}
        size={72} rotate={-20}
      />
      <AutoSatellite
        startX="120vw" endX="-15vw"
        startY="60vh" endY="45vh"
        duration={22} delay={8}
        size={56} rotate={155}
      />

      {/* Scroll-controlled Satellites */}
      <ScrollSatellite
        scrollYProgress={scrollYProgress}
        inputRange={[0.1, 0.6]}
        xOutput={["-10vw", "110vw"]}
        yOutput={["20vh", "55vh"]}
        size={88} rotate={-30}
      />
      <ScrollSatellite
        scrollYProgress={scrollYProgress}
        inputRange={[0.4, 0.9]}
        xOutput={["110vw", "-10vw"]}
        yOutput={["15vh", "70vh"]}
        size={64} rotate={150}
      />

      {/* PixelStar decorations — same positions/logic as Introduction */}
      <PixelStar className="top-[15%] left-[10%] opacity-80" delay="0s" duration="3s" />
      <PixelStar className="top-[5%]  right-[20%] opacity-60 scale-75" delay="1s" duration="5s" />
      <PixelStar className="top-[40%] right-[10%] opacity-90 scale-125" delay="2s" duration="4s" />
      <PixelStar className="bottom-[20%] right-[25%] opacity-50" delay="0.5s" duration="6s" />
      <PixelStar className="bottom-[10%] left-[5%] opacity-70 scale-50" delay="1.5s" duration="3.5s" />
      <PixelStar className="top-[50%] left-[2%] opacity-40 scale-75" delay="2.5s" duration="4.5s" />

      <SmallStar className="top-[25%] left-[25%]" delay="0s" />
      <SmallStar className="top-[10%] left-[50%]" delay="1.2s" />
      <SmallStar className="bottom-[30%] right-[5%]" delay="0.8s" />
      <SmallStar className="bottom-[40%] left-[15%]" delay="2.1s" />
      <SmallStar className="top-[60%] right-[30%]" delay="1.5s" />

      {/* Title */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="mb-14 text-center relative z-10"
      >
        {/* Stair steps above title */}
        <div className="flex justify-center mb-4 opacity-40">
          <svg width="128" height="28" viewBox="0 0 128 28" style={{ imageRendering: "pixelated" }}>
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={i * 32}
                y={28 - (i + 1) * 7}
                width="32"
                height={(i + 1) * 7}
                fill="#f5c400"
                opacity={0.12 + i * 0.14}
              />
            ))}
          </svg>
        </div>

        <h2
          className="text-white text-3xl md:text-5xl font-bold leading-none tracking-widest uppercase pixelated"
          style={{ textShadow: "0 0 32px rgba(100,160,255,0.4), 4px 4px 0px rgba(0,0,0,1)" }}
        >
          Work Experience
        </h2>
        <div
          className="text-xs tracking-widest uppercase mt-2 mb-4"
          style={{ color: "#555e8a", fontFamily: "'Courier New', monospace" }}
        >
          ── MISSION LOG ──
        </div>

        {/* Glow bar */}
        <div className="flex justify-center gap-0.5 items-center">
          {[6, 10, 18, 28, 44, 28, 18, 10, 6].map((w, i) => (
            <div
              key={i}
              className="h-1"
              style={{
                width: w,
                backgroundColor:
                  i === 4 ? "#f5c400" : i === 3 || i === 5 ? "#ffaa00" : "rgba(255,255,255,0.15)",
                boxShadow: i === 4 ? "0 0 10px #f5c400, 0 0 20px #f5c40066" : "none",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Cards */}
      <div className="max-w-xl w-full px-6 flex flex-col relative z-10">
        {experiences.map((exp, index) => (
          <div key={index}>
            <ExperienceCard exp={exp} index={index} />
            {index < experiences.length - 1 && (
              <StairConnector color={exp.color} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}