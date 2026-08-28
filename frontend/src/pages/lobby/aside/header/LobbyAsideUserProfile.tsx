import Link from "@/components/link";
import logoImage from "@/assets/logo/logo.png";
import useAuth from "@/hooks/auth/useAuth";

import styles from "./LobbyAsideUserProfile.module.css";

import type { LobbyAsideState } from "../../LobbyTypes";

const LobbyAsideUserProfile = ({ asideState }: { asideState: LobbyAsideState; }) => {
    const { userInfo } = useAuth();
    return (
        <div>   
        </div>
    );
};
export default LobbyAsideUserProfile;