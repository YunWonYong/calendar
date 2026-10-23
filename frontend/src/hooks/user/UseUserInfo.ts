import { isNull } from "@/lib/validation/validation";

import useAuth from "../auth/useAuth";

const useUserInfo = () => {
    const ctx = useAuth();

    if (!ctx.isLogin || isNull(ctx.userInfo)) {
        throw new Error("Unauthorized: Login is required to access user information.");
    }

    return ctx.userInfo;
};

export default useUserInfo;