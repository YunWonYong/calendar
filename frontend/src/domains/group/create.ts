import { LOCALE } from "../locale/locale";

import type { LocaleType } from "../locale/locale";

import type { GroupBasicForm, GroupEmblemCustomForm, GroupEmblemForm, GroupEmblemNormalForm, GroupInviteForm } from "./form";
import type { GroupLimitLevelInfo } from "./group";

export type GroupCreateBasicProps = {
    editForm: GroupBasicForm;
    limitLevelInfo: GroupLimitLevelInfo;
};

export type GroupCreateEmblemCustomProps = {
    editForm: GroupEmblemCustomForm;
};

export type GroupCreateEmblemNormalProps = {
    editForm: GroupEmblemNormalForm;
};

export type GroupCreateEmblemProps = {
    editForm: GroupEmblemForm;
};

export type GroupCreateInviteProps = {
    editForm: GroupInviteForm;
};

export const GROUP_CREATE_HEADER_TITLES: Record<LocaleType, string> = {
    [LOCALE.KR]: "그룹 생성",
    [LOCALE.EN]: "Create Group",
    [LOCALE.JP]: "グループ作成",
    [LOCALE.ZH]: "创建群组",
};