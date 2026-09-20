import { FC } from "react";

import { trackClick } from "@/analytics/button";
import { RadioButton } from "@/components/form/RadioButton";
import { TextInput, TextInputProps } from "@/components/form/TextInput";
import { GroupLevelField, GroupNameField } from "@/domains/group/form";
import { GroupLimitLevelData, GroupLimitLevelInfo } from "@/domains/group/group";
import { USER_PLANS } from "@/domains/user/userPlan";
import { isNumberTextStrict } from "@/lib/validation/validation";

import styles from "./GroupBasicInfoStep.module.css";

import type { GroupCreateBasicProps } from "@/domains/group/create";
import type { UserPlanLevelType } from "@/domains/user/userPlan";


const GroupBasicInfoStep: FC<GroupCreateBasicProps> = ({ editForm, limitLevelInfo }) => {
    const { fullName, shortName, participantLimitLevel, subGroupManagerLimitLevel } = editForm;

    return (
        <section>
            <GroupNameEditBox
                fullName={fullName}
                shortName={shortName}
            />

            <GroupLimitRadioBox
                participantLimitLevel={participantLimitLevel}
                subGroupManagerLimitLevel={subGroupManagerLimitLevel}
                limitLevelInfo={limitLevelInfo}
            />
        </section>
    );
};


const GroupNameEditBox: FC<{
    fullName: GroupNameField;
    shortName: GroupNameField;
}> = ({ fullName, shortName }) => {
    return (
        <article className={styles.nameEditBox}>
            <GroupNameEditor
                props={{
                    id: "groupFullName",
                    label: "그룹 이름 (Full Name)",
                    placeholder: "예: 러닝을 사랑하는 모임",
                    labelClassName: styles.fieldTitle,
                    minLength: 2,
                    maxLength: 18,
                }}
                editData={fullName}
                descriptionText="최소 2글자 최대 18글자 입력해주세요."
            />

            <GroupNameEditor
                props={{
                    id: "groupShortName",
                    label: "그룹 닉네임 (Short Name)",
                    placeholder: "예: 러너스",
                    labelClassName: styles.fieldTitle,
                    minLength: 2,
                    maxLength: 6,
                }}
                editData={shortName}
                descriptionText="최소 2글자 최대 6글자 입력해주세요."
            />
        </article>
    );
};


type GroupNameEditorProps = {
    props: TextInputProps;
    editData: GroupNameField;
    descriptionText: string;
};


const GroupNameEditor: FC<GroupNameEditorProps> = ({
    props,
    editData,
    descriptionText,
}) => {
    const { value, onChange, errorMessage } = editData;
    const isError = errorMessage.length > 0;

    return (
        <div className={styles.nameField}>
            <TextInput
                {...props}
                containerClassName={styles.inputContainer}
                className={styles.input}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            <span
                className={styles.helperText}
                data-is-error={isError}
            >
                {isError ? errorMessage : descriptionText}
            </span>
        </div>
    );
};


type GroupLimitRadioBoxProps = {
    participantLimitLevel: GroupLevelField;
    subGroupManagerLimitLevel: GroupLevelField;
    limitLevelInfo: GroupLimitLevelInfo;
};


const GroupLimitRadioBox: FC<GroupLimitRadioBoxProps> = ({
    participantLimitLevel,
    subGroupManagerLimitLevel,
    limitLevelInfo,
}) => {
    return (
        <article className={styles.limitRadioBox}>
            <GroupLimitRadio
                type="member"
                label="그룹 참가 인원 선택"
                field={participantLimitLevel}
                limitLevelDataList={limitLevelInfo.member}
            />

            <GroupLimitRadio
                type="subManager"
                label="부그룹장 인원 선택"
                field={subGroupManagerLimitLevel}
                limitLevelDataList={limitLevelInfo.subManager}
            />
        </article>
    );
};


type GroupLimitRadioProps = {
    type: "member" | "subManager";
    label: string;
    field: GroupLevelField;
    limitLevelDataList: GroupLimitLevelData[];
};


const USER_PLAN: UserPlanLevelType = USER_PLANS.PRO;


const GroupLimitRadio: FC<GroupLimitRadioProps> = ({
    type,
    label,
    field,
    limitLevelDataList,
}) => {
    return (
        <div className={styles.limitRadio}>
            <h3 className={styles.fieldTitle}>
                {label}
            </h3>

            <div className={styles.radioOptionList}>
                {limitLevelDataList.map((limitLevelData) => {
                    const { limitLevel, count } = limitLevelData;

                    const isSelected = field.selectedLevel === limitLevel;
                    const isDisabled = limitLevel > USER_PLAN;

                    return (
                        <div
                            key={`${type}#${limitLevel}`}
                            className={styles.radioOption}
                        >
                            <RadioButton
                                name={type}
                                id={`${type}#${limitLevel}`}
                                value={limitLevel.toString()}
                                checked={isSelected}
                                disabled={isDisabled}
                                label={`${count}명`}
                                labelClassName={styles.radioLabel}
                                containerClassName={styles.radioButton}
                                onChange={(value) => {
                                    if (
                                        isSelected ||
                                        isDisabled ||
                                        !isNumberTextStrict(value)
                                    ) {
                                        return;
                                    }

                                    trackClick(
                                        `GROUP-CREATE-${type.toUpperCase()}#${limitLevel}`,
                                        () => {
                                            field.onSelect(limitLevel);
                                        }
                                    );
                                }}
                            />

                            {isDisabled && (
                                <span className={styles.info}>
                                    <button
                                        type="button"
                                        className={styles.infoButton}
                                        aria-label={`${count}명 옵션 안내`}
                                    >
                                        i
                                    </button>

                                    <span className={styles.tooltip}>
                                        현재 이용 중인 요금제에서는
                                        <br />
                                        선택할 수 없는 옵션입니다.
                                    </span>
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


export default GroupBasicInfoStep;