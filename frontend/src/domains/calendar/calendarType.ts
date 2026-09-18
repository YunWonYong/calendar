import type { Month_1_To_12 } from "../lib/date";

export type CalendarMonth = {
    year: number;
    yearText: string;
    month: Month_1_To_12;
    monthText: string;
};

export type CalendarDate = {
    date: number;
    dateText: string;
    dayIndex: number;
    dayOfWeek: string;
    isCurrentMonth: boolean; // 현재 달과 다른 달의 날짜가 포함될 수 있음.
} & CalendarMonth;

export type CalendarCurrentDate = {
    today: string;
    weeks: CalendarWeek[];
} & CalendarMonth;

export type CalendarWeek = {
    weekNo: number; // 현재 달력에서의 주차
    dateList: CalendarDate[]; // size 7
};

export const MIN_CALENDAR_DATE_LIST_SIZE = 28;
export const MAX_CALENDAR_DATE_LIST_SIZE = 42;
export const MAX_CALENDAR_WEEK_NO = 6; // 6주


export const CalendarEventMainTypes = {
    MISSION: "mission",
    SCHEDULE: "schedule",
    TRANSACTION: "transaction"
} as const;
export type CalendarEventMainType = typeof CalendarEventMainTypes[keyof typeof CalendarEventMainTypes];

export const CalendarMissionEventTypes = {
    PENDING: "pending",
    START: "start",
    END: "end",
} as const;
export type CalendarMissionEventType = typeof CalendarMissionEventTypes[keyof typeof CalendarMissionEventTypes];

export const CalendarMissionStatusTypes = {
    PENDING: "pending",
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed",
    FAILED: "failed",
    CANCELLED: "cancelled",
} as const;
export type CalendarMissionStatusType = typeof CalendarMissionStatusTypes[keyof typeof CalendarMissionStatusTypes];

export type MissionId = string;

export const CalendarMissionRewardConditionTypes = {
    COMPLETED: "completed",
    CLEAR: "clear",
    PARENT: "parent",
} as const;

export type CalendarMissionRewardConditionType = typeof CalendarMissionRewardConditionTypes[keyof typeof CalendarMissionRewardConditionTypes];

export const CalendarMissionRewardKinds = {
    POINT: "point",
    TICKET: "ticket",
} as const;

export type CalendarMissionData = {
    missionId: MissionId;
    parentMissionId: MissionId | null;
    title: string; // 제목
    description: string; // 상세 내용
    // UI에서 "pending" | "in_progress" | "completed" 이 상태에 따라 보여지는게 달라짐.
    status: CalendarMissionStatusType; 
    isRewardClaimed: boolean;
};

type CalendarMissionReward =
    {
        kind: "point";
        amount: number;
    } |
    {
        kind: "ticket";
        ticketId: string;
        quantity: number;
        title: string;
        description?: string;
    };

type CalendarMissionRewardData = 
    {
        rewardCondition: "clear";
        reward: CalendarMissionReward;
    } |
    {
        rewardCondition: "parent";
        reward: CalendarMissionReward;
        requiredMissionIds: MissionId[];
    };

type CalendarMissionCompletedRewardData = {
    rewardCondition: "completed";
    reward: CalendarMissionReward;
    isRewardClaimed: boolean;
    description?: string;
};

export type CalendarMissionParticipantUser = {
    participantUserId: number;
    participantNickname: string;
    joinedDate: string;
    missions: CalendarMissionData[];  // 정렬은 server에서 해줌.
    missionInfo: Record<MissionId, CalendarMissionData>;
    // 참가자가 모두 미션을 클리어했을 때 받을 수 있는 보상.
    participantCompletedReward: CalendarMissionCompletedRewardData| null;
};

export type CalendarMissionEventInfoType = {
    type: "mission",
    eventType: CalendarMissionEventType,
    title: string;
    missionEventId: string;
    participantCount: number; // 참가자 수
    maxParticipantCount: number; // 최대 참가자 수
    creatorId: number;
    creatorNickname: string; // 미션 생성자.
    createdDate: string; // 미션 생성 날짜.
    updatedDate: string; // 미션 수정 날짜. (eventType이 pending일 때만 수정 가능.)
    startDate: string;
    endDate: string;
    participants: CalendarMissionParticipantUser[]; // 정렬은 server에서 해줌.
    rewards: Record<MissionId, CalendarMissionRewardData>;
    // 참가자들이 모두 미션을 클리어했을 때 받을 수 있는 보상.
    allParticipantsCompletedReward: CalendarMissionCompletedRewardData | null;
};

export const CalendarScheduleEventTypes = {
    APPOINTMENT: "appointment", // 약속 일정.
    MEETING: "meeting", // 회의
    GATHERING: "gathering", // 만남 (벙 같은 느낌.)
    PRESENTATION: "presentation", // 발표
    TRAVEL: "travel", // 다른 사람들과 같이 여행하는 느낌.
    VACATION: "vacation", // 나혼자만의 스케쥴.
} as const;
export type CalendarScheduleEventType = typeof CalendarScheduleEventTypes[keyof typeof CalendarScheduleEventTypes];
export const CalendarScheduleEventStatusTypes = {
    PENDING: "pending",
    IN_PROGRESS: "in_progress",
    CANCELLED: "cancelled",
} as const;
export type CalendarScheduleEventStatusType = typeof CalendarScheduleEventStatusTypes[keyof typeof CalendarScheduleEventStatusTypes];

export type CalendarScheduleParticipantAmountInfo =
    {
        kind: "point" | "money";
        amount: number;
    } |
    {
        kind: "ticket";
        ticketId: string;
        quantity: number;
        title: string;
        description?: string;
    };

export type CalendarScheduleEventMapInfo = {
    placeName: string;
    address?: string;
    latitude: number;
    longitude: number;
    placeId?: string;
};

export type CalendarScheduleDetailTimeData = {
    start?: {
        hours: number;
        minutes: number;
    },
    end?: {
        hours: number;
        minutes: number;
    }
};

export type CalendarScheduleDetailData = {
    times?: CalendarScheduleDetailTimeData;
} & (
    {
        type: "note"
        content: string;
    } |
    {
        type: "map";
        info: CalendarScheduleEventMapInfo;
    }
);

export type CalendarScheduleEventInfoType = {
    type: "schedule";
    scheduleId: string;
    scheduleType: CalendarScheduleEventType;
    scheduleStatus: CalendarScheduleEventStatusType;
    title: string;
    description?: string;
    creatorId: number;
    creatorNickname: string; // 스케쥴 생성자 닉네임.
    createdDate: string;
    updatedDate: string;
    startDate: string;
    endDate: string;
    participantCount: number;
    maxParticipantCount?: number;
    participants: {
        participantUserId: number;
        participantNickname: string;
        joinedDate: string;
        // 참가비용이 있는 경우 주체자가 참가자의 참가비용을 확인했을 때 true임.
        isParticipantAmountConfirmed?: boolean;
    }[];
    // 스케쥴 참가 비용. 있을 수도 없을 수도 있음.
    participantAmountInfo?: CalendarScheduleParticipantAmountInfo; 
    // 지도 기능을 추가할까함. naver 또는 google할건데 아마 해외 여행에 대한 스케쥴도 할 수 있으니 google로 할것 같음. 
    details?: CalendarScheduleDetailData[]; 
};

export const CalendarTransactionEventTypes = {
    INCOME: "income", // 입금 (동아리비 또는 월급, 기부 같은 느낌.)
    EXPENSE: "expense", // 지출 (데이트 비용, 동아리 활동비 같은 느낌.)
    TRANSFER: "transfer", // 계좌이체
} as const;
export type CalendarTransactionEventType = typeof CalendarTransactionEventTypes[keyof typeof CalendarTransactionEventTypes];

export type CalendarTransactionEventTargetType = 
    {
        type: "user";
        userId: number;
        userNickname: string;
    }|
    {
        type: "normal";
        name: string;
    }|
    {
        type: "group";
    };

export type CalendarTransactionEventAmountInfo =
    {
        kind: "point" | "money";
        amount: number;
    } |
    {
        kind: "ticket";
        ticketId: string;
        quantity: number;
        title: string;
    };

export type CalendarTransactionEventInfoType = {
    type: "transaction";
    transactionId: string;
    transactionType: CalendarTransactionEventType;
    from: CalendarTransactionEventTargetType;
    to: CalendarTransactionEventTargetType;
    amounts: CalendarTransactionEventAmountInfo[];
};

export type CalendarEventCounts = Record<string, CalendarEventCount>;
export type CalendarEventCount = Record<CalendarEventMainType, number>;