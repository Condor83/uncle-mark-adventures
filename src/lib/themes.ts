import { Theme } from "@/types";

export const themes: Record<string, Theme> = {
  aviation: {
    name: "Riley",
    personalMessage: "Riley, I'm proud to be your uncle! It's fun watching you grow into adulthood and see your passions develop. Can't wait for more adventures together!",
    themeId: "aviation",
    primary: "#38bdf8", // bright sky blue
    secondary: "#475569", // slate/metal gray
    accent: "#fb923c", // warm orange
    background: "#0a1628",
    backgroundGradient: "radial-gradient(ellipse at top, #1e3a5f 0%, #0a1628 50%, #030712 100%)",
    textColor: "#e0f2fe",
    cardBg: "rgba(15, 35, 60, 0.85)",
    welcomeMessage: "Ready for takeoff, Riley?",
    icon: "✈️",
    fontFamily: "'Exo 2', sans-serif",
    displayFont: "'Orbitron', sans-serif",
    glowColor: "rgba(56, 189, 248, 0.4)",
    patternOpacity: 0.15,
  },
  theater: {
    name: "Ella",
    personalMessage: "Ella, your love for books, theater, and travel inspires everyone around you. You have such a beautiful creative spirit and I'm so proud of the young woman you're becoming. Here's to many more adventures!",
    themeId: "theater",
    primary: "#fbbf24", // bright gold
    secondary: "#991b1b", // deep crimson
    accent: "#fef3c7", // cream
    background: "#1a0a0a",
    backgroundGradient: "radial-gradient(ellipse at center top, #3d1515 0%, #1a0a0a 60%, #0d0505 100%)",
    textColor: "#fef3c7",
    cardBg: "rgba(61, 21, 21, 0.8)",
    welcomeMessage: "The spotlight awaits, Ella!",
    icon: "🎭",
    fontFamily: "'Cormorant Garamond', serif",
    displayFont: "'Playfair Display', serif",
    glowColor: "rgba(251, 191, 36, 0.5)",
    patternOpacity: 0.12,
  },
  adventure: {
    name: "Abby",
    personalMessage: "Abby, you have a special ability to make friends, love others and lead! I'm excited for your future and can't wait to see what you do. I look forward to 2026 with you!",
    themeId: "adventure",
    primary: "#4ade80", // vibrant green
    secondary: "#a16207", // earth brown
    accent: "#fde047", // sunshine yellow
    background: "#0a1a10",
    backgroundGradient: "linear-gradient(180deg, #1a3d25 0%, #0a1a10 40%, #050d08 100%)",
    textColor: "#d9f99d",
    cardBg: "rgba(20, 50, 30, 0.85)",
    welcomeMessage: "The wild calls, Abby!",
    icon: "🏹",
    fontFamily: "'Nunito', sans-serif",
    displayFont: "'Bebas Neue', sans-serif",
    glowColor: "rgba(74, 222, 128, 0.3)",
    patternOpacity: 0.2,
  },
  science: {
    name: "Colton",
    personalMessage: "Colton, your curiosity and love for science is amazing! Never stop asking questions and exploring how things work. The world needs more curious minds like yours. Let's discover something awesome together!",
    themeId: "science",
    primary: "#818cf8", // electric indigo
    secondary: "#4f46e5", // deep indigo
    accent: "#22d3ee", // cyan
    background: "#0a0a1a",
    backgroundGradient: "radial-gradient(ellipse at bottom, #1e1b4b 0%, #0a0a1a 60%, #050510 100%)",
    textColor: "#c7d2fe",
    cardBg: "rgba(30, 27, 75, 0.8)",
    welcomeMessage: "Let's experiment, Colton!",
    icon: "🔬",
    fontFamily: "'Space Mono', monospace",
    displayFont: "'Audiowide', sans-serif",
    glowColor: "rgba(129, 140, 248, 0.4)",
    patternOpacity: 0.25,
  },
  music: {
    name: "Claire",
    personalMessage: "Claire, your musical talent and love for mountain biking show what a well-rounded person you are! Whether you're playing the guitar or popping another tire, you bring so much energy to everything you do!",
    themeId: "music",
    primary: "#c084fc", // vibrant purple
    secondary: "#7e22ce", // deep purple
    accent: "#f472b6", // hot pink
    background: "#120a1a",
    backgroundGradient: "linear-gradient(135deg, #2d1b4e 0%, #120a1a 50%, #0a0510 100%)",
    textColor: "#f5d0fe",
    cardBg: "rgba(45, 27, 78, 0.8)",
    welcomeMessage: "Let's rock, Claire!",
    icon: "🎸",
    fontFamily: "'Poppins', sans-serif",
    displayFont: "'Righteous', sans-serif",
    glowColor: "rgba(192, 132, 252, 0.4)",
    patternOpacity: 0.18,
  },
  sports: {
    name: "Jake",
    personalMessage: "Jake, even though you are a warriors fan, I love that we share a passion for basketball together. You remind me of me when I was younger. Keep pursuing your passions!",
    themeId: "sports",
    primary: "#fb923c", // vibrant orange
    secondary: "#1c1917", // almost black
    accent: "#facc15", // golden yellow
    background: "#0f0a05",
    backgroundGradient: "radial-gradient(ellipse at top right, #3d2610 0%, #0f0a05 60%, #050302 100%)",
    textColor: "#fff7ed",
    cardBg: "rgba(60, 35, 15, 0.85)",
    welcomeMessage: "Game on, Jake!",
    icon: "🏀",
    fontFamily: "'Barlow Condensed', sans-serif",
    displayFont: "'Black Ops One', sans-serif",
    glowColor: "rgba(251, 146, 60, 0.4)",
    patternOpacity: 0.2,
  },
  accessible: {
    name: "Ezra",
    personalMessage: "Ezra, you truly inspire me! You don't let anything hold you back and you face the world with courage. Excited for more adventures together!",
    themeId: "accessible",
    primary: "#fbbf24", // bright yellow
    secondary: "#000000",
    accent: "#ffffff",
    background: "#000000",
    backgroundGradient: "linear-gradient(180deg, #1a1a1a 0%, #000000 100%)",
    textColor: "#ffffff",
    cardBg: "rgba(30, 30, 30, 0.95)",
    welcomeMessage: "Hey Ezra! Your adventures are ready!",
    icon: "🎸",
    fontFamily: "system-ui, -apple-system, sans-serif",
    displayFont: "system-ui, -apple-system, sans-serif",
    isAccessible: true,
    glowColor: "rgba(251, 191, 36, 0.6)",
    patternOpacity: 0.1,
  },
  // Couple themes
  parents: {
    name: "Mom & Dad",
    personalMessage: "Mom and Dad, what a lucky guy I am to be born into this family! I love and cherish our time together always. Looking forward to more of it.",
    themeId: "parents",
    primary: "#dc2626", // warm red
    secondary: "#166534", // forest green
    accent: "#fef3c7", // warm cream
    background: "#0f0805",
    backgroundGradient: "radial-gradient(ellipse at top, #2d1810 0%, #0f0805 50%, #050302 100%)",
    textColor: "#fef7ed",
    cardBg: "rgba(45, 24, 16, 0.85)",
    welcomeMessage: "Merry Christmas, Mom & Dad!",
    icon: "🎄",
    fontFamily: "'Lora', serif",
    displayFont: "'Playfair Display', serif",
    glowColor: "rgba(220, 38, 38, 0.35)",
    patternOpacity: 0.15,
  },
  scottmelissa: {
    name: "Scott, Melissa & Linda",
    personalMessage: "Scott, Meliss, and Linda I'm glad you are back! Thanks for always being there for me. I'm excited for all that awaits us in the next year!",
    themeId: "scottmelissa",
    primary: "#0ea5e9", // ocean blue
    secondary: "#0369a1", // deep blue
    accent: "#bae6fd", // light blue
    background: "#030a10",
    backgroundGradient: "linear-gradient(180deg, #0c2940 0%, #030a10 60%, #010408 100%)",
    textColor: "#e0f2fe",
    cardBg: "rgba(12, 41, 64, 0.8)",
    welcomeMessage: "Welcome home, Scott, Melissa and Linda!",
    icon: "⛵",
    fontFamily: "'Source Sans 3', sans-serif",
    displayFont: "'Josefin Sans', sans-serif",
    glowColor: "rgba(14, 165, 233, 0.4)",
    patternOpacity: 0.18,
  },
  jennymatt: {
    name: "Jenny & Matt",
    personalMessage: "Matt and Jen,Thank you for being such great examples to me! One day I hope to emulate the family you've created :)",
    themeId: "jennymatt",
    primary: "#a78bfa", // soft violet
    secondary: "#6d28d9", // deep purple
    accent: "#fcd34d", // golden
    background: "#0d0a12",
    backgroundGradient: "radial-gradient(ellipse at bottom left, #1e1530 0%, #0d0a12 50%, #050308 100%)",
    textColor: "#ede9fe",
    cardBg: "rgba(30, 21, 48, 0.85)",
    welcomeMessage: "Merry Christmas, Jenny & Matt!",
    icon: "✨",
    fontFamily: "'Quicksand', sans-serif",
    displayFont: "'Italiana', serif",
    glowColor: "rgba(167, 139, 250, 0.4)",
    patternOpacity: 0.12,
  },
};

export function getThemeBySlug(slug: string): Theme | null {
  const name = slug.split("-")[0].toLowerCase();

  const nameToTheme: Record<string, string> = {
    riley: "aviation",
    ella: "theater",
    abby: "adventure",
    colton: "science",
    claire: "music",
    jake: "sports",
    ezra: "accessible",
    // Couples
    momdad: "parents",
    parents: "parents",
    scottmelissa: "scottmelissa",
    jennymatt: "jennymatt",
  };

  const themeKey = nameToTheme[name];
  return themeKey ? themes[themeKey] : null;
}
