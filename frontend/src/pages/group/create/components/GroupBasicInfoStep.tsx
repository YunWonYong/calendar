import { FC } from "react";

import { TextInput } from "@/components/form/TextInput";

import styles from "./GroupBasicInfoStep.module.css";

import type { GroupBasicInfoStepProps } from "@/domains/group/groupCreate";


const GroupBasicInfoStep: FC<GroupBasicInfoStepProps> = ({  fullNameEditInfo, shortNameEditInfo, selectedLimitLevel, limitInfo }) => {
    return (
        <section>
            <TextInput 
                id="groupFullName"
                label="그룹 이름 (Full Name)"
                placeholder="예: 러닝을 사랑하는 모임"
                value={ fullNameEditInfo.value }
                onChange={(e) => fullNameEditInfo.onChange(e.target.value)}
                errorMessage={ fullNameEditInfo.errorMessage }
            />
            <TextInput
                id="groupShortName"
                label="그룹 닉네임 (Short Name)"
                placeholder="예: 러너스"
                value={ shortNameEditInfo.value }
                onChange={(e) => shortNameEditInfo.onChange(e.target.value)}
                errorMessage={ shortNameEditInfo.errorMessage }
            />

            <div className={styles.fieldGroup}>
                <div className={styles.labelWithTooltip}>
                    <label>그룹 참가 인원</label>
                    <div className={styles.tooltipIcon}>
                        i
                        <span className={styles.tooltipText}>
                            30명 이상은 프리미엄 구독 멤버십 이용 시 활성화됩니다.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GroupBasicInfoStep;