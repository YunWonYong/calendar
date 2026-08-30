import useAuth from "@/hooks/auth/useAuth";
import Link from "@/components/link";
import Image from "@/components/Image";

import styles from "./LobbyAsideUserProfile.module.css";

import type { LobbyAsideState } from "../../LobbyTypes";

const LobbyAsideUserProfile = ({ asideState }: { asideState: LobbyAsideState; }) => {
    const { userInfo } = useAuth();
    return (
        <div
            className={ styles.wrap }
        >
            <div
                className={ styles.profileImageBox }
                data-display-type={ asideState }
            >
                {
                    asideState === "collapsed"
                        ?   <Link
                                to="/user/info"
                            >
                                <Image
                                    className={ styles.profileImage }
                                    src={ userInfo?.profileImageUrl }
                                    alt="사용자 프로필 사진"
                                />   
                            </Link>
                        :   <Image
                                className={ styles.profileImage }
                                src={ userInfo?.profileImageUrl }
                                alt="사용자 프로필 사진"
                            />   
                }
            </div>
            {
                asideState === "expanded" &&
                    <div
                        className={ styles.txtBox }
                    >
                        <span
                            className={ styles.nickname }
                        >
                            { userInfo?.nickname }
                        </span>
                        <Link
                            className={ styles.link }
                            to={ `/user/info` }
                        >
                            정보 수정
                        </Link>
                    </div>
            }
        </div>
    );
};
export default LobbyAsideUserProfile;