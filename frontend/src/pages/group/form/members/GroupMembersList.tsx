import type { FC } from "react";
import { memo } from "react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Image from "@/components/Image";
import { BUTTON_COLOR } from "@/domains/button/buttonType";
import { GROUP_MEMBER_MANIPULATION_TYPES } from "@/domains/group/member";
import useGroupMembersForm from "@/hooks/group/form/member/UseGroupMembersForm";

import styles from "./GroupMembersList.module.css";

import defaultUserProfile from "@/assets/user/default_profile.png";

import type { GroupMemberFormDataType } from "@/domains/group/form";
import type { GroupMemberType } from "@/domains/group/member";

const GroupMembersList = () => {
    const { formData, modifyMember, removeMember } = useGroupMembersForm();
    return (
        <div
            className={ styles.groupMembersListWrap }
        >
            <Container
                className={ styles.container }
            >
                <UserCards 
                    members={ formData.members }
                    modifyMember={ modifyMember }
                    removeMember={ removeMember }
                />
            </Container>
        </div>
    );
};

type MemberCardsProps = {
    members: GroupMemberFormDataType[];
    modifyMember: (member: GroupMemberType) => void;
    removeMember: (userId: number) => void;
};

const UserCards: FC<MemberCardsProps> = ({ members, modifyMember, removeMember }) => {
    return (
        <ul>
            {
                members && members.length > 0 && members.map((member) => {
                    return (
                        <UserCard 
                            key={ member.id }
                            member={ member }
                            modifyMember={ modifyMember }
                            removeMember={() => {
                                if (member.manipulationType === GROUP_MEMBER_MANIPULATION_TYPES.REMOVE) {
                                    return;
                                }

                                removeMember(member.id)
                            }}
                        />
                    );
                })
            }
            {
                (!members || members.length === 0) &&
                    <li>

                    </li>
            }
        </ul>
    );
};

type MemberCardProps = {
    member: GroupMemberFormDataType;
    modifyMember: (member: GroupMemberType) => void;
    removeMember: () => void;
};

const UserCard: FC<MemberCardProps> = memo(({ member, removeMember }) => {
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
                            {
                                member.type
                            }
                        </span>
                        <span className={ `${styles.badge} ${styles.memberStatus}` }>
                            {
                                member.status
                            }
                        </span>
                    </div>
                </div>
            </div>
            <div className={ styles.userActions }>
                <Button
                    eventName="GROUP_MEMBER_REMOVE"
                    aria-label="tester 멤버 정보 수정"
                    onClick={ removeMember }
                    disabled={ member.manipulationType === GROUP_MEMBER_MANIPULATION_TYPES.REMOVE }
                    color={ BUTTON_COLOR.RED }
                >
                    삭제
                </Button>
            </div>
        </li>
    );
});

export default GroupMembersList;