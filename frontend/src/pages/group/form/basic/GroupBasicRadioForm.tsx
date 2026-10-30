import type { FC, ReactNode } from "react";
import { memo, useMemo } from "react";

import { RadioButton } from "@/components/form/RadioButton";
import InfomationButtonBox from "@/components/infomation/InfomationButtonBox";
import { GROUP_FORM_PLAN_ID_RADIO_BOX_TEXT, GROUP_FORM_VISIBILITY_TYPE_RADIO_BOX_TEXT, GROUP_FORM_VISIBILITY_TYPE_RADIO_BOX_TITLE } from "@/domains/group/form";
import { PLANS } from "@/domains/plan/planType";
import useGroupBasicRadioForm from "@/hooks/group/form/basic/UseGroupBasicRadioForm";
import useLocale from "@/hooks/locale/useLocale";
import useUserInfo from "@/hooks/user/UseUserInfo";

import styles from "./GroupBasicRadioForm.module.css";

import type { GroupFormBasicPlanIdType, GroupFormBasicVisibilityType } from "@/domains/group/form";
import type { LocaleType } from "@/domains/locale/locale";
import type { PlanTypeIds } from "@/domains/plan/planType";

const GroupBasicRadioForm = () => {
    const { locale } = useLocale();
    const userInfo = useUserInfo();
    const { maxOwnedGroupMemberPlanId, maxSubLeaderPlanId, visibilityType } = useGroupBasicRadioForm();
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
            <VisibilityTypeRadioButtonBox 
                locale={ locale }
                formData={ visibilityType }
            />
        </article>
    );
};

const PlanIdRadioButtonBox: FC<{ locale: LocaleType; userPlanId: PlanTypeIds; formData: GroupFormBasicPlanIdType; }> = memo(({ locale, userPlanId, formData }) => {
    const props = useMemo(() => {
        const { selectType, selectedPlanId, planBenefits, onSelect } = formData;
        return {
            title: GROUP_FORM_PLAN_ID_RADIO_BOX_TEXT[locale][selectType].LABEL,
            list: planBenefits.map((benefit) => {
                const { planId, value } = benefit;
                const id = `${selectType}#${planId}`;
                let isDisabled = false;

                if (planId !== PLANS.FREE && userPlanId < planId) {
                    isDisabled = true;
                }

                const unitText = GROUP_FORM_PLAN_ID_RADIO_BOX_TEXT[locale][selectType].UNIT;
                return {
                    key:  id,
                    id:  id,
                    name:  selectType,
                    value:  planId.toString(),
                    onChange:  onSelect,
                    label:  `${value}${unitText}`,
                    checked:  selectedPlanId === planId,
                    disabled:  isDisabled,
                }
            }),
        };
    }, [locale, userPlanId, formData]);
    return (
        <RadioButtonBox 
            { ...props }
        />
    );
});

const VisibilityTypeRadioButtonBox: FC<{ locale: LocaleType; formData: GroupFormBasicVisibilityType; }> = ({ locale, formData }) => {
    const props = useMemo(() => {
        return {
            title: GROUP_FORM_VISIBILITY_TYPE_RADIO_BOX_TITLE[locale],
            list: formData.visibilityTypeList.map((visibilityType) => {
                const { selectedVisibilityType, onSelect } = formData;
                return {
                    key:  visibilityType,
                    id:  visibilityType,
                    name:  "groupVisibility",
                    value:  visibilityType,
                    onChange:  onSelect,
                    label:  GROUP_FORM_VISIBILITY_TYPE_RADIO_BOX_TEXT[locale][visibilityType],
                    checked:  selectedVisibilityType === visibilityType,
                    disabled:  false,
                }
            }),
            labelContainerClassName: styles.full,
            infomationButton: (
                <div
                    className={ styles.visibilityInfoBox }
                >
                    다른 사용자들이 검색할 때 보여지는 여부를 선택할 수 있습니다.
                </div>
            ),
        };
    }, [locale, formData]);
    return (
        <RadioButtonBox 
            { ...props }
        />
    );
};

type RadioButtonProps = {
    key: string;
    id: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    label: string;
    checked: boolean;
    disabled: boolean;
};

type RadioButtonBoxProps = {
    title: string;
    list: RadioButtonProps[];
    infomationButton?: ReactNode;
    labelContainerClassName?: string;
};

const RadioButtonBox: FC<RadioButtonBoxProps> = ({ title, list, infomationButton, labelContainerClassName }) => {
    return (
        <div
            className={ styles.radioButtonBoxWrap }
        >
            <div
                className={ styles.radioButtonBoxTitleWrap }
            >
                <h3
                    className={ styles.radioButtonBoxTitle }
                >
                    {
                        title 
                    }
                </h3>
                {
                    infomationButton &&
                        <InfomationButtonBox>
                            {
                                infomationButton
                            }
                        </InfomationButtonBox>
                }
            </div>
            <div
                className={ styles.radioButtonBox }
            >
                {
                    list.map(({ key, ...props }) => {
                        const { disabled } = props;
                        return (
                            <RadioButton 
                                key={ key }
                                {
                                    ...props
                                }
                                containerClassName={ `${styles.radioButtonLabel} ${labelContainerClassName? labelContainerClassName: ""} ${disabled? styles.disable: ""}` }
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

export default GroupBasicRadioForm;