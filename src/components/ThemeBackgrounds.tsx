"use client";

import { useEffect, useRef } from "react";

// Aviation - Cockpit radar sweep, clouds, and instrument panel vibes
export function AviationBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Radar sweep */}
      <div className="absolute bottom-10 right-10 w-48 h-48 opacity-20">
        <div className="absolute inset-0 border-2 border-sky-400 rounded-full" />
        <div className="absolute inset-4 border border-sky-400/50 rounded-full" />
        <div className="absolute inset-8 border border-sky-400/30 rounded-full" />
        <div
          className="absolute inset-0 origin-center"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(56, 189, 248, 0.3) 30deg, transparent 60deg)',
            animation: 'spin 4s linear infinite',
          }}
        />
      </div>

      {/* Floating clouds */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-10"
          style={{
            left: `${-20 + i * 30}%`,
            top: `${20 + (i % 3) * 20}%`,
            animation: `float-cloud ${20 + i * 5}s linear infinite`,
            animationDelay: `${i * 4}s`,
          }}
        >
          <svg width="200" height="80" viewBox="0 0 200 80" fill="currentColor" className="text-sky-300">
            <ellipse cx="60" cy="50" rx="50" ry="25" />
            <ellipse cx="100" cy="40" rx="40" ry="30" />
            <ellipse cx="150" cy="50" rx="45" ry="25" />
          </svg>
        </div>
      ))}

      {/* Altitude lines */}
      <div className="absolute left-8 top-1/4 h-1/2 w-px bg-gradient-to-b from-transparent via-sky-400/30 to-transparent" />
      <div className="absolute left-12 top-1/3 h-1/3 flex flex-col justify-between">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-px bg-sky-400/40" />
        ))}
      </div>

      <style jsx>{`
        @keyframes float-cloud {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}

// Theater - Velvet curtains, spotlights, golden accents
export function TheaterBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Curtain drapes on sides */}
      <div
        className="absolute left-0 top-0 w-24 h-full opacity-40"
        style={{
          background: 'linear-gradient(90deg, #4a1515 0%, #2d0a0a 50%, transparent 100%)',
          boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.5)',
        }}
      />
      <div
        className="absolute right-0 top-0 w-24 h-full opacity-40"
        style={{
          background: 'linear-gradient(-90deg, #4a1515 0%, #2d0a0a 50%, transparent 100%)',
          boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.5)',
        }}
      />

      {/* Spotlight effect */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(251, 191, 36, 0.15) 0%, transparent 60%)',
        }}
      />

      {/* Floating gold particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
            animation: `float-particle ${5 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Ornate corner decorations */}
      <svg className="absolute top-4 left-4 w-24 h-24 text-yellow-600/20" viewBox="0 0 100 100">
        <path d="M0,0 Q50,0 50,50 Q50,0 100,0" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="50" cy="20" r="3" fill="currentColor"/>
        <path d="M20,0 Q35,35 0,20" fill="none" stroke="currentColor" strokeWidth="1"/>
      </svg>
      <svg className="absolute top-4 right-4 w-24 h-24 text-yellow-600/20 scale-x-[-1]" viewBox="0 0 100 100">
        <path d="M0,0 Q50,0 50,50 Q50,0 100,0" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="50" cy="20" r="3" fill="currentColor"/>
        <path d="M20,0 Q35,35 0,20" fill="none" stroke="currentColor" strokeWidth="1"/>
      </svg>

      <style jsx>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}

// Adventure - Topographic map, compass, forest elements
export function AdventureBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Topographic lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
        {[...Array(12)].map((_, i) => (
          <path
            key={i}
            d={`M0,${150 + i * 60} Q${200 + i * 30},${100 + i * 50} ${400 + i * 20},${180 + i * 40} T800,${150 + i * 55}`}
            fill="none"
            stroke="#4ade80"
            strokeWidth="1"
            style={{ opacity: 0.3 + (i % 3) * 0.2 }}
          />
        ))}
      </svg>

      {/* Compass in corner */}
      <div className="absolute bottom-8 right-8 w-32 h-32 opacity-20">
        <div
          className="absolute inset-0 border-2 border-green-400 rounded-full"
          style={{ animation: 'pulse 4s ease-in-out infinite' }}
        />
        <div className="absolute inset-2 border border-green-400/50 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-px h-full bg-green-400/50" />
          <div className="absolute w-full h-px bg-green-400/50" />
          <div
            className="absolute w-3 h-12 bg-gradient-to-t from-transparent via-green-400 to-red-400"
            style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
          />
        </div>
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-green-400 text-xs font-bold">N</span>
      </div>

      {/* Forest silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-20">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
          <path d="M0,100 L20,60 L30,80 L50,40 L70,70 L90,30 L110,65 L130,45 L150,75 L170,35 L190,60 L210,50 L230,70 L250,25 L270,55 L290,40 L310,65 L330,30 L350,70 L370,45 L390,60 L400,100 Z" fill="#1a3d25"/>
        </svg>
      </div>

      {/* Floating leaves */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
            opacity: 0.3,
            animation: `fall-leaf ${10 + Math.random() * 10}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        >
          🍃
        </div>
      ))}

      <style jsx>{`
        @keyframes fall-leaf {
          0% { transform: translateY(-10%) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(720deg); }
        }
      `}</style>
    </div>
  );
}

// Science - Floating molecules, circuit patterns, neon glow
export function ScienceBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(129, 140, 248, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(129, 140, 248, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating molecules */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `float-molecule ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" className="opacity-20">
            <circle cx="30" cy="15" r="8" fill="#818cf8" />
            <circle cx="15" cy="45" r="8" fill="#22d3ee" />
            <circle cx="45" cy="45" r="8" fill="#818cf8" />
            <line x1="30" y1="23" x2="18" y2="38" stroke="#818cf8" strokeWidth="2" />
            <line x1="30" y1="23" x2="42" y2="38" stroke="#818cf8" strokeWidth="2" />
            <line x1="23" y1="45" x2="37" y2="45" stroke="#22d3ee" strokeWidth="2" />
          </svg>
        </div>
      ))}

      {/* DNA helix on side */}
      <div className="absolute right-8 top-1/4 h-1/2 opacity-15">
        <svg width="40" height="300" viewBox="0 0 40 300">
          {[...Array(15)].map((_, i) => (
            <g key={i} style={{ transform: `translateY(${i * 20}px)` }}>
              <ellipse cx="20" cy="10" rx="18" ry="5" fill="none" stroke="#818cf8" strokeWidth="2" />
              <circle cx={5 + (i % 2) * 30} cy="10" r="3" fill="#22d3ee" />
            </g>
          ))}
        </svg>
      </div>

      {/* Bubbling effect */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-indigo-400/30"
          style={{
            width: `${10 + Math.random() * 20}px`,
            height: `${10 + Math.random() * 20}px`,
            left: `${Math.random() * 100}%`,
            bottom: '-5%',
            animation: `bubble-rise ${5 + Math.random() * 5}s ease-in infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float-molecule {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes bubble-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.3; }
          100% { transform: translateY(-110vh) scale(0.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Music - Sound waves, vinyl texture, concert lighting
export function MusicBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Vinyl record */}
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'repeating-radial-gradient(circle, #2d1b4e 0px, #2d1b4e 2px, #1a0f24 2px, #1a0f24 8px)',
          animation: 'spin 20s linear infinite',
        }}
      >
        <div className="absolute inset-1/3 rounded-full bg-purple-500/30" />
        <div className="absolute inset-[45%] rounded-full bg-purple-900" />
      </div>

      {/* Sound wave equalizer */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-1 h-24 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="w-2 bg-gradient-to-t from-purple-500 to-pink-400 rounded-full"
            style={{
              height: `${20 + Math.random() * 60}%`,
              animation: `eq-bar ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      {/* Spotlight beams */}
      <div
        className="absolute top-0 left-1/4 w-48 h-[600px] opacity-10"
        style={{
          background: 'linear-gradient(180deg, rgba(192, 132, 252, 0.5) 0%, transparent 100%)',
          transform: 'rotate(-15deg)',
          transformOrigin: 'top center',
          animation: 'spotlight-sway 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-0 right-1/4 w-48 h-[600px] opacity-10"
        style={{
          background: 'linear-gradient(180deg, rgba(244, 114, 182, 0.5) 0%, transparent 100%)',
          transform: 'rotate(15deg)',
          transformOrigin: 'top center',
          animation: 'spotlight-sway 8s ease-in-out infinite reverse',
        }}
      />

      {/* Musical notes floating */}
      {['♪', '♫', '♬', '♩'].map((note, i) => (
        <div
          key={i}
          className="absolute text-4xl text-purple-400/20"
          style={{
            left: `${20 + i * 20}%`,
            animation: `float-note ${6 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        >
          {note}
        </div>
      ))}

      <style jsx>{`
        @keyframes eq-bar {
          0% { height: 20%; }
          100% { height: 90%; }
        }
        @keyframes spotlight-sway {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(-5deg); }
        }
        @keyframes float-note {
          0%, 100% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-20vh) rotate(20deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Sports - Court lines, paint splatter, urban energy
export function SportsBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Court lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-orange-400" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-orange-400" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-orange-400 rounded-full"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-400 rounded-full"
        />
      </div>

      {/* Paint splatters */}
      <svg className="absolute top-10 right-10 w-48 h-48 opacity-15" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" fill="#fb923c" />
        <ellipse cx="20" cy="30" rx="15" ry="10" fill="#fb923c" />
        <ellipse cx="80" cy="70" rx="12" ry="8" fill="#facc15" />
        <circle cx="70" cy="25" r="8" fill="#fb923c" />
        <circle cx="35" cy="75" r="10" fill="#facc15" />
      </svg>
      <svg className="absolute bottom-20 left-10 w-32 h-32 opacity-10 rotate-45" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="25" fill="#facc15" />
        <ellipse cx="25" cy="40" rx="12" ry="8" fill="#facc15" />
        <ellipse cx="75" cy="60" rx="10" ry="6" fill="#fb923c" />
      </svg>

      {/* Basketball texture */}
      <div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-5"
        style={{
          background: '#fb923c',
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.5)',
        }}
      >
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-black/30" />
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-black/30" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-4 border-black/20 rounded-full"
        />
      </div>

      {/* Energy lines */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-20"
          style={{
            top: `${20 + i * 15}%`,
            left: 0,
            right: 0,
            animation: `energy-pulse ${2 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes energy-pulse {
          0%, 100% { opacity: 0.1; transform: scaleX(0.8); }
          50% { opacity: 0.3; transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

// Accessible - Subtle waves, gentle movement (non-distracting)
export function AccessibleBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Very subtle gradient waves */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.2) 0%, transparent 70%)',
        }}
      />

      {/* Gentle corner accents */}
      <div
        className="absolute top-0 left-0 w-64 h-64 opacity-5"
        style={{
          background: 'radial-gradient(circle at top left, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-64 h-64 opacity-5"
        style={{
          background: 'radial-gradient(circle at bottom right, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

// Parents - Warm holiday feel with snowflakes and Christmas lights
export function ParentsBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Warm glow from top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(220, 38, 38, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* String lights across top */}
      <div className="absolute top-8 left-0 right-0 flex justify-around">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: i % 3 === 0 ? '#dc2626' : i % 3 === 1 ? '#16a34a' : '#fbbf24',
              boxShadow: `0 0 10px ${i % 3 === 0 ? '#dc2626' : i % 3 === 1 ? '#16a34a' : '#fbbf24'}`,
              animation: `twinkle ${1 + Math.random()}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Snowflakes */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute text-white/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-5%',
            fontSize: `${12 + Math.random() * 16}px`,
            animation: `snowfall ${8 + Math.random() * 8}s linear infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        >
          ❄
        </div>
      ))}

      {/* Holly decorations in corners */}
      <div className="absolute bottom-4 left-4 text-4xl opacity-20">🎄</div>
      <div className="absolute bottom-4 right-4 text-4xl opacity-20">🎁</div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes snowfall {
          0% { transform: translateY(-10%) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Scott & Melissa - Nautical/coastal with waves and sailing elements
export function ScottMelissaBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Ocean waves */}
      <svg className="absolute bottom-0 left-0 w-full h-48 opacity-20" preserveAspectRatio="none" viewBox="0 0 1200 120">
        <path
          d="M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z"
          fill="#0ea5e9"
          style={{ animation: 'wave-move 8s ease-in-out infinite' }}
        />
        <path
          d="M0,80 C200,40 400,120 600,80 C800,40 1000,100 1200,80 L1200,120 L0,120 Z"
          fill="#0369a1"
          style={{ animation: 'wave-move 6s ease-in-out infinite reverse' }}
        />
      </svg>

      {/* Compass rose */}
      <div className="absolute top-12 right-12 w-24 h-24 opacity-15">
        <svg viewBox="0 0 100 100" className="w-full h-full text-sky-400">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <path d="M50,10 L55,50 L50,45 L45,50 Z" fill="currentColor" />
          <path d="M50,90 L55,50 L50,55 L45,50 Z" fill="currentColor" opacity="0.5" />
          <path d="M10,50 L50,45 L45,50 L50,55 Z" fill="currentColor" opacity="0.5" />
          <path d="M90,50 L50,45 L55,50 L50,55 Z" fill="currentColor" opacity="0.5" />
          <text x="50" y="8" textAnchor="middle" fill="currentColor" fontSize="8">N</text>
        </svg>
      </div>

      {/* Sailing boat silhouette */}
      <div
        className="absolute bottom-32 opacity-10"
        style={{
          animation: 'sail-drift 30s linear infinite',
        }}
      >
        <svg width="80" height="100" viewBox="0 0 80 100" fill="#0ea5e9">
          <path d="M40,10 L40,70 L70,70 Q55,40 40,10" />
          <path d="M38,20 L38,70 L15,70 Q25,45 38,20" opacity="0.7" />
          <ellipse cx="40" cy="85" rx="35" ry="8" />
        </svg>
      </div>

      {/* Stars (for night sailing) */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-sky-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 40}%`,
            opacity: Math.random() * 0.3 + 0.1,
            animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes wave-move {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-20px); }
        }
        @keyframes sail-drift {
          0% { left: -100px; }
          100% { left: 110%; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}

// Jenny & Matt - Elegant starlight and sparkles
export function JennyMattBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Soft gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 70%)',
          animation: 'float-orb 12s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(252, 211, 77, 0.3) 0%, transparent 70%)',
          animation: 'float-orb 10s ease-in-out infinite reverse',
        }}
      />

      {/* Sparkle stars */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `sparkle ${3 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          <svg
            width={8 + Math.random() * 12}
            height={8 + Math.random() * 12}
            viewBox="0 0 24 24"
            fill="none"
            className="text-violet-300"
            style={{ opacity: 0.2 + Math.random() * 0.2 }}
          >
            <path
              d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}

      {/* Elegant corner flourishes */}
      <svg className="absolute top-8 left-8 w-32 h-32 opacity-10" viewBox="0 0 100 100">
        <path
          d="M10,50 Q10,10 50,10 M30,50 Q30,30 50,30"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="2"
        />
        <circle cx="50" cy="10" r="3" fill="#fcd34d" />
      </svg>
      <svg className="absolute bottom-8 right-8 w-32 h-32 opacity-10 rotate-180" viewBox="0 0 100 100">
        <path
          d="M10,50 Q10,10 50,10 M30,50 Q30,30 50,30"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="2"
        />
        <circle cx="50" cy="10" r="3" fill="#fcd34d" />
      </svg>

      {/* Gentle floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-violet-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-2%',
            opacity: 0.3,
            animation: `rise-particle ${10 + Math.random() * 10}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.2; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.4; }
        }
        @keyframes rise-particle {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export function ThemeBackground({ themeId }: { themeId: string }) {
  switch (themeId) {
    case 'aviation': return <AviationBackground />;
    case 'theater': return <TheaterBackground />;
    case 'adventure': return <AdventureBackground />;
    case 'science': return <ScienceBackground />;
    case 'music': return <MusicBackground />;
    case 'sports': return <SportsBackground />;
    case 'accessible': return <AccessibleBackground />;
    case 'parents': return <ParentsBackground />;
    case 'scottmelissa': return <ScottMelissaBackground />;
    case 'jennymatt': return <JennyMattBackground />;
    default: return null;
  }
}
