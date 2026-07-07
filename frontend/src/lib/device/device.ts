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

const getOrCreateDeviceId = (): string => {
    let deviceId = getDeviceIdFromLocalStorage();
    if (!deviceId) {
        deviceId = crypto.randomUUID();
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