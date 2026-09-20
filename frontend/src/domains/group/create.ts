
import type { GroupBasicForm, GroupEmblemCustomForm, GroupEmblemForm, GroupEmblemNormalForm, GroupInviteForm } from "./form";
import type { GroupLimitLevelData } from "./group";

export type GroupCreateBasicProps = {
    editForm: GroupBasicForm;
    limitList: GroupLimitLevelData[];
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