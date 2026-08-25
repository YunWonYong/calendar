import { useMemo } from "react";

import { createDeviceInfo } from "@/lib/device/device";

import type { DeviceInfo } from "@/domains/device/deviceTypes";

const useDevice = () => {
    return useMemo<DeviceInfo>(createDeviceInfo, []);
};

export default useDevice;