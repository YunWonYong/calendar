export interface BgTheme {
    id: string;
    background: string;
    color: string; // 내부 아이콘 기본 색상
}

export const BG_THEMES: Record<string, BgTheme> = {
    // 1~10: Modern Gradients
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

    // 11~20: Soft Pastel
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

    // 21~30: Deep & Dark Tones
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
};

