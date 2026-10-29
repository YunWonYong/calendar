import type { FC } from "react";
import { memo } from "react";

import { RadioButton } from "@/components/form/RadioButton";
import { GROUP_FORM_PLAN_ID_RADIO_BOX_TEXT } from "@/domains/group/form";
import { PLANS } from "@/domains/plan/planType";
import useGroupBasicPlanIds from "@/hooks/group/form/basic/UseGroupBasicPlanIds";
import useLocale from "@/hooks/locale/useLocale";
import useUserInfo from "@/hooks/user/UseUserInfo";

import styles from "./GroupBasicPlanIdForm.module.css";

import type { GroupFormBasicPlanIdType } from "@/domains/group/form";
import type { LocaleType } from "@/domains/locale/locale";
import type { PlanTypeIds } from "@/domains/plan/planType";

const GroupBasicPlanIdForm = () => {
    const { locale } = useLocale();
    const userInfo = useUserInfo();
    const { maxOwnedGroupMemberPlanId, maxSubLeaderPlanId } = useGroupBasicPlanIds();
    return (
        <article>
            <PlanIdRadioButtonBox
                locale={ locale }
                userPlanId={ userInfo.planId }
                formData={ maxOwnedGroupMemberPlanId }
            />
            <PlanIdRadioButtonBox
                locale={ locale }
                userPlanId={ userInfo.planId }
                formData={ maxSubLeaderPlanId }
            />
        </article>
    );
};

const PlanIdRadioButtonBox: FC<{ locale: LocaleType; userPlanId: PlanTypeIds; formData: GroupFormBasicPlanIdType; }> = memo(({ locale, userPlanId, formData }) => {
    const { selectType, selectedPlanId, planBenefits, onSelect } = formData;
    return (
        <div
            className={ styles.planIdFormWrap }
        >
            <h3
                className={ styles.planIdFormFieldLabel }
            >
                {
                    GROUP_FORM_PLAN_ID_RADIO_BOX_TEXT[locale][selectType].LABEL
                }
            </h3>
            <div
                className={ styles.planIdFormFieldBox }
            >
                {
                    planBenefits.map((benefit) => {
                        const { planId, value } = benefit;
                        const id = `${selectType}#${planId}`;
                        let isDisabled = false;

                        if (planId !== PLANS.FREE && userPlanId < planId) {
                            isDisabled = true;
                        }

                        const unitText = GROUP_FORM_PLAN_ID_RADIO_BOX_TEXT[locale][selectType].UNIT;
                        return (
                            <RadioButton 
                                key={ id }
                                id={ id }
                                name={ selectType }
                                value={ planId.toString() }
                                onChange={ onSelect }
                                label={ `${value}${unitText}` }
                                checked={ selectedPlanId === planId }
                                disabled={ isDisabled }
                                containerClassName={ `${styles.radioButtonLabel} ${isDisabled? styles.disable: ""}` }
                            />
                        );
                    })
                }
            </div>
        </div>
    );
});

export default GroupBasicPlanIdForm;