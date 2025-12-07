import React, { useState, useRef, useEffect } from "react";

const App = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;

    // Only this user can log in
    if (username === "SWETHA" && password === "BHAI") {
      setLoggedIn(true);
    } else {
      setError("Invalid username or password");
    }
  };

  if (loggedIn) {
    return <SongPage username="SWETHA" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      <div className="w-full max-w-sm bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-2 tracking-wide">
          Find ID Pass Bhai
        </h1>
        <p className="text-center text-slate-300 mb-6 text-sm">
          I Already Giva a <span className="font-semibold">"Hint"</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 text-center mt-1">{error}</p>
          )}

          <button
            type="submit"
            className="mt-3 w-full py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-semibold tracking-wide shadow-lg shadow-pink-500/30 hover:brightness-110 active:scale-95 transition-transform"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const SongPage = ({ username }) => {
  const lyrics = [
    // INTRO / VERSE 1
    { time: 0, text: "🎵, 🎶" },
    { time: 4, text: "🎵, 🎶" },
    { time: 8, text: "🎵, 🎶" },
    { time: 12, text: "🎵, 🎶" },

    { time: 16, text: "" },

    { time: 17, text: "See, right now, I need you, I'll meet you somewhere now," },
    { time: 21, text: "You up now, I see you, I get you, take care now," },
    { time: 25, text: "Slow down, be cool, I miss you, come here now,\"" },
    { time: 29, text: "It's yours now, keep it, I'll hold out until now." },

    { time: 33, text: "" },

    // PRE-CHORUS
    { time: 34, text: "I need you right now, once I leave you I'm strung out," },
    { time: 38, text: "If I get you, I'm slowly breaking down," },
    {
      time: 42,
      text: "And, oh, it's hard to see you, but I wish you were right here,",
    },
    {
      time: 46,
      text: "Oh, it's hard to leave you when I get you everywhere’",
    },

    { time: 50, text: "" },

    // CHORUS
    {
      time: 51,
      text: "All this time I'm thinking we could never be a pair",
    },
    { time: 54, text: "Oh, no, I don't need you, but I miss you, come here" },
    {
      time: 57,
      text: "And, oh, it's hard to see you, but I wish you were right here,",
    },
    {
      time: 60,
      text: "Oh, it's hard to leave you when I get you everywhere.",
    },

    {
      time: 64,
      text: "All this time I'm thinking, I'm strong enough to sink it",
    },
    { time: 67, text: "Oh, no, I don't need you, but I miss you, come here," },
    { time: 70, text: "He love me not, he loves me," },
    { time: 73, text: "He holds me tight, then lets me go." },

    { time: 77, text: "" },

    // VERSE 2
    { time: 78, text: "He love me not, he loves me," },
    { time: 82, text: "He holds me tight, then lets me go," },
    {
      time: 86,
      text: "Soon as you leave me, we always lose connection,",
    },
    { time: 90, text: "Don't loosen your grip got a hold on me." },

    { time: 94, text: "" },

    { time: 95, text: "Now, forever, let's get back together, \"" },
    { time: 99, text: "Lord, take it so far away," },
    { time: 103, text: "I pray that, God, we don't break," },
    { time: 107, text: "I want you to take me up and down." },

    { time: 111, text: "" },

    // PRE-CHORUS 2
    { time: 112, text: "And round and round again," },
    {
      time: 116,
      text: "And, oh, it's hard to see you, but I wish you were right here",
    },
    {
      time: 120,
      text: "All this time I'm thinking we could never be a pair",
    },
    {
      time: 124,
      text: "Now I’m stuck in what we were and what we walked away.",
    },

    { time: 128, text: "" },
  ];

  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const lineRefs = useRef([]);

  // Try autoplay after mount (user already clicked Login)
  useEffect(() => {
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(() => {
          // If blocked, user can hit play manually
        });
      }
    }
  }, []);

  const handleTimeUpdate = (e) => {
    const t = e.target.currentTime;
    setCurrentTime(t);

    let idx = 0;
    for (let i = 0; i < lyrics.length; i++) {
      if (lyrics[i].time <= t) {
        idx = i;
      } else {
        break;
      }
    }
    setCurrentLine(idx);

    const el = lineRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration || 0);
  };

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={
        "min-h-screen flex items-center justify-center px-4 py-6 relative overflow-hidden transition-colors duration-700 " +
        (isPlaying
          ? "bg-gradient-to-br from-pink-950 via-slate-900 to-black"
          : "bg-gradient-to-br from-slate-950 via-slate-900 to-black")
      }
    >
      {/* Floating love effects when playing */}
      {isPlaying && (
        <>
          <span className="pointer-events-none select-none text-pink-400/40 text-5xl animate-bounce absolute left-8 bottom-10">
            💖
          </span>
          <span className="pointer-events-none select-none text-pink-300/40 text-4xl animate-ping absolute right-10 top-16">
            💞
          </span>
          <span className="pointer-events-none select-none text-rose-300/30 text-6xl animate-bounce absolute right-1/4 bottom-4">
            💘
          </span>
          <span className="pointer-events-none select-none text-fuchsia-300/30 text-5xl animate-pulse absolute left-1/3 top-10">
            💗
          </span>
        </>
      )}

      <div
        className={
          "w-full max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 " +
          (isPlaying ? "ring-2 ring-pink-400/60 shadow-pink-500/40" : "")
        }
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              JUST TRYING SAMPLE, THATS ONLY REASON THIS SITE WAS LOW EFFECT IF YOU LIKE THIS SONG THEN ADD A EMOJEE ON LINK 💜 
            </p>
            <h1 className="text-xl md:text-2xl font-semibold tracking-wide">
              Love Me Not
            </h1>
            <p className="text-xs text-slate-400">
              by{" "}
              <span className="font-semibold text-pink-400">
                Developer gla
              </span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              For{" "}
              <span className="font-semibold text-pink-300">{username}</span> 💜
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span>Connected</span>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: cover + player */}
          <div className="p-6 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
            <div className="relative mb-6">
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-[2rem] bg-gradient-to-br from-pink-500 via-rose-500 to-purple-700 shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="w-40 h-40 rounded-full border-[7px] border-white/40 bg-black/40 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-pink-300" />
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-black/80 border border-white/20 rounded-2xl px-3 py-1 text-[11px] text-slate-200">
                🌙 Night Session
              </div>
            </div>

            {/* Custom progress bar */}
            <div className="w-full max-w-xs mb-1">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Audio element (autoplay) */}
            <audio
              ref={audioRef}
              controls
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="w-full max-w-xs mt-3 accent-pink-500"
            >
              {/* Put your mp3 in public, e.g. public/love-me-not.mp3 */}
              <source src="/love-me-not.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

            <div className="mt-4 flex flex-col items-center text-xs text-slate-300">
              <p>Best listened with headphones 🎧</p>
              <div className="mt-2 flex gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-400">
                <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                  Chill
                </span>
                <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                  Late Night
                </span>
                <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                  R&amp;B
                </span>
              </div>
            </div>
          </div>

          {/* Right: lyrics */}
          <div className="p-6 md:p-8 flex flex-col bg-gradient-to-b from-white/5 via-transparent to-black/40">
            <h2 className="text-lg font-semibold mb-1">Lyrics</h2>
            <p className="text-xs text-slate-400 mb-4">
              Song:{" "}
              <span className="font-medium text-slate-200">
                Love Me Not – Ravyn Lenae (custom demo lyrics)
              </span>
            </p>

            <div className="flex-1 overflow-y-auto pr-2 space-y-1 text-sm leading-relaxed">
              {lyrics.map((line, index) => {
                const isActive = index === currentLine;
                if (line.text.trim() === "") {
                  return <div key={index} className="h-4" />;
                }
                return (
                  <p
                    key={index}
                    ref={(el) => (lineRefs.current[index] = el)}
                    className={
                      "transition-all duration-300 " +
                      (isActive
                        ? "text-pink-300 text-base font-semibold drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                        : "text-slate-200/70")
                    }
                  >
                    {line.text}
                  </p>
                );
              })}
            </div>

            <div className="mt-5 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Made with 💜 just for you</span>
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
