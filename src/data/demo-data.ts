export const sectors = [
  { id: "arena", name: "Spielarena", description: "Kämpfe und Wettkämpfe in virtuellen Arenen", icon: "⚔️", color: "neon-cyan", players: 1243, activities: ["PvP Duelle", "Turnier-Modus", "Training"] },
  { id: "marketplace", name: "Marktplatz", description: "Handle mit Items, Skins und virtuellen Gütern", icon: "🏪", color: "neon-magenta", players: 892, activities: ["Items kaufen", "Auktionen", "Tauschen"] },
  { id: "social", name: "Sozialer Hub", description: "Triff andere Spieler, chatte und feiere", icon: "🌐", color: "neon-blue", players: 2156, activities: ["Lounges", "Events", "Clubs"] },
  { id: "creative", name: "Kreativzone", description: "Baue Welten, designe Items und erschaffe Kunst", icon: "🎨", color: "neon-green", players: 567, activities: ["Welt-Builder", "Item-Designer", "Galerie"] },
  { id: "quest", name: "Questland", description: "Erkunde Geschichten und löse Rätsel für Belohnungen", icon: "🗺️", color: "neon-orange", players: 1834, activities: ["Story-Quests", "Easter Eggs", "Rätsel"] },
  { id: "arcade", name: "Arcade", description: "Klassische und neue Mini-Spiele für jeden", icon: "🕹️", color: "neon-cyan", players: 3201, activities: ["Retro Games", "Puzzles", "Highscore-Jagd"] },
];

export const avatar = {
  name: "NeonRider_X",
  level: 42,
  xp: 8750,
  xpMax: 10000,
  coins: 15420,
  symbol: "🤖",
};

export const inventoryItems = [
  { id: 1, name: "Neon Katana", rarity: "legendary" as const, icon: "⚔️" },
  { id: 2, name: "Cyber Helm", rarity: "rare" as const, icon: "🪖" },
  { id: 3, name: "Speed Boots", rarity: "rare" as const, icon: "👢" },
  { id: 4, name: "Holo-Shield", rarity: "common" as const, icon: "🛡️" },
  { id: 5, name: "Data Chip", rarity: "common" as const, icon: "💾" },
  { id: 6, name: "Phoenix Wings", rarity: "legendary" as const, icon: "🔥" },
  { id: 7, name: "Stealth Cloak", rarity: "rare" as const, icon: "🧥" },
  { id: 8, name: "Energy Cell", rarity: "common" as const, icon: "🔋" },
];

export const leaderboard = [
  { rank: 1, name: "Parzival_2049", eggs: 847, avatar: "👑" },
  { rank: 2, name: "Art3mis_XX", eggs: 812, avatar: "🦊" },
  { rank: 3, name: "Aech_Prime", eggs: 791, avatar: "🤖" },
  { rank: 4, name: "NeonRider_X", eggs: 756, avatar: "⚡" },
  { rank: 5, name: "Daito_Zen", eggs: 723, avatar: "🗡️" },
  { rank: 6, name: "Shoto_Wave", eggs: 698, avatar: "🌊" },
  { rank: 7, name: "GlitchQueen", eggs: 654, avatar: "👾" },
  { rank: 8, name: "ByteHunter", eggs: 621, avatar: "🎯" },
];

export const chatMessages = [
  { user: "Art3mis_XX", message: "Hat jemand das Easter Egg in Sektor 7 gefunden?", time: "vor 2 Min" },
  { user: "Aech_Prime", message: "Neues Update im Marktplatz! Legendary Items droppen!", time: "vor 5 Min" },
  { user: "Parzival_2049", message: "GG an alle beim Turnier heute 🏆", time: "vor 8 Min" },
  { user: "GlitchQueen", message: "Suche Team für die Quest-Challenge!", time: "vor 12 Min" },
  { user: "NeonRider_X", message: "Wer will tauschen? Habe doppelte Cyber-Helme", time: "vor 15 Min" },
];

export const avatarOptions = {
  symbols: ["🤖", "👾", "🦊", "⚡", "🗡️", "🌊", "👑", "🎯", "🔥", "💀", "🐉", "🦅"],
  colors: [
    { name: "Neon Cyan", value: "hsl(185, 100%, 50%)" },
    { name: "Neon Magenta", value: "hsl(300, 100%, 60%)" },
    { name: "Electric Blue", value: "hsl(220, 100%, 60%)" },
    { name: "Neon Green", value: "hsl(150, 100%, 50%)" },
    { name: "Neon Orange", value: "hsl(30, 100%, 55%)" },
    { name: "Cyber Purple", value: "hsl(270, 100%, 60%)" },
  ],
};
