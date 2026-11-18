export const GROUP_MEMBER_STATUS = {
    PENDING: "PENDING",
    INVITED: "INVITED",
    JOINED: "JOINED",
    KICKED: "KICKED",
    BANNED: "BANNED",
    READ_ONLY: "READ_ONLY",
    LEFT: "LEFT",
} as const;
export type GroupMemberStatusTypes = typeof GROUP_MEMBER_STATUS[keyof typeof GROUP_MEMBER_STATUS];

export const GROUP_MEMBER_TYPE = {
    LEADER: "LEADER",
    SUB_LEADER: "SUB_LEADER",
    NORMAL: "NORMAL",
} as const;
export type GroupMemberTypes = typeof GROUP_MEMBER_TYPE[keyof typeof GROUP_MEMBER_TYPE];

export const GROUP_MEMBER_MANIPULATION_TYPES = {
    NEW: "NEW",
    MODIFY: "MODIFY",
    REMOVE: "REMOVE",
    NONE: "NONE",
} as const;

export type GroupMemberManipulationType = typeof GROUP_MEMBER_MANIPULATION_TYPES[keyof typeof GROUP_MEMBER_MANIPULATION_TYPES];

export type GroupMemberType = {
    id: number;
    type: GroupMemberTypes;
    tag: string;
    nickname: string;
    profileImage: string;
    profileImageType: "URL" | "ID";
    status: GroupMemberStatusTypes;
};