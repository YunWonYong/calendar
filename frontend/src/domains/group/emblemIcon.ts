export interface IconShape {
    type: "path" | "circle" | "rect" | "line" | "polygon" | "polyline";
    props: Record<string, any>;
}

export interface IconPreset {
    category: string;
    shapes: IconShape[];
}

export const ICON_PRESETS = {
    // ----------------------------------------------------------------
    // 1. 기본 / 모임 (01 ~ 08)
    // ----------------------------------------------------------------
    "icon-01": {
        category: "일반",
        shapes: [
            { type: "rect", props: { x: 16, y: 24, width: 96, height: 88, rx: 12, ry: 12 } },
            { type: "line", props: { x1: 88, y1: 12, x2: 88, y2: 32 } },
            { type: "line", props: { x1: 40, y1: 12, x2: 40, y2: 32 } },
            { type: "line", props: { x1: 16, y1: 52, x2: 112, y2: 52 } },
        ],
    },
    "icon-02": {
        category: "일반",
        shapes: [
            { type: "path", props: { d: "M104 112v-8a24 24 0 0 0-24-24H48a24 24 0 0 0-24 24v8" } },
            { type: "circle", props: { cx: 64, cy: 40, r: 24 } },
        ],
    },
    "icon-03": {
        category: "일반",
        shapes: [
            { type: "path", props: { d: "M90 112v-8a18 18 0 0 0-18-18H56a18 18 0 0 0-18 18v8" } },
            { type: "circle", props: { cx: 64, cy: 48, r: 18 } },
            { type: "path", props: { d: "M114 112v-8a16 16 0 0 0-12-15.5" } },
            { type: "path", props: { d: "M88 28.5a16 16 0 0 1 0 31" } },
            { type: "path", props: { d: "M14 112v-8a16 16 0 0 1 12-15.5" } },
            { type: "path", props: { d: "M40 28.5a16 16 0 0 0 0 31" } },
        ],
    },
    "icon-04": {
        category: "일반",
        shapes: [
            { type: "path", props: { d: "M112 56a48 48 0 1 1-96 0 48 48 0 0 1 96 0z" } },
            { type: "path", props: { d: "M64 16v40l28 28" } },
        ],
    },
    "icon-05": {
        category: "일반",
        shapes: [
            { type: "path", props: { d: "M112 53.33C112 85.33 64 117.33 64 117.33S16 85.33 16 53.33a32 32 0 0 1 60-16.7 32 32 0 0 1 36 16.7z" } },
        ],
    },
    "icon-06": {
        category: "일반",
        shapes: [
            { type: "polygon", props: { points: "64 16 78.8 46 112 50.8 88 74.2 93.6 107.2 64 91.6 34.4 107.2 40 74.2 16 50.8 49.2 46 64 16" } },
        ],
    },
    "icon-07": {
        category: "일반",
        shapes: [
            { type: "path", props: { d: "M96 16H32a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h16l16 16 16-16h16a16 16 0 0 0 16-16V32a16 16 0 0 0-16-16z" } },
        ],
    },
    "icon-08": {
        category: "일반",
        shapes: [
            { type: "circle", props: { cx: 64, cy: 64, r: 48 } },
            { type: "line", props: { x1: 16, y1: 64, x2: 112, y2: 64 } },
            { type: "path", props: { d: "M64 16C38 36 38 92 64 112M64 16C90 36 90 92 64 112" } },
        ],
    },

    // ----------------------------------------------------------------
    // 2. 반려동물 / 자연 (09 ~ 15)
    // ----------------------------------------------------------------
    "icon-09": {
        category: "반려동물",
        shapes: [
            { type: "path", props: { d: "M64 53.3c-13.3 0-24 10.7-24 24 0 10.7 8 18.7 24 29.3 16-10.7 24-18.7 24-29.3 0-13.3-10.7-24-24-24z" } },
            { type: "circle", props: { cx: 36, cy: 40, r: 8.5 } },
            { type: "circle", props: { cx: 56, cy: 29, r: 8.5 } },
            { type: "circle", props: { cx: 72, cy: 29, r: 8.5 } },
            { type: "circle", props: { cx: 92, cy: 40, r: 8.5 } },
        ],
    },
    "icon-10": {
        category: "반려동물",
        shapes: [
            { type: "path", props: { d: "M53.3 26.7C37.3 26.7 24 40 24 56c0 37.3 40 56 40 56s40-18.7 40-56c0-16-13.3-29.3-29.3-29.3-9.6 0-18.1 4.8-23.4 12.1-5.3-7.3-13.8-12.1-22-12.1z" } },
            { type: "path", props: { d: "M26.7 16l16 21.3M101.3 16L85.3 37.3" } },
        ],
    },
    "icon-11": {
        category: "자연",
        shapes: [
            { type: "path", props: { d: "M64 18C46 36 34 50 34 66a30 30 0 0 0 60 0C94 50 82 36 64 18z" } },
            { type: "path", props: { d: "M64 84v28M48 112h32" } },
        ],
    },
    "icon-12": {
        category: "자연",
        shapes: [
            { type: "path", props: { d: "M64 16v96M64 16C40 40 24 64 24 88a40 40 0 0 0 80 0c0-24-16-48-40-72z" } },
        ],
    },
    "icon-13": {
        category: "자연",
        shapes: [
            { type: "path", props: { d: "M88 18A48 48 0 1 0 110 88A40 40 0 0 1 88 18z" } },
        ],
    },
    "icon-14": {
        category: "자연",
        shapes: [
            { type: "circle", props: { cx: 64, cy: 64, r: 26.7 } },
            { type: "line", props: { x1: 64, y1: 10.7, x2: 64, y2: 26.7 } },
            { type: "line", props: { x1: 64, y1: 101.3, x2: 64, y2: 117.3 } },
            { type: "line", props: { x1: 10.7, y1: 64, x2: 26.7, y2: 64 } },
            { type: "line", props: { x1: 101.3, y1: 64, x2: 117.3, y2: 64 } },
            { type: "line", props: { x1: 26.3, y1: 26.3, x2: 37.6, y2: 37.6 } },
            { type: "line", props: { x1: 90.4, y1: 90.4, x2: 101.7, y2: 101.7 } },
            { type: "line", props: { x1: 26.3, y1: 101.7, x2: 37.6, y2: 90.4 } },
            { type: "line", props: { x1: 90.4, y1: 37.6, x2: 101.7, y2: 26.3 } },
        ],
    },
    "icon-15": {
        category: "자연",
        shapes: [
            { type: "path", props: { d: "M93.3 85.3a26.7 26.7 0 0 0-46.9-19.2A37.3 37.3 0 0 0 21.3 85.3a26.7 26.7 0 0 0 5.3 53.3h66.7a26.7 26.7 0 0 0 0-53.3z" } },
        ],
    },

    // ----------------------------------------------------------------
    // 3. 가계부 / 금융 / 쇼핑 (16 ~ 22)
    // ----------------------------------------------------------------
    "icon-16": {
        category: "가계부",
        shapes: [
            { type: "rect", props: { x: 10.7, y: 37.3, width: 106.7, height: 69.3, rx: 10.7, ry: 10.7 } },
            { type: "path", props: { d: "M85.3 74.7a5.3 5.3 0 1 0 0-10.7 5.3 5.3 0 0 0 0 10.7z" } },
            { type: "path", props: { d: "M21.3 37.3V26.7a10.7 10.7 0 0 1 10.7-10.7h64" } },
        ],
    },
    "icon-17": {
        category: "가계부",
        shapes: [
            { type: "path", props: { d: "M32 32h64l10.7 32H21.3L32 32z" } },
            { type: "path", props: { d: "M21.3 64v42.7a10.7 10.7 0 0 0 10.7 10.7h64a10.7 10.7 0 0 0 10.7-10.7V64" } },
            { type: "line", props: { x1: 48, y1: 64, x2: 48, y2: 117.3 } },
            { type: "line", props: { x1: 80, y1: 64, x2: 80, y2: 117.3 } },
        ],
    },
    "icon-18": {
        category: "가계부",
        shapes: [
            { type: "path", props: { d: "M32 32l-10.7 85.3h85.3L96 32H32z" } },
            { type: "path", props: { d: "M42.7 48A21.3 21.3 0 0 1 85.3 48" } },
        ],
    },
    "icon-19": {
        category: "가계부",
        shapes: [
            { type: "circle", props: { cx: 64, cy: 64, r: 48 } },
            { type: "path", props: { d: "M64 30v68M82 44H56a12 12 0 0 0 0 24h16a12 12 0 0 1 0 24H46" } },
        ],
    },
    "icon-20": {
        category: "가계부",
        shapes: [
            { type: "line", props: { x1: 96, y1: 96, x2: 32, y2: 96 } },
            { type: "line", props: { x1: 96, y1: 32, x2: 96, y2: 96 } },
            { type: "polyline", props: { points: "32 80 58.7 53.3 74.7 69.3 106.7 37.3" } },
        ],
    },
    "icon-21": {
        category: "가계부",
        shapes: [
            { type: "rect", props: { x: 16, y: 26.7, width: 96, height: 74.7, rx: 10.7, ry: 10.7 } },
            { type: "line", props: { x1: 16, y1: 48, x2: 112, y2: 48 } },
        ],
    },
    "icon-22": {
        category: "가계부",
        shapes: [
            { type: "path", props: { d: "M101.3 37.3H26.7A10.7 10.7 0 0 0 16 48v53.3A10.7 10.7 0 0 0 26.7 112h74.7a10.7 10.7 0 0 0 10.7-10.7V48a10.7 10.7 0 0 0-10.7-10.7z" } },
            { type: "path", props: { d: "M85.3 37.3V26.7a21.3 21.3 0 0 0-42.7 0v10.6" } },
        ],
    },

    // ----------------------------------------------------------------
    // 4. 운동 / 취미 / 예술 (23 ~ 30)
    // ----------------------------------------------------------------
    "icon-23": {
        category: "운동",
        shapes: [
            { type: "circle", props: { cx: 64, cy: 64, r: 48 } },
            { type: "path", props: { d: "M34.1 23.5a48 48 0 0 1 0 81" } },
            { type: "path", props: { d: "M93.9 23.5a48 48 0 0 0 0 81" } },
        ],
    },
    "icon-24": {
        category: "운동",
        shapes: [
            { type: "line", props: { x1: 24, y1: 64, x2: 104, y2: 64 } },
            { type: "rect", props: { x: 24, y: 42, width: 12, height: 44, rx: 4, ry: 4 } },
            { type: "rect", props: { x: 92, y: 42, width: 12, height: 44, rx: 4, ry: 4 } },
            { type: "rect", props: { x: 12, y: 48, width: 12, height: 32, rx: 4, ry: 4 } },
            { type: "rect", props: { x: 104, y: 48, width: 12, height: 32, rx: 4, ry: 4 } },
        ],
    },
    "icon-25": {
        category: "운동",
        shapes: [
            { type: "path", props: { d: "M32 96l16-48 24 16 24-32" } },
            { type: "circle", props: { cx: 96, cy: 32, r: 10.7 } },
        ],
    },
    "icon-26": {
        category: "취미",
        shapes: [
            { type: "path", props: { d: "M32 32h64a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H32A16 16 0 0 1 16 80V48a16 16 0 0 1 16-16z" } },
            { type: "line", props: { x1: 37.3, y1: 64, x2: 58.7, y2: 64 } },
            { type: "line", props: { x1: 48, y1: 53.3, x2: 48, y2: 74.7 } },
            { type: "circle", props: { cx: 77.3, cy: 58.7, r: 4 } },
            { type: "circle", props: { cx: 88, cy: 69.3, r: 4 } },
        ],
    },
    "icon-27": {
        category: "취미",
        shapes: [
            { type: "path", props: { d: "M48 96V32l48-10.7v64" } },
            { type: "circle", props: { cx: 32, cy: 96, r: 16 } },
            { type: "circle", props: { cx: 80, cy: 85.3, r: 16 } },
        ],
    },
    "icon-28": {
        category: "취미",
        shapes: [
            { type: "path", props: { d: "M96 21.3L106.7 32 42.7 96H32V85.3L96 21.3z" } },
        ],
    },
    "icon-29": {
        category: "취미",
        shapes: [
            { type: "path", props: { d: "M101.3 26.7H26.7A10.7 10.7 0 0 0 16 37.3v53.3A10.7 10.7 0 0 0 26.7 101.3h74.7a10.7 10.7 0 0 0 10.7-10.7V37.3a10.7 10.7 0 0 0-10.7-10.6z" } },
            { type: "circle", props: { cx: 64, cy: 64, r: 21.3 } },
            { type: "circle", props: { cx: 90.7, cy: 42.7, r: 5.3 } },
        ],
    },
    "icon-30": {
        category: "취미",
        shapes: [
            { type: "path", props: { d: "M21.3 32h85.3v64H21.3z" } },
            { type: "path", props: { d: "M21.3 48l42.7 32 42.7-32" } },
        ],
    },

    // ----------------------------------------------------------------
    // 5. 음식 / 음료 / 여행 (31 ~ 38)
    // ----------------------------------------------------------------
    "icon-31": {
        category: "음식",
        shapes: [
            { type: "path", props: { d: "M96 42.7v53.3a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V42.7" } },
            { type: "path", props: { d: "M21.3 42.7h85.3" } },
            { type: "path", props: { d: "M53.3 16h21.3v26.7H53.3z" } },
        ],
    },
    "icon-32": {
        category: "음식",
        shapes: [
            { type: "path", props: { d: "M26.7 42.7L64 21.3l37.3 21.4V96a10.7 10.7 0 0 1-10.7 10.7H37.3A10.7 10.7 0 0 1 26.7 96V42.7z" } },
            { type: "circle", props: { cx: 64, cy: 69.3, r: 16 } },
        ],
    },
    "icon-33": {
        category: "음료",
        shapes: [
            { type: "path", props: { d: "M42.7 21.3v42.7A21.3 21.3 0 0 0 64 85.3a21.3 21.3 0 0 0 21.3-21.3V21.3" } },
            { type: "line", props: { x1: 64, y1: 85.3, x2: 64, y2: 112 } },
            { type: "line", props: { x1: 42.7, y1: 112, x2: 85.3, y2: 112 } },
        ],
    },
    "icon-34": {
        category: "음식",
        shapes: [
            { type: "path", props: { d: "M32 42.7L64 16l32 26.7v53.3a10.7 10.7 0 0 1-10.7 10.7H37.3A10.7 10.7 0 0 1 32 96V42.7z" } },
            { type: "path", props: { d: "M48 106.7V64h32v42.7" } },
        ],
    },
    "icon-35": {
        category: "여행",
        shapes: [
            { type: "path", props: { d: "M95.6 28.4a8 8 0 0 0-11.3 0L16 96v16h16l67.6-67.6a8 8 0 0 0 0-11.3z" } },
            { type: "path", props: { d: "M58.7 32l37.3 37.3" } },
        ],
    },
    "icon-36": {
        category: "여행",
        shapes: [
            { type: "path", props: { d: "M95.8 45.4L64 16 32.2 45.4A8 8 0 0 0 32 56.6l32 39.4 32-39.4a8 8 0 0 0-.2-11.2z" } },
        ],
    },
    "icon-37": {
        category: "여행",
        shapes: [
            { type: "rect", props: { x: 32, y: 37.3, width: 64, height: 69.3, rx: 10.7, ry: 10.7 } },
            { type: "path", props: { d: "M48 37.3V26.7a16 16 0 0 1 32 0v10.6" } },
            { type: "line", props: { x1: 32, y1: 58.7, x2: 96, y2: 58.7 } },
        ],
    },
    "icon-38": {
        category: "여행",
        shapes: [
            { type: "path", props: { d: "M64 18 77.5 45.5 108 50l-22 21.5 5.2 30.5L64 87.5 36.8 102l5.2-30.5L20 50l30.5-4.5L64 18z" } },
        ],
    },

    // ----------------------------------------------------------------
    // 6. IT / 도구 / 스페셜 (39 ~ 45)
    // ----------------------------------------------------------------
    "icon-39": {
        category: "도구",
        shapes: [
            { type: "path", props: { d: "M78.4 23.5a24 24 0 0 0-33.9 0L16 52.1v23.8h23.8l28.6-28.6a24 24 0 0 0 0-33.8z" } },
            { type: "line", props: { x1: 72, y1: 56, x2: 104, y2: 88 } },
            { type: "line", props: { x1: 88, y1: 72, x2: 112, y2: 96 } },
        ],
    },
    "icon-40": {
        category: "도구",
        shapes: [
            { type: "path", props: { d: "M64 16a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 74.7a26.7 26.7 0 1 1 26.7-26.7A26.7 26.7 0 0 1 64 90.7z" } },
        ],
    },
    "icon-41": {
        category: "IT",
        shapes: [
            { type: "rect", props: { x: 26.7, y: 16, width: 74.7, height: 96, rx: 10.7, ry: 10.7 } },
            { type: "line", props: { x1: 58.7, y1: 96, x2: 69.3, y2: 96 } },
        ],
    },
    "icon-42": {
        category: "IT",
        shapes: [
            { type: "rect", props: { x: 16, y: 24, width: 96, height: 64, rx: 8, ry: 8 } },
            { type: "line", props: { x1: 42.7, y1: 104, x2: 85.3, y2: 104 } },
            { type: "line", props: { x1: 64, y1: 88, x2: 64, y2: 104 } },
        ],
    },
    "icon-43": {
        category: "스페셜",
        shapes: [
            { type: "path", props: { d: "M32 64l21.3-42.7L74.7 64 96 21.3 112 106.7H16L32 64z" } },
            { type: "circle", props: { cx: 21.3, cy: 21.3, r: 5.3 } },
            { type: "circle", props: { cx: 64, cy: 16, r: 5.3 } },
            { type: "circle", props: { cx: 106.7, cy: 21.3, r: 5.3 } },
        ],
    },
    "icon-44": {
        category: "스페셜",
        shapes: [
            { type: "path", props: { d: "M64 16L16 42.7l48 26.7 48-26.7L64 16z" } },
            { type: "path", props: { d: "M16 64l48 26.7 48-26.7" } },
            { type: "path", props: { d: "M16 85.3l48 26.7 48-26.7" } },
        ],
    },
    "icon-45": {
        category: "스페셜",
        shapes: [
            { type: "path", props: { d: "M64 16v28M64 84v28M16 64h28M84 64h28" } },
            { type: "circle", props: { cx: 64, cy: 64, r: 16 } },
        ],
    },
    // ----------------------------------------------------------------
    // 7. 커뮤니티 / 스페셜 (46 ~ 60)
    // ----------------------------------------------------------------
    "icon-46": {
        category: "스페셜",
        shapes: [
            { type: "path", props: { d: "M32 24h64v20a32 32 0 0 1-64 0V24z" } },
            { type: "path", props: { d: "M32 32H20v12a20 20 0 0 0 20 20" } },
            { type: "path", props: { d: "M96 32h12v12a20 20 0 0 1-20 20" } },
            { type: "path", props: { d: "M64 76v20M44 108h40M48 96h32" } },
        ],
    },
    "icon-47": {
        category: "스페셜",
        shapes: [
            { type: "path", props: { d: "M64 12 108 30v30c0 28-18 45-44 56C38 105 20 88 20 60V30L64 12z" } },
            { type: "path", props: { d: "m42 63 15 15 30-32" } },
        ],
    },
    "icon-48": {
        category: "여행",
        shapes: [
            { type: "path", props: { d: "M72 12 28 72h30l-4 44 46-64H70l2-40z" } },
        ],
    },
    "icon-49": {
        category: "취미",
        shapes: [
            { type: "path", props: { d: "M64 16c-4 24-28 32-28 60a28 28 0 0 0 56 0c0-12-6-21-14-30 1 15-6 22-12 24 4-23-2-38-2-54z" } },
        ],
    },
    "icon-50": {
        category: "일반",
        shapes: [
            { type: "path", props: { d: "M16 56 28 32l20 12 16-24 16 24 20-12 12 24-12 48H28L16 56z" } },
            { type: "line", props: { x1: 31, y1: 78, x2: 97, y2: 78 } },
        ],
    },
    "icon-51": {
        category: "일반",
        shapes: [
            { type: "path", props: { d: "M20 24h88v64H64l-24 20V88H20V24z" } },
            { type: "circle", props: { cx: 44, cy: 56, r: 4 } },
            { type: "circle", props: { cx: 64, cy: 56, r: 4 } },
            { type: "circle", props: { cx: 84, cy: 56, r: 4 } },
        ],
    },
    "icon-52": {
        category: "IT",
        shapes: [
            { type: "rect", props: { x: 24, y: 12, width: 80, height: 104, rx: 12, ry: 12 } },
            { type: "line", props: { x1: 44, y1: 28, x2: 84, y2: 28 } },
            { type: "circle", props: { cx: 64, cy: 100, r: 5 } },
        ],
    },
    "icon-53": {
        category: "일반",
        shapes: [
            { type: "path", props: { d: "M64 16a32 32 0 0 0-32 32v16L20 84v8h88v-8L96 64V48a32 32 0 0 0-32-32z" } },
            { type: "path", props: { d: "M48 100a16 16 0 0 0 32 0" } },
        ],
    },
    "icon-54": {
        category: "IT",
        shapes: [
            { type: "rect", props: { x: 24, y: 52, width: 80, height: 60, rx: 10, ry: 10 } },
            { type: "path", props: { d: "M40 52V36a24 24 0 0 1 48 0v16" } },
            { type: "circle", props: { cx: 64, cy: 78, r: 6 } },
            { type: "line", props: { x1: 64, y1: 84, x2: 64, y2: 96 } },
        ],
    },
    "icon-55": {
        category: "자연",
        shapes: [
            { type: "path", props: { d: "M104 24C56 24 24 44 24 76a28 28 0 0 0 28 28c32 0 52-32 52-80z" } },
            { type: "path", props: { d: "M24 104c16-24 36-40 64-56" } },
        ],
    },
    "icon-56": {
        category: "일반",
        shapes: [
            { type: "path", props: { d: "M64 16 78 44l31 5-22 22 5 31-28-15-28 15 5-31-22-22 31-5 14-28z" } },
            { type: "circle", props: { cx: 64, cy: 64, r: 10 } },
        ],
    },
    "icon-57": {
        category: "여행",
        shapes: [
            { type: "path", props: { d: "M64 16 75 44l28 11-28 11-11 28-11-28-28-11 28-11 11-28z" } },
            { type: "path", props: { d: "M94 82l5 13 13 5-13 5-5 13-5-13-13-5 13-5 5-13z" } },
        ],
    },
    "icon-58": {
        category: "취미",
        shapes: [
            { type: "path", props: { d: "M28 20h24a12 12 0 0 1 24 0h24v24h-8a12 12 0 1 0 0 24h8v24H76v-8a12 12 0 1 0-24 0v8H28V68h-8a12 12 0 1 1 0-24h8V20z" } },
        ],
    },
    "icon-59": {
        category: "IT",
        shapes: [
            { type: "rect", props: { x: 20, y: 28, width: 88, height: 72, rx: 4, ry: 4 } },
            { type: "path", props: { d: "m20 36 44 34 44-34" } },
        ],
    },
    "icon-60": {
        category: "여행",
        shapes: [
            { type: "circle", props: { cx: 64, cy: 64, r: 48 } },
            { type: "path", props: { d: "M16 64h96M64 16C38 36 38 92 64 112M64 16C90 36 90 92 64 112" } },
            { type: "path", props: { d: "M24 40C48 48 80 48 104 40M24 88C48 80 80 80 104 88" } },
        ],
    },
} satisfies Record<string, IconPreset>;

export type IconId = keyof typeof ICON_PRESETS;
export const ICON_IDS = Object.keys(ICON_PRESETS) as IconId[];

export const getRandomIconId = () => {
    const iconIdSize = ICON_IDS.length;
    return ICON_IDS[Math.floor(Math.random() * iconIdSize)];
};