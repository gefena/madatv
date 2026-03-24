// Each episode gets a unique color theme used for card gradients and accents
export const EPISODE_COLORS: Record<string, {
  gradient: string;
  badge: string;
  text: string;
  glow: string;
  emoji: string;
}> = {
  "01-the-cell":              { gradient: "from-violet-500 to-purple-600",    badge: "bg-violet-500",  text: "text-violet-600",  glow: "shadow-violet-200",  emoji: "🔬" },
  "02-birth":                 { gradient: "from-pink-400 to-rose-500",        badge: "bg-pink-500",    text: "text-pink-600",    glow: "shadow-pink-200",    emoji: "👶" },
  "03-the-body-guards":       { gradient: "from-red-400 to-orange-500",       badge: "bg-red-500",     text: "text-red-600",     glow: "shadow-red-200",     emoji: "🛡️" },
  "04-bone-marrow":           { gradient: "from-orange-400 to-amber-500",     badge: "bg-orange-500",  text: "text-orange-600",  glow: "shadow-orange-200",  emoji: "🦴" },
  "05-blood-vessels":         { gradient: "from-red-500 to-pink-600",         badge: "bg-red-500",     text: "text-red-600",     glow: "shadow-red-200",     emoji: "🩸" },
  "06-blood-platelets":       { gradient: "from-rose-400 to-red-500",         badge: "bg-rose-500",    text: "text-rose-600",    glow: "shadow-rose-200",    emoji: "🔴" },
  "07-the-heart":             { gradient: "from-red-500 to-rose-600",         badge: "bg-red-500",     text: "text-red-600",     glow: "shadow-red-200",     emoji: "❤️" },
  "08-breathing":             { gradient: "from-sky-400 to-blue-500",         badge: "bg-sky-500",     text: "text-sky-600",     glow: "shadow-sky-200",     emoji: "🫁" },
  "09-the-brain":             { gradient: "from-purple-500 to-indigo-600",    badge: "bg-purple-500",  text: "text-purple-600",  glow: "shadow-purple-200",  emoji: "🧠" },
  "10-the-neurons":           { gradient: "from-indigo-400 to-violet-500",    badge: "bg-indigo-500",  text: "text-indigo-600",  glow: "shadow-indigo-200",  emoji: "⚡" },
  "11-the-eye":               { gradient: "from-teal-400 to-cyan-500",        badge: "bg-teal-500",    text: "text-teal-600",    glow: "shadow-teal-200",    emoji: "👁️" },
  "12-the-ear":               { gradient: "from-yellow-400 to-orange-400",    badge: "bg-yellow-500",  text: "text-yellow-600",  glow: "shadow-yellow-200",  emoji: "👂" },
  "13-the-skin":              { gradient: "from-amber-300 to-orange-400",     badge: "bg-amber-400",   text: "text-amber-600",   glow: "shadow-amber-200",   emoji: "✋" },
  "14-mouth-and-teeth":       { gradient: "from-yellow-400 to-amber-500",     badge: "bg-yellow-500",  text: "text-yellow-600",  glow: "shadow-yellow-200",  emoji: "🦷" },
  "15-digestion":             { gradient: "from-green-400 to-emerald-500",    badge: "bg-green-500",   text: "text-green-600",   glow: "shadow-green-200",   emoji: "🥗" },
  "16-the-liver":             { gradient: "from-amber-400 to-orange-500",     badge: "bg-amber-500",   text: "text-amber-600",   glow: "shadow-amber-200",   emoji: "🟤" },
  "17-the-kidneys":           { gradient: "from-red-400 to-rose-500",         badge: "bg-red-400",     text: "text-red-600",     glow: "shadow-red-200",     emoji: "🫘" },
  "18-the-lymphatic-system":  { gradient: "from-cyan-400 to-blue-500",        badge: "bg-cyan-500",    text: "text-cyan-600",    glow: "shadow-cyan-200",    emoji: "💧" },
  "19-bones-and-skeleton":    { gradient: "from-slate-400 to-blue-500",       badge: "bg-slate-500",   text: "text-slate-600",   glow: "shadow-slate-200",   emoji: "💀" },
  "20-muscles-and-fat":       { gradient: "from-orange-400 to-red-500",       badge: "bg-orange-500",  text: "text-orange-600",  glow: "shadow-orange-200",  emoji: "💪" },
  "21-fight-against-toxins":  { gradient: "from-lime-400 to-green-500",       badge: "bg-lime-500",    text: "text-lime-600",    glow: "shadow-lime-200",    emoji: "☠️" },
  "22-the-immune-system":     { gradient: "from-blue-400 to-indigo-500",      badge: "bg-blue-500",    text: "text-blue-600",    glow: "shadow-blue-200",    emoji: "🦠" },
  "23-the-hormones":          { gradient: "from-fuchsia-400 to-purple-500",   badge: "bg-fuchsia-500", text: "text-fuchsia-600", glow: "shadow-fuchsia-200", emoji: "⚗️" },
  "24-the-chain-of-life":     { gradient: "from-pink-400 to-fuchsia-500",     badge: "bg-pink-500",    text: "text-pink-600",    glow: "shadow-pink-200",    emoji: "🧬" },
  "25-repairs":               { gradient: "from-emerald-400 to-teal-500",     badge: "bg-emerald-500", text: "text-emerald-600", glow: "shadow-emerald-200", emoji: "🩹" },
  "26-life-goes-on":          { gradient: "from-yellow-400 to-orange-500",    badge: "bg-yellow-500",  text: "text-yellow-600",  glow: "shadow-yellow-200",  emoji: "🌟" },

  // — The Discoverers —
  "d01-the-chinese":          { gradient: "from-red-500 to-amber-500",        badge: "bg-red-500",     text: "text-red-600",     glow: "shadow-red-200",     emoji: "🐉" },
  "d02-archimedes":           { gradient: "from-cyan-500 to-teal-600",        badge: "bg-cyan-500",    text: "text-cyan-600",    glow: "shadow-cyan-200",    emoji: "⚖️" },
  "d03-hero-of-alexandria":   { gradient: "from-orange-400 to-red-500",       badge: "bg-orange-500",  text: "text-orange-600",  glow: "shadow-orange-200",  emoji: "⚙️" },
  "d04-measuring-time":       { gradient: "from-blue-500 to-indigo-600",      badge: "bg-blue-500",    text: "text-blue-600",    glow: "shadow-blue-200",    emoji: "⏳" },
  "d05-henry-the-navigator":  { gradient: "from-teal-500 to-green-600",       badge: "bg-teal-500",    text: "text-teal-600",    glow: "shadow-teal-200",    emoji: "🗺️" },
  "d06-gutenberg":            { gradient: "from-amber-600 to-yellow-500",     badge: "bg-amber-600",   text: "text-amber-700",   glow: "shadow-amber-200",   emoji: "📖" },
  "d07-da-vinci":             { gradient: "from-violet-500 to-purple-600",    badge: "bg-violet-500",  text: "text-violet-600",  glow: "shadow-violet-200",  emoji: "🎨" },
  "d08-the-doctors":          { gradient: "from-rose-500 to-red-600",         badge: "bg-rose-500",    text: "text-rose-600",    glow: "shadow-rose-200",    emoji: "🩺" },
  "d09-galileo":              { gradient: "from-indigo-500 to-blue-600",      badge: "bg-indigo-500",  text: "text-indigo-600",  glow: "shadow-indigo-200",  emoji: "🔭" },
  "d10-newton":               { gradient: "from-purple-500 to-violet-600",    badge: "bg-purple-500",  text: "text-purple-600",  glow: "shadow-purple-200",  emoji: "🍎" },
  "d11-buffon":               { gradient: "from-emerald-500 to-green-600",    badge: "bg-emerald-500", text: "text-emerald-600", glow: "shadow-emerald-200", emoji: "🦕" },
  "d12-lavoisier":            { gradient: "from-sky-400 to-cyan-500",         badge: "bg-sky-500",     text: "text-sky-600",     glow: "shadow-sky-200",     emoji: "⚗️" },
  "d13-stephenson":           { gradient: "from-red-500 to-orange-500",       badge: "bg-red-500",     text: "text-red-600",     glow: "shadow-red-200",     emoji: "🚂" },
  "d14-faraday":              { gradient: "from-yellow-400 to-amber-500",     badge: "bg-yellow-500",  text: "text-yellow-600",  glow: "shadow-yellow-200",  emoji: "⚡" },
  "d15-darwin":               { gradient: "from-lime-500 to-green-600",       badge: "bg-lime-500",    text: "text-lime-600",    glow: "shadow-lime-200",    emoji: "🐢" },
  "d16-mendel":               { gradient: "from-fuchsia-500 to-purple-600",   badge: "bg-fuchsia-500", text: "text-fuchsia-600", glow: "shadow-fuchsia-200", emoji: "🌱" },
  "d17-pasteur":              { gradient: "from-green-500 to-teal-600",       badge: "bg-green-500",   text: "text-green-600",   glow: "shadow-green-200",   emoji: "🦠" },
  "d18-edison":               { gradient: "from-yellow-500 to-orange-400",    badge: "bg-yellow-500",  text: "text-yellow-600",  glow: "shadow-yellow-200",  emoji: "💡" },
  "d19-marconi":              { gradient: "from-blue-400 to-sky-500",         badge: "bg-blue-500",    text: "text-blue-600",    glow: "shadow-blue-200",    emoji: "📻" },
  "d20-ford":                 { gradient: "from-slate-500 to-gray-600",       badge: "bg-slate-500",   text: "text-slate-600",   glow: "shadow-slate-200",   emoji: "🚗" },
  "d21-aviation":             { gradient: "from-sky-500 to-blue-600",         badge: "bg-sky-500",     text: "text-sky-600",     glow: "shadow-sky-200",     emoji: "✈️" },
  "d22-marie-curie":          { gradient: "from-pink-500 to-purple-600",      badge: "bg-pink-500",    text: "text-pink-600",    glow: "shadow-pink-200",    emoji: "☢️" },
  "d23-einstein":             { gradient: "from-indigo-400 to-violet-500",    badge: "bg-indigo-500",  text: "text-indigo-600",  glow: "shadow-indigo-200",  emoji: "🌌" },
  "d24-lorenz":               { gradient: "from-amber-400 to-green-500",      badge: "bg-amber-500",   text: "text-amber-600",   glow: "shadow-amber-200",   emoji: "🪿" },
  "d25-armstrong":            { gradient: "from-blue-600 to-indigo-700",      badge: "bg-blue-600",    text: "text-blue-700",    glow: "shadow-blue-200",    emoji: "🚀" },
  "d26-tomorrow":             { gradient: "from-fuchsia-400 to-pink-500",     badge: "bg-fuchsia-500", text: "text-fuchsia-600", glow: "shadow-fuchsia-200", emoji: "🌟" },
};

export function getEpisodeColor(id: string) {
  return EPISODE_COLORS[id] ?? {
    gradient: "from-slate-400 to-slate-500",
    badge: "bg-slate-500",
    text: "text-slate-600",
    glow: "shadow-slate-200",
    emoji: "🔬",
  };
}
