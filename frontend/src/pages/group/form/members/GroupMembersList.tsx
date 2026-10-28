import Button from "@/components/Button";
import Container from "@/components/Container";
import Image from "@/components/Image";
import { BUTTON_COLOR } from "@/domains/button/buttonType";

import styles from "./GroupMembersList.module.css";

import defaultUserProfile from "@/assets/user/default_profile.png";

const GroupMembersList = () => {
    return (
        <div
            className={ styles.groupMembersListWrap }
        >
            <Container
                className={ styles.container }
            >
                <UserCards />
            </Container>
        </div>
    );
};

const UserCards = () => {
    return (
        <ul>
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
        </ul>
    );
};

const UserCard = () => {
    return (
        <li
            className={ styles.userCardWrap }
        >
            <div
                className={ styles.userInfoWrap }
            >
                <Image 
                    src={ defaultUserProfile }
                    alt={ `${2}` }
                    className={ styles.userProfileImage }
                />
                <div
                    className={ styles.userInfo }
                >
                    <span
                        className={ styles.user_nickname  }
                    >
                        tester
                    </span>
                    <div
                        className={ styles.userBadges }
                    >
                        <span className={ `${styles.badge} ${styles.memberType}` }>
                            그룹 관리자
                        </span>
                        <span className={ `${styles.badge} ${styles.memberStatus}` }>
                            활동 중
                        </span>
                    </div>
                </div>
            </div>
            <div className={ styles.userActions }>
                <Button
                    eventName="GROUP_MEMBERS_USER_MODIFY"
                    aria-label="tester 멤버 정보 수정"
                    onClick={ () => {} }
                    disabled={ true }
                    color={ BUTTON_COLOR.BLUE }
                >
                    수정
                </Button>

                <Button
                    eventName="GROUP_MEMBERS_USER_MODIFY"
                    aria-label="tester 멤버 정보 수정"
                    onClick={ () => {} }
                    disabled={ true }
                    color={ BUTTON_COLOR.BLUE }
                >
                    수정
                </Button>
            </div>
        </li>
    );
};

export default GroupMembersList;