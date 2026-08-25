export type DeviceType = "desktop" | "tablet" | "mobile";

export type OS = "Windows" | "macOS" | "Android" | "iOS" | "Linux" | "Unknown";
export type Browser = "Chrome" | "Firefox" | "Safari" | "Microsoft Edge" | "Opera" | "Samsung Internet" | "Brave" | "Unknown";

export type DeviceInfo = {
    deviceId: string;
    deviceType: DeviceType;
    os: OS;
    browser: Browser;
    language: string;
    platform: string;
    timezone: string;
    userAgent: string;
};