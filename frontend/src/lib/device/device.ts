import { getDeviceIdFromLocalStorage, setDeviceIdFromLocalStorage } from "@/localStorage/api";

import type { Browser, DeviceInfo, DeviceType, OS } from "@/domains/device/deviceTypes";

export const createDeviceInfo = (): DeviceInfo => {
    const { userAgent, language, platform } = navigator;
    return {
        deviceId: getOrCreateDeviceId(),
        deviceType: getDeviceType(userAgent),
        os: getOs(userAgent),
        browser: getBrowser(userAgent),
        language,
        platform,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        userAgent,
    };
};

function generateUUID(): string {
    // 브라우저가 crypto.randomUUID를 지원하는 Secure Context인 경우
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    
    // IP 접속 등 HTTP 환경(비보안 컨텍스트)을 위한 대체(Fallback) 로직
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const getOrCreateDeviceId = (): string => {
    let deviceId = getDeviceIdFromLocalStorage();

    if (!deviceId) {
        deviceId = generateUUID();
        setDeviceIdFromLocalStorage(deviceId);
    }

    return deviceId;
};

const getDeviceType = (userAgent: string): DeviceType => {
    if (/iPad|Tablet/i.test(userAgent)) {
        return "tablet";
    }

    if (
        /Android/i.test(userAgent) &&
        !/Mobile/i.test(userAgent)
    ) {
        return "tablet";
    }

    if (
        /Android|iPhone|iPod|Mobile/i.test(userAgent)
    ) {
        return "mobile";
    }

    return "desktop";
};

const getOs = (userAgent: string): OS => {
    if (
        userAgent.includes("iPhone") ||
        userAgent.includes("iPad")
    ) {
        return "iOS";
    }

    if (userAgent.includes("Android")) {
        return "Android";
    }

    if (userAgent.includes("Windows")) {
        return "Windows";
    }

    if (userAgent.includes("Mac")) {
        return "macOS";
    }

    if (userAgent.includes("Linux")) {
        return "Linux";
    }

    return "Unknown";
};

const getBrowser = (userAgent: string): Browser => {
    if (userAgent.includes("SamsungBrowser/")) {
        return "Samsung Internet";
    }

    if (userAgent.includes("Edg/")) {
        return "Microsoft Edge";
    }

    if (
        userAgent.includes("OPR/") ||
        userAgent.includes("Opera")
    ) {
        return "Opera";
    }

    if (userAgent.includes("Firefox/")) {
        return "Firefox";
    }

    if (
        userAgent.includes("Chrome/") &&
        !userAgent.includes("Edg/") &&
        !userAgent.includes("OPR/") &&
        !userAgent.includes("SamsungBrowser/")
    ) {
        return "Chrome";
    }

    if (
        userAgent.includes("Safari/") &&
        !userAgent.includes("Chrome/")
    ) {
        return "Safari";
    }

    return "Unknown";
};