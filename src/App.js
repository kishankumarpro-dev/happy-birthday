import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";

/* ================= EDIT THESE ================= */
const NAME = "Deepa Ji";
const FROM = "Kishan";
const AGE = "25";
const BIRTHDAY = "November 9";

const LETTER = [
  "Today is your day, and it is one of my favourite days of the year, because it gave the world you.",
  "You have a way of making people feel seen. You listen, you care, and you never make anyone feel small. That is rare, and I hope you know it.",
  "I hope this year is gentle with you, generous to you, and full of the things that make your eyes light up. You deserve every single one.",
];

const PRIZES = [
  {
    icon: "😊",
    color: "#ffb3d1",
    title: "Your smile",
    text: "It can change the mood of a whole room, and mine, every single time.",
  },
  {
    icon: "💛",
    color: "#ffe08a",
    title: "Your kindness",
    text: "You help without keeping score and care without being asked.",
  },
  {
    icon: "😂",
    color: "#b9f0d8",
    title: "Your laugh",
    text: "The best sound on the hardest days.",
  },
  {
    icon: "🌟",
    color: "#d2bbff",
    title: "Your strength",
    text: "You make difficult things look graceful, even when they are not easy.",
  },
  {
    icon: "🏡",
    color: "#ffc4a8",
    title: "Your warmth",
    text: "Being around you feels like coming home.",
  },
];

const STORY = [
  {
    icon: "👋",
    title: "Hello",
    text: "Some people walk into your life and quietly rearrange it for the better. You did that for mine.",
  },
  {
    icon: "😂",
    title: "The laughs",
    text: "Ordinary days turned into inside jokes, and now they are the moments I replay when I need a smile.",
  },
  {
    icon: "🌧️",
    title: "The harder days",
    text: "You stayed. You listened. You made heavy days lighter, and I never forgot it.",
  },
  {
    icon: "🌅",
    title: "Today and onward",
    text: "Here is to more chapters, more mornings worth waking up for, and everything still waiting for you.",
  },
];

const WISHES = [
  "May this year say yes to everything you hope for.",
  "May your days be full of laughter and your heart full of peace.",
  "May the people you love stay close, always.",
  "May you never doubt how much you are loved.",
  "May every small joy become a big memory.",
  "May you receive what you did not even dare to ask for.",
];

// Add a photo link in `src` to show a real picture instead of the emoji.
const PHOTOS = [
  { src: "", emoji: "🥳", cap: "Pure joy" },
  { src: "", emoji: "😎", cap: "Main character" },
  { src: "", emoji: "🤪", cap: "Silly us" },
  { src: "", emoji: "🥹", cap: "Soft moments" },
];

const PLACES = [
  {
    x: 60,
    y: 290,
    icon: "☕",
    title: "Our favourite corner",
    text: "Where a quick hello turned into hours.",
  },
  {
    x: 200,
    y: 230,
    icon: "🌳",
    title: "The long walk",
    text: "No destination, just good company.",
  },
  {
    x: 274,
    y: 174,
    icon: "🍰",
    title: "The celebration spot",
    text: "Where the best days got even better.",
  },
  {
    x: 340,
    y: 80,
    icon: "🏡",
    title: "Somewhere like home",
    text: "Anywhere with you feels like it.",
  },
];

const [bMonth, bDay] = BIRTHDAY.split(" ");
const DAYS = [
  {
    d: "01",
    m: "Jan",
    t: "A fresh start",
    note: "I hoped the new year would be full of your laughter.",
  },
  {
    d: "14",
    m: "Feb",
    t: "A day for love",
    note: "You are the kind of person people feel lucky to know.",
  },
  {
    d: "15",
    m: "Aug",
    t: "An ordinary day",
    note: "Those are the ones I treasure the most.",
  },
  {
    d: (bDay || "11").padStart(2, "0"),
    m: (bMonth || "Sep").slice(0, 3),
    t: "Your day",
    note: "The day the world got you.",
  },
];
/* ============================================== */

const SCENES = [
  { id: "letter", label: "The letter", icon: "✉️", tint: "#ff5fa2" },
  { id: "prizes", label: "What I love", icon: "🧸", tint: "#b48cff" },
  { id: "story", label: "Our story", icon: "📖", tint: "#4fd1a5" },
  { id: "wishes", label: "Wishes", icon: "✨", tint: "#f5d58a" },
  { id: "moments", label: "Moments", icon: "📸", tint: "#ff8a7a" },
  { id: "places", label: "Our places", icon: "🗺️", tint: "#5ec8ff" },
  { id: "days", label: "Our days", icon: "📅", tint: "#ff7eb6" },
  { id: "song", label: "Birthday song", icon: "🎵", tint: "#9b8cff" },
  { id: "candles", label: "The candles", icon: "🎂", tint: "#ffb347" },
  { id: "wish", label: "The wish", icon: "💖", tint: "#ff5fa2" },
];

const rand = (a, b) => Math.random() * (b - a) + a;
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

/* ---------- Shared building blocks ---------- */

function Scene({ copy, className = "", children }) {
  return (
    <section className={`scene ${className}`}>
      <div className="scene-inner">
        <header className="copy">{copy}</header>
        <div className="art">{children}</div>
      </div>
    </section>
  );
}

const CONFETTI_COLORS = [
  "#f5d58a",
  "#e8b4a0",
  "#ff5fa2",
  "#fff1e8",
  "#c9a7ff",
  "#8fe3c0",
];

function Confetti() {
  const bits = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        tx: rand(-48, 48),
        ty: rand(-62, -18),
        fall: rand(45, 80),
        rot: rand(360, 1080),
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        w: rand(6, 11),
        h: rand(10, 18),
        delay: rand(0, 0.25),
        time: rand(2.6, 4),
        round: i % 4 === 0,
      })),
    []
  );
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <span
          key={i}
          style={{
            width: b.w,
            height: b.round ? b.w : b.h,
            borderRadius: b.round ? "50%" : 2,
            background: b.color,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.time}s`,
            "--tx": `${b.tx}vw`,
            "--ty": `${b.ty}vh`,
            "--fall": `${b.fall}vh`,
            "--rot": `${b.rot}deg`,
          }}
        />
      ))}
    </div>
  );
}

const CANDLE_X = [100, 130, 160, 190, 220];
const CANDLE_COLORS = ["#8fe3c0", "#ffd98a", "#ff9ec4", "#c9a7ff", "#ff8f7a"];
const PEARL_COLORS = ["#ffd98a", "#8fe3c0", "#fff1e8", "#ff9ec4", "#c9a7ff"];

function Cake({ lit = [true, true, true, true, true], smoke = false }) {
  const pearls = useMemo(
    () =>
      Array.from({ length: 13 }, (_, i) => {
        const a = (i / 12) * Math.PI;
        return { x: 160 + Math.cos(a) * 112, y: 226 + Math.sin(a) * 15 };
      }),
    []
  );
  const sprinkles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        x: 56 + ((i * 37) % 208),
        y: 252 + ((i * 23) % 52),
        r: (i * 47) % 180,
        c: PEARL_COLORS[i % PEARL_COLORS.length],
      })),
    []
  );
  const drips = [92, 112, 132, 152, 172, 192, 212];

  return (
    <svg
      className="cake"
      viewBox="0 0 320 360"
      role="img"
      aria-label="Birthday cake with candles"
    >
      <defs>
        <linearGradient id="ckPlate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6ee" />
          <stop offset="1" stopColor="#d9cfe6" />
        </linearGradient>
        <linearGradient id="ckBottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9a7ff" />
          <stop offset="1" stopColor="#8f68d8" />
        </linearGradient>
        <linearGradient id="ckTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb3d1" />
          <stop offset="1" stopColor="#ff7eb6" />
        </linearGradient>
        <radialGradient id="ckFlame" cx="50%" cy="70%" r="60%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.45" stopColor="#ffe28a" />
          <stop offset="1" stopColor="#ff9a3c" />
        </radialGradient>
      </defs>

      <ellipse cx="160" cy="348" rx="70" ry="9" fill="url(#ckPlate)" />
      <rect x="148" y="322" width="24" height="26" fill="url(#ckPlate)" />
      <ellipse cx="160" cy="322" rx="132" ry="18" fill="#bfb2d6" />
      <ellipse cx="160" cy="316" rx="132" ry="18" fill="url(#ckPlate)" />

      <path
        d="M40 226 v82 a120 16 0 0 0 240 0 v-82 a120 16 0 0 1 -240 0z"
        fill="url(#ckBottom)"
      />
      <ellipse cx="160" cy="226" rx="120" ry="16" fill="#d9c2ff" />
      {sprinkles.map((s, i) => (
        <rect
          key={i}
          x={s.x}
          y={s.y}
          width="9"
          height="3"
          rx="1.5"
          fill={s.c}
          transform={`rotate(${s.r} ${s.x} ${s.y})`}
        />
      ))}
      {pearls.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="7"
          fill={PEARL_COLORS[i % PEARL_COLORS.length]}
        />
      ))}

      <path
        d="M80 152 v70 a80 12 0 0 0 160 0 v-70 a80 12 0 0 1 -160 0z"
        fill="url(#ckTop)"
      />
      <ellipse cx="160" cy="152" rx="80" ry="12" fill="#fff1e8" />
      <rect x="80" y="150" width="160" height="14" fill="#fff1e8" />
      {drips.map((x, i) => (
        <rect
          key={x}
          x={x - 8}
          y="150"
          width="16"
          height={22 + (i % 3) * 12}
          rx="8"
          fill="#fff1e8"
        />
      ))}
      <path
        transform="translate(160 186) scale(1.1)"
        d="M0 -6 C -6 -15, -19 -6, 0 11 C 19 -6, 6 -15, 0 -6 Z"
        fill="#ff4f6d"
      />

      {CANDLE_X.map((x, i) => (
        <g key={x}>
          <rect
            x={x - 4.5}
            y="104"
            width="9"
            height="46"
            rx="2"
            fill={CANDLE_COLORS[i]}
          />
          <path
            d={`M${x - 4.5} 118 l9 -4 M${x - 4.5} 130 l9 -4 M${
              x - 4.5
            } 142 l9 -4`}
            stroke="#fff"
            strokeOpacity=".6"
            strokeWidth="2"
          />
          <line
            x1={x}
            y1="104"
            x2={x}
            y2="99"
            stroke="#3a2347"
            strokeWidth="1.5"
          />
          {lit[i] && (
            <g>
              <circle
                className="glow"
                cx={x}
                cy="92"
                r="22"
                fill="#ffd07a"
                opacity=".28"
              />
              <ellipse
                className="flame"
                cx={x}
                cy="91"
                rx="5"
                ry="9.5"
                fill="url(#ckFlame)"
              />
            </g>
          )}
          {!lit[i] && smoke && (
            <path
              className="smoke"
              d={`M${x} 98 q-7 -10 0 -18 t0 -18`}
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </g>
      ))}
    </svg>
  );
}

/* ---------- Scene 0: Intro ---------- */

function Intro({ onOpen }) {
  return (
    <Scene
      className="intro"
      copy={
        <>
          <span className="chip">🎂 {BIRTHDAY}</span>
          <h1 className="hello">
            Happy birthday,
            <br />
            <span className="name">{NAME}!</span>
          </h1>
          <p className="hand">for being so kind</p>
          <p className="sub">{FROM} threw a little party just for you.</p>
          <button className="cta" onClick={onOpen}>
            <span aria-hidden="true">🎁</span> Open my gift
          </button>
        </>
      }
    >
      <div className="cake-stage">
        <span className="bnum left" aria-hidden="true">
          {AGE[0]}
        </span>
        <Cake />
        <span className="bnum right" aria-hidden="true">
          {AGE[1]}
        </span>
      </div>
    </Scene>
  );
}

/* ---------- Scene 1: Letter ---------- */

function Letter() {
  const [open, setOpen] = useState(false);
  return (
    <Scene
      copy={
        <>
          <h2 className="title">A letter for you</h2>
          <p className="hand">
            {open ? "Take your time reading." : "Tap the envelope to open it."}
          </p>
        </>
      }
    >
      <div className={`mail ${open ? "is-open" : ""}`}>
        <article className="paper" aria-hidden={!open}>
          <p className="dear">Dear {NAME},</p>
          {LETTER.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
          <p className="with">
            With love,
            <br />
            {FROM}
          </p>
        </article>
        <button
          className="envelope"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close the envelope" : "Open the envelope"}
        >
          <span className="env-flap" />
          <span className="env-pocket" />
          <span className="seal">♥</span>
          <span className="env-hint">
            {open ? "Tap to close" : "Tap to open"}
          </span>
        </button>
      </div>
    </Scene>
  );
}

/* ---------- Scene 2: Claw machine ---------- */

const SLOTS = PRIZES.length;

function Claw() {
  const [slot, setSlot] = useState(2);
  const [phase, setPhase] = useState("idle");
  const [got, setGot] = useState([]);
  const [carry, setCarry] = useState(null);
  const [prize, setPrize] = useState(null);
  const [msg, setMsg] = useState("Move the claw, then press Grab.");
  const timers = useRef([]);
  const busy = phase !== "idle";

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const move = (d) => {
    if (!busy) setSlot((s) => clamp(s + d, 0, SLOTS - 1));
  };

  const grab = () => {
    if (busy) return;
    setPhase("down");
    later(() => {
      const can = !got.includes(slot);
      if (can) setCarry(slot);
      setPhase("up");
      later(() => {
        if (can) {
          const next = [...got, slot];
          setGot(next);
          setPrize(PRIZES[slot]);
          setMsg(
            next.length === SLOTS
              ? "You found every one of them 💖"
              : "Got one! Try another."
          );
        } else {
          setMsg("Nothing here. Try another spot.");
        }
        setCarry(null);
        setPhase("idle");
      }, 950);
    }, 950);
  };

  return (
    <Scene
      copy={
        <>
          <h2 className="title">What I love about you</h2>
          <p className="hand" aria-live="polite">
            {msg}
          </p>
          {prize && (
            <div className="prize" key={prize.title}>
              <span className="prize-ico">{prize.icon}</span>
              <div>
                <h3>{prize.title}</h3>
                <p>{prize.text}</p>
              </div>
            </div>
          )}
          <p className="tally">
            {got.length} of {SLOTS} prizes collected
          </p>
        </>
      }
    >
      <div className="machine">
        <div className="marquee">
          <span>♥ Love prizes ♥</span>
        </div>
        <div className="window">
          <div className="rail" />
          <div className="claw-x" style={{ left: `${10 + slot * 20}%` }}>
            <div className={`claw-y ${phase}`}>
              <span className="cable" />
              <span className="claw-head">♥</span>
              <span className="arm l" />
              <span className="arm r" />
              {carry !== null && (
                <span
                  className="cap carried"
                  style={{ "--c": PRIZES[carry].color }}
                >
                  {PRIZES[carry].icon}
                </span>
              )}
            </div>
          </div>
          {PRIZES.map((p, i) => (
            <span
              key={i}
              className={`cap ${got.includes(i) || carry === i ? "gone" : ""}`}
              style={{ left: `${10 + i * 20}%`, "--c": p.color }}
            >
              {p.icon}
            </span>
          ))}
        </div>
        <div className="panel">
          <button
            className="joy"
            onClick={() => move(-1)}
            disabled={busy || slot === 0}
            aria-label="Move claw left"
          >
            ◀
          </button>
          <button
            className="joy"
            onClick={() => move(1)}
            disabled={busy || slot === SLOTS - 1}
            aria-label="Move claw right"
          >
            ▶
          </button>
          <button className="grab" onClick={grab} disabled={busy}>
            GRAB
          </button>
        </div>
      </div>
    </Scene>
  );
}

/* ---------- Scene 3: Story ---------- */

function Story() {
  const [i, setI] = useState(0);
  const c = STORY[i];
  return (
    <Scene
      copy={
        <>
          <h2 className="title">Our story</h2>
          <p className="hand">
            Chapter {i + 1} of {STORY.length}
          </p>
        </>
      }
    >
      <div className="book">
        <span className="spiral" aria-hidden="true" />
        <div className="page" key={i}>
          <span className="sticker" aria-hidden="true">
            {c.icon}
          </span>
          <h3>{c.title}</h3>
          <p>{c.text}</p>
        </div>
        <div className="book-nav">
          <button
            onClick={() => setI((n) => Math.max(0, n - 1))}
            disabled={i === 0}
            aria-label="Previous chapter"
          >
            ‹
          </button>
          <span className="pips" aria-hidden="true">
            {STORY.map((_, k) => (
              <i key={k} className={k === i ? "on" : ""} />
            ))}
          </span>
          <button
            onClick={() => setI((n) => Math.min(STORY.length - 1, n + 1))}
            disabled={i === STORY.length - 1}
            aria-label="Next chapter"
          >
            ›
          </button>
        </div>
      </div>
    </Scene>
  );
}

/* ---------- Scene 4: Wishes jar ---------- */

function Wishes() {
  const [n, setN] = useState(0);
  const jarStars = useMemo(
    () =>
      Array.from({ length: 22 }, () => ({
        left: rand(10, 78),
        top: rand(34, 82),
        size: rand(16, 28),
        delay: rand(0, 3),
      })),
    []
  );
  const wish = n > 0 ? WISHES[(n - 1) % WISHES.length] : null;
  return (
    <Scene
      copy={
        <>
          <h2 className="title">Wishes for your new year</h2>
          <p className="hand">
            {wish
              ? `Wish ${((n - 1) % WISHES.length) + 1} of ${WISHES.length}`
              : "Tap the jar to let a wish out."}
          </p>
          {wish && (
            <div className="wish-card" key={n}>
              {wish}
            </div>
          )}
        </>
      }
    >
      <button
        className="jar"
        onClick={() => setN((c) => c + 1)}
        aria-label="Release a wish from the jar"
      >
        <span className="cork" />
        <span className="neck" />
        <span className="jar-ribbon" />
        <span className="jar-glass">
          {jarStars.map((s, i) => (
            <span
              key={i}
              className="jstar"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                fontSize: s.size,
                animationDelay: `${s.delay}s`,
              }}
            >
              ★
            </span>
          ))}
        </span>
        {n > 0 && (
          <span key={n} className="flyer" aria-hidden="true">
            ★
          </span>
        )}
      </button>
    </Scene>
  );
}

/* ---------- Scene 5: Photo booth ---------- */

function Moments() {
  const [shots, setShots] = useState(0);
  const [flash, setFlash] = useState(0);
  const full = shots >= PHOTOS.length;
  const press = () => {
    if (full) {
      setShots(0);
      return;
    }
    setFlash((f) => f + 1);
    setShots((s) => s + 1);
  };
  return (
    <Scene
      copy={
        <>
          <h2 className="title">Our moments</h2>
          <p className="hand">
            {shots === 0
              ? "Press the button and say cheese!"
              : full
              ? "A full strip. Perfect."
              : "Smile again!"}
          </p>
          <div className="strip">
            {PHOTOS.slice(0, shots).map((p, i) => (
              <figure className="frame" key={i}>
                <div className="shot">
                  {p.src ? (
                    <img src={p.src} alt={p.cap} />
                  ) : (
                    <span>{p.emoji}</span>
                  )}
                </div>
                <figcaption>{p.cap}</figcaption>
              </figure>
            ))}
          </div>
        </>
      }
    >
      <div className="booth">
        <div className="booth-sign">Photo booth</div>
        <div className="booth-window">
          <span className="booth-cam" aria-hidden="true">
            📸
          </span>
          {flash > 0 && (
            <span className="flash" key={flash} aria-hidden="true" />
          )}
        </div>
        <button className="shutter" onClick={press}>
          {full ? "Start over" : "Take photo"}
        </button>
      </div>
    </Scene>
  );
}

/* ---------- Scene 6: Places map ---------- */

function Places() {
  const [sel, setSel] = useState(0);
  const p = PLACES[sel];
  return (
    <Scene
      copy={
        <>
          <h2 className="title">Our places</h2>
          <p className="hand">Tap a pin to remember.</p>
          <div className="prize" key={sel}>
            <span className="prize-ico">{p.icon}</span>
            <div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          </div>
        </>
      }
    >
      <svg
        className="map"
        viewBox="0 0 400 360"
        role="group"
        aria-label="Map of our places"
      >
        <rect width="400" height="360" rx="26" fill="#241046" />
        <path
          d="M0 120 C70 80 120 140 190 110 S320 40 400 90 V0 H0Z"
          fill="#2f1a5c"
        />
        <path
          d="M0 360 V250 C60 230 110 330 200 320 S340 280 400 300 V360Z"
          fill="#2f1a5c"
        />
        <circle cx="90" cy="90" r="26" fill="#3a2275" />
        <circle cx="320" cy="260" r="34" fill="#3a2275" />
        <circle cx="150" cy="170" r="14" fill="#3a2275" />
        <path
          className="route"
          d="M60 290 C110 220 150 280 200 230 S300 180 340 80"
          fill="none"
          stroke="#f5d58a"
          strokeWidth="3"
          strokeDasharray="2 9"
          strokeLinecap="round"
        />
        {PLACES.map((pl, i) => (
          <g
            key={i}
            className={`pin ${i === sel ? "on" : ""}`}
            transform={`translate(${pl.x} ${pl.y})`}
            onClick={() => setSel(i)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(i)}
            tabIndex={0}
            role="button"
            aria-label={pl.title}
          >
            <circle className="pin-pulse" r="22" />
            <circle className="pin-dot" r="19" />
            <text y="7" textAnchor="middle" fontSize="20">
              {pl.icon}
            </text>
          </g>
        ))}
      </svg>
    </Scene>
  );
}

/* ---------- Scene 7: Calendar ---------- */

function Days() {
  const [i, setI] = useState(0);
  const [tear, setTear] = useState(false);
  const d = DAYS[i];
  const next = () => {
    if (tear) return;
    setTear(true);
    setTimeout(() => {
      setI((n) => (n + 1) % DAYS.length);
      setTear(false);
    }, 520);
  };
  return (
    <Scene
      copy={
        <>
          <h2 className="title">Days I keep close</h2>
          <p className="hand">Tear off a page to see the next one.</p>
        </>
      }
    >
      <div className="cal">
        <div className="cal-bind" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="cal-stack">
          <div className="leaf under" aria-hidden="true">
            <b>{DAYS[(i + 1) % DAYS.length].d}</b>
          </div>
          <div className={`leaf ${tear ? "tearing" : ""}`}>
            <span className="cal-month">{d.m}</span>
            <b>{d.d}</b>
            <h3>{d.t}</h3>
            <p>{d.note}</p>
          </div>
        </div>
        <button className="cta small" onClick={next}>
          Tear off ({i + 1}/{DAYS.length})
        </button>
      </div>
    </Scene>
  );
}

/* ---------- Scene 8: Song (Web Audio, no files) ---------- */

const TUNE = [
  [261.63, 0.75],
  [261.63, 0.25],
  [293.66, 1],
  [261.63, 1],
  [349.23, 1],
  [329.63, 2],
  [261.63, 0.75],
  [261.63, 0.25],
  [293.66, 1],
  [261.63, 1],
  [392.0, 1],
  [349.23, 2],
  [261.63, 0.75],
  [261.63, 0.25],
  [523.25, 1],
  [440.0, 1],
  [349.23, 1],
  [329.63, 1],
  [293.66, 2],
  [466.16, 0.75],
  [466.16, 0.25],
  [440.0, 1],
  [349.23, 1],
  [392.0, 1],
  [349.23, 2],
];

function Song() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef(null);
  const timerRef = useRef(null);

  const halt = useCallback((setState = true) => {
    clearTimeout(timerRef.current);
    if (ctxRef.current) {
      ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    }
    if (setState) setPlaying(false);
  }, []);

  useEffect(() => () => halt(false), [halt]);

  const play = () => {
    const AC = window.AudioContext || window.webkitAudioContext;
    let total = TUNE.reduce((s, n) => s + n[1], 0) * 0.52;
    if (AC) {
      const ctx = new AC();
      ctxRef.current = ctx;
      const master = ctx.createGain();
      master.gain.value = 0.2;
      master.connect(ctx.destination);
      let t = ctx.currentTime + 0.05;
      TUNE.forEach(([f, beats]) => {
        const d = beats * 0.52;
        [
          ["triangle", f, 1],
          ["sine", f / 2, 0.5],
        ].forEach(([type, freq, vol]) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = type;
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.0001, t);
          g.gain.linearRampToValueAtTime(vol, t + 0.03);
          g.gain.exponentialRampToValueAtTime(0.001, t + d * 0.95);
          o.connect(g);
          g.connect(master);
          o.start(t);
          o.stop(t + d);
        });
        t += d;
      });
    }
    setPlaying(true);
    timerRef.current = setTimeout(() => halt(), total * 1000 + 400);
  };

  return (
    <Scene
      copy={
        <>
          <h2 className="title">Birthday song</h2>
          <p className="hand">
            {playing
              ? "Listen closely. It is for you."
              : "A little melody, made just for today."}
          </p>
          <button className="cta" onClick={() => (playing ? halt() : play())}>
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>
        </>
      }
    >
      <div className={`deck ${playing ? "is-playing" : ""}`}>
        <div className="platter">
          <div className="record">
            <span className="label">♥</span>
          </div>
        </div>
        <span className="pivot" />
        <span className="tonearm" />
        <div className="eq" aria-hidden="true">
          {Array.from({ length: 14 }, (_, k) => (
            <i key={k} style={{ animationDelay: `${(k % 7) * 0.09}s` }} />
          ))}
        </div>
      </div>
    </Scene>
  );
}

/* ---------- Scene 9: Candles (mic or hold) ---------- */

function Candles({ onCelebrate }) {
  const [lit, setLit] = useState([true, true, true, true, true]);
  const [mic, setMic] = useState("off");
  const [holding, setHolding] = useState(false);
  const micRef = useRef(null);
  const holdRef = useRef(null);
  const celebrated = useRef(false);
  const allOut = lit.every((l) => !l);

  const snuff = useCallback(() => {
    setLit((l) => {
      const i = l.indexOf(true);
      if (i < 0) return l;
      const n = [...l];
      n[i] = false;
      return n;
    });
  }, []);

  const releaseMic = useCallback(() => {
    const m = micRef.current;
    if (!m) return;
    cancelAnimationFrame(m.raf);
    m.stream.getTracks().forEach((t) => t.stop());
    m.ctx.close().catch(() => {});
    micRef.current = null;
  }, []);

  const endHold = useCallback(() => {
    clearInterval(holdRef.current);
    holdRef.current = null;
    setHolding(false);
  }, []);

  useEffect(
    () => () => {
      releaseMic();
      clearInterval(holdRef.current);
    },
    [releaseMic]
  );

  useEffect(() => {
    if (allOut && !celebrated.current) {
      celebrated.current = true;
      releaseMic();
      setMic("off");
      endHold();
      onCelebrate();
    }
  }, [allOut, releaseMic, endHold, onCelebrate]);

  const toggleMic = async () => {
    if (micRef.current) {
      releaseMic();
      setMic("off");
      return;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setMic("unsupported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AC = window.AudioContext || window.webkitAudioContext;
      const ctx = new AC();
      const src = ctx.createMediaStreamSource(stream);
      const an = ctx.createAnalyser();
      an.fftSize = 512;
      src.connect(an);
      const data = new Uint8Array(an.fftSize);
      const m = { stream, ctx, raf: 0, loud: 0 };
      micRef.current = m;
      setMic("listening");
      const tick = () => {
        an.getByteTimeDomainData(data);
        let s = 0;
        for (let i = 0; i < data.length; i++) {
          const v = (data[i] - 128) / 128;
          s += v * v;
        }
        if (Math.sqrt(s / data.length) > 0.14) {
          m.loud += 1;
          if (m.loud % 10 === 0) snuff();
        } else {
          m.loud = Math.max(0, m.loud - 1);
        }
        m.raf = requestAnimationFrame(tick);
      };
      tick();
    } catch (e) {
      setMic("denied");
    }
  };

  const startHold = () => {
    if (holdRef.current || allOut) return;
    setHolding(true);
    snuff();
    holdRef.current = setInterval(snuff, 260);
  };

  const relight = () => {
    celebrated.current = false;
    setLit([true, true, true, true, true]);
  };

  const status =
    mic === "denied"
      ? "Microphone is blocked. Use Hold instead."
      : mic === "unsupported"
      ? "Microphone is not available here. Use Hold instead."
      : mic === "listening"
      ? "Listening... blow towards your device."
      : "The microphone only listens for your breath, right here on your device. Nothing is recorded.";

  return (
    <Scene
      copy={
        <>
          <h2 className="title">Blow out the candles</h2>
          <p className="hand" aria-live="polite">
            {allOut
              ? "Wish made. May it come true."
              : "Close your eyes, make a wish, then blow."}
          </p>
          {allOut ? (
            <button className="cta" onClick={relight}>
              🕯️ Light them again
            </button>
          ) : (
            <>
              <div className="modes">
                <button
                  className={`mode ${mic === "listening" ? "on" : ""}`}
                  onClick={toggleMic}
                >
                  🎙️ Microphone
                </button>
                <button
                  className={`mode ${holding ? "on" : ""}`}
                  onPointerDown={startHold}
                  onPointerUp={endHold}
                  onPointerLeave={endHold}
                  onPointerCancel={endHold}
                  onKeyDown={(e) =>
                    (e.key === " " || e.key === "Enter") && startHold()
                  }
                  onKeyUp={endHold}
                >
                  💨 Hold to blow
                </button>
              </div>
              <p className="fine">{status}</p>
            </>
          )}
        </>
      }
    >
      <div className={`cake-stage solo ${allOut ? "dim" : ""}`}>
        <Cake lit={lit} smoke={true} />
      </div>
    </Scene>
  );
}

/* ---------- Scene 10: Finale ---------- */

function Finale({ go, restart, onCelebrate }) {
  useEffect(() => {
    onCelebrate();
  }, [onCelebrate]);
  return (
    <Scene
      className="finale"
      copy={
        <>
          <h2 className="hello">
            Happy birthday,
            <br />
            <span className="name">{NAME}!</span>
          </h2>
          <p className="hand big">With all my love, {FROM}</p>
          <div className="chips" role="group" aria-label="Revisit a scene">
            {SCENES.slice(0, 9).map((s, i) => (
              <button
                key={s.id}
                className="chip-btn"
                onClick={() => go(i + 1)}
                aria-label={s.label}
                title={s.label}
              >
                {s.icon}
              </button>
            ))}
          </div>
          <button className="cta ghost" onClick={restart}>
            ↺ Watch again
          </button>
        </>
      }
    >
      <div className="big-age" aria-label={`${AGE} years`}>
        <span>{AGE[0]}</span>
        <span>{AGE[1]}</span>
      </div>
    </Scene>
  );
}

/* ---------- Navigation ---------- */

function Nav({ step, go }) {
  return (
    <nav className="nav" aria-label="Scenes">
      <button
        className="nav-btn"
        onClick={() => go(step - 1)}
        aria-label="Previous scene"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <div className="nav-mid">
        <strong>{SCENES[step - 1].label}</strong>
        <div className="dots">
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              className={`dot ${i + 1 === step ? "on" : ""} ${
                i + 1 < step ? "seen" : ""
              }`}
              onClick={() => go(i + 1)}
              aria-label={s.label}
              aria-current={i + 1 === step}
            />
          ))}
        </div>
      </div>
      <span className="count">
        {step}/{SCENES.length}
      </span>
      <button
        className="nav-btn next"
        onClick={() => go(step + 1)}
        disabled={step === SCENES.length}
        aria-label="Next scene"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}

/* ---------- App ---------- */

export default function App() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [burst, setBurst] = useState(0);
  const stepRef = useRef(0);
  const touch = useRef(null);

  const go = useCallback((n) => {
    const t = clamp(n, 0, SCENES.length);
    if (t === stepRef.current) return;
    setDir(t > stepRef.current ? 1 : -1);
    stepRef.current = t;
    setStep(t);
  }, []);

  const celebrate = useCallback(() => setBurst((b) => b + 1), []);

  useEffect(() => {
    if (!burst) return;
    const t = setTimeout(() => setBurst(0), 5200);
    return () => clearTimeout(t);
  }, [burst]);

  useEffect(() => {
    const onKey = (e) => {
      if (stepRef.current === 0) return;
      if (e.key === "ArrowRight") go(stepRef.current + 1);
      if (e.key === "ArrowLeft") go(stepRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, () => ({
        left: `${rand(0, 100)}%`,
        top: `${rand(0, 100)}%`,
        size: rand(1.5, 3.2),
        delay: rand(0, 6),
        time: rand(3, 6),
      })),
    []
  );

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    if (!touch.current || stepRef.current === 0) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 2)
      go(stepRef.current + (dx < 0 ? 1 : -1));
  };

  let view;
  switch (step) {
    case 0:
      view = (
        <Intro
          onOpen={() => {
            celebrate();
            go(1);
          }}
        />
      );
      break;
    case 1:
      view = <Letter />;
      break;
    case 2:
      view = <Claw />;
      break;
    case 3:
      view = <Story />;
      break;
    case 4:
      view = <Wishes />;
      break;
    case 5:
      view = <Moments />;
      break;
    case 6:
      view = <Places />;
      break;
    case 7:
      view = <Days />;
      break;
    case 8:
      view = <Song />;
      break;
    case 9:
      view = <Candles onCelebrate={celebrate} />;
      break;
    default:
      view = <Finale go={go} restart={() => go(0)} onCelebrate={celebrate} />;
  }

  const tint = step > 0 ? SCENES[step - 1].tint : "#ff5fa2";

  return (
    <div className="app" style={{ "--tint": tint }}>
      <div className="ambient" aria-hidden="true">
        <i className="orb o1" />
        <i className="orb o2" />
        {stars.map((s, i) => (
          <b
            key={i}
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.time}s`,
            }}
          />
        ))}
      </div>

      <main
        className="stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div key={step} className={`scene-wrap ${dir > 0 ? "fwd" : "back"}`}>
          {view}
        </div>
      </main>

      {step > 0 && <Nav step={step} go={go} />}
      {burst > 0 && <Confetti key={burst} />}
    </div>
  );
}
