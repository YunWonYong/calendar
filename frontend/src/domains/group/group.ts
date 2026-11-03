export const GROUP_VISIBILITY_TYPE = {
    PUBLIC: "PUBLIC",
    PRIVATE: "PRIVATE",
    FRIENDS: "FRIENDS",
} as const;
export type GroupVisibilityTypes = keyof typeof GROUP_VISIBILITY_TYPE;

export const GROUP_VISIBILITY_TYPE_LIST = Object.values(GROUP_VISIBILITY_TYPE);