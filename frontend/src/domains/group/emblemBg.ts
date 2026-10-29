export interface BgTheme { id: string; background: string; color: string; }

export const BG_THEMES = {
    "bg-01": { id: "bg-01", background: "linear-gradient(135deg, #FF6B6B, #FF8E53)", color: "#FFFFFF" },
    "bg-02": { id: "bg-02", background: "linear-gradient(135deg, #4FACFE, #00F2FE)", color: "#FFFFFF" },
    "bg-03": { id: "bg-03", background: "linear-gradient(135deg, #43E97B, #38F9D7)", color: "#111111" },
    "bg-04": { id: "bg-04", background: "linear-gradient(135deg, #FA709A, #FEE140)", color: "#FFFFFF" },
    "bg-05": { id: "bg-05", background: "linear-gradient(135deg, #667EEA, #764BA2)", color: "#FFFFFF" },
    "bg-06": { id: "bg-06", background: "linear-gradient(135deg, #89F7FE, #66A6FF)", color: "#111111" },
    "bg-07": { id: "bg-07", background: "linear-gradient(135deg, #FF9A9E, #FECFEF)", color: "#111111" },
    "bg-08": { id: "bg-08", background: "linear-gradient(135deg, #f39c12, #d35400)", color: "#FFFFFF" },
    "bg-09": { id: "bg-09", background: "linear-gradient(135deg, #A1C4FD, #C2E9FB)", color: "#111111" },
    "bg-10": { id: "bg-10", background: "linear-gradient(135deg, #11998e, #38ef7d)", color: "#FFFFFF" },
    "bg-11": { id: "bg-11", background: "#FFE5EC", color: "#FF4D6D" },
    "bg-12": { id: "bg-12", background: "#E8F0FE", color: "#1A73E8" },
    "bg-13": { id: "bg-13", background: "#E6F4EA", color: "#137333" },
    "bg-14": { id: "bg-14", background: "#FEF7E0", color: "#B06000" },
    "bg-15": { id: "bg-15", background: "#F3E8FF", color: "#9333EA" },
    "bg-16": { id: "bg-16", background: "#E0F2FE", color: "#0284C7" },
    "bg-17": { id: "bg-17", background: "#FCE7F3", color: "#DB2777" },
    "bg-18": { id: "bg-18", background: "#ECFDF5", color: "#059669" },
    "bg-19": { id: "bg-19", background: "#FFF7ED", color: "#EA580C" },
    "bg-20": { id: "bg-20", background: "#F1F5F9", color: "#475569" },
    "bg-21": { id: "bg-21", background: "#0F172A", color: "#38BDF8" },
    "bg-22": { id: "bg-22", background: "#1E1B4B", color: "#A855F7" },
    "bg-23": { id: "bg-23", background: "#881337", color: "#FB7185" },
    "bg-24": { id: "bg-24", background: "#064E3B", color: "#34D399" },
    "bg-25": { id: "bg-25", background: "#7C2D12", color: "#FDBA74" },
    "bg-26": { id: "bg-26", background: "#18181B", color: "#FAFAFA" },
    "bg-27": { id: "bg-27", background: "#312E81", color: "#818CF8" },
    "bg-28": { id: "bg-28", background: "#701A75", color: "#F0ABFC" },
    "bg-29": { id: "bg-29", background: "#14532D", color: "#86EFAC" },
    "bg-30": { id: "bg-30", background: "#451A03", color: "#FDE047" },
    "bg-31": { id: "bg-31", background: "linear-gradient(135deg, #F7971E, #FFD200)", color: "#422006" },
    "bg-32": { id: "bg-32", background: "linear-gradient(135deg, #00B4DB, #0083B0)", color: "#FFFFFF" },
    "bg-33": { id: "bg-33", background: "linear-gradient(135deg, #ED213A, #93291E)", color: "#FFFFFF" },
    "bg-34": { id: "bg-34", background: "linear-gradient(135deg, #D4FC79, #96E6A1)", color: "#14532D" },
    "bg-35": { id: "bg-35", background: "linear-gradient(135deg, #8E2DE2, #4A00E0)", color: "#FFFFFF" },
    "bg-36": { id: "bg-36", background: "linear-gradient(135deg, #396AFC, #2948FF)", color: "#FFFFFF" },
    "bg-37": { id: "bg-37", background: "linear-gradient(135deg, #F857A6, #FF5858)", color: "#FFFFFF" },
    "bg-38": { id: "bg-38", background: "linear-gradient(135deg, #BDC3C7, #2C3E50)", color: "#FFFFFF" },
    "bg-39": { id: "bg-39", background: "linear-gradient(135deg, #232526, #414345)", color: "#FDE68A" },
    "bg-40": { id: "bg-40", background: "linear-gradient(135deg, #134E5E, #71B280)", color: "#FFFFFF" },
    "bg-41": { id: "bg-41", background: "#5B2333", color: "#FFD6A5" },
    "bg-42": { id: "bg-42", background: "#9A3412", color: "#FFEDD5" },
    "bg-43": { id: "bg-43", background: "#F5E6CC", color: "#704214" },
    "bg-44": { id: "bg-44", background: "#0F766E", color: "#CCFBF1" },
    "bg-45": { id: "bg-45", background: "#1D4ED8", color: "#DBEAFE" },
    "bg-46": { id: "bg-46", background: "#6B21A8", color: "#F3E8FF" },
    "bg-47": { id: "bg-47", background: "#365314", color: "#D9F99D" },
    "bg-48": { id: "bg-48", background: "#374151", color: "#F9FAFB" },
    "bg-49": { id: "bg-49", background: "#E7D8C9", color: "#5C4033" },
    "bg-50": { id: "bg-50", background: "#164E63", color: "#A5F3FC" },
} satisfies Record<string, BgTheme>;

export type BGId = keyof typeof BG_THEMES;
export const BG_IDS = Object.keys(BG_THEMES) as BGId[];

export const getRandomBGId = () => {
    const bgIdSize = BG_IDS.length;
    return BG_IDS[Math.floor(Math.random() * bgIdSize)];
};