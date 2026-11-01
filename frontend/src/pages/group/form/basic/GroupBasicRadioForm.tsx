import type { FC, ReactNode } from "react";
import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import { RadioButton } from "@/components/form/RadioButton";
import InformationButtonBox from "@/components/infomation/InformationButtonBox";
import { movePageEventTranckClick } from "@/components/Link";
import { BUTTON_COLOR } from "@/domains/button/buttonType";
import { GROUP_FORM_MODE, GROUP_FORM_PLAN_ID_RADIO_BOX_INFO_TEXT, GROUP_FORM_PLAN_ID_RADIO_BOX_TEXT, GROUP_FORM_VISIBILITY_TYPE_RADIO_BOX_TEXT, GROUP_FORM_VISIBILITY_TYPE_RADIO_BOX_TITLE, GROUP_FORM_VISIBILITY_TYPE_RADIO_INFO_TEXT } from "@/domains/group/form";
import { PLANS } from "@/domains/plan/planType";
import useGroupBasicRadioForm from "@/hooks/group/form/basic/UseGroupBasicRadioForm";
import useLocale from "@/hooks/locale/useLocale";
import useUserInfo from "@/hooks/user/UseUserInfo";

import styles from "./GroupBasicRadioForm.module.css";

import type { GroupCreateBasicPlanIdFormData, GroupCreateBasicVisibilityTypeFormData } from "@/domains/group/create";
import type { GroupFormBasicPlanIdType, GroupFormBasicVisibilityType, GroupFormModeComponentProps } from "@/domains/group/form";
import type { LocaleType } from "@/domains/locale/locale";
import type { PlanTypeIds } from "@/domains/plan/planType";

const GroupBasicRadioForm = () => {
    const userInfo = useUserInfo();
    const { maxOwnedGroupMemberPlanId, maxSubLeaderPlanId, visibilityType } = useGroupBasicRadioForm();
    return (
        <article>
            <GroupBasicPlanIdRadioButtonForm
                mode={ GROUP_FORM_MODE.EDIT }
                userPlanId={ userInfo.planId }
                formData={ maxOwnedGroupMemberPlanId }
            />
            <GroupBasicPlanIdRadioButtonForm
                mode={ GROUP_FORM_MODE.EDIT }
                userPlanId={ userInfo.planId }
                formData={ maxSubLeaderPlanId }
            />
            <GroupBasicVisibilityRadioButtonForm 
                mode={ GROUP_FORM_MODE.EDIT }
                formData={ visibilityType }
            />
        </article>
    );
};

type EditPlanIdRadioButtonFormProps = {
    userPlanId: PlanTypeIds;
    formData: GroupFormBasicPlanIdType;
};

type PreviewPlanIdRadioButtonFormProps = {
    data: GroupCreateBasicPlanIdFormData;
};

export const GroupBasicPlanIdRadioButtonForm: FC<GroupFormModeComponentProps<EditPlanIdRadioButtonFormProps, PreviewPlanIdRadioButtonFormProps>> = (props) => {
    const { locale } = useLocale();

    if (props.mode === GROUP_FORM_MODE.EDIT) {
        return (
            <PlanIdRadioButtonBox 
                locale={ locale }
                userPlanId={ props.userPlanId }
                { ...props.formData }
            />
        );
    }

    return (
        <PlanIdRadioButtonBox 
            locale={ locale }
            userPlanId={ PLANS.ULTIMATE }
            isPreview={ true }
            { ...props.data }
            onSelect={ () => {} }
            selectedPlanId={ props.data.value }
        />
    );
};

const PlanIdRadioButtonBox: FC<{ locale: LocaleType; isPreview?: boolean; userPlanId: PlanTypeIds; } & GroupFormBasicPlanIdType> = memo(({ locale, isPreview = false, userPlanId, onSelect, planBenefits, selectType, selectedPlanId }) => {
    const nav = useNavigate();
    const props = useMemo(() => {
        const text = GROUP_FORM_PLAN_ID_RADIO_BOX_INFO_TEXT[locale];
        const props: RadioButtonBoxProps = {
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
                    readOnly: isPreview,
                }
            })
        };

        if (!isPreview) {
            props.informationButton = (
                <div
                    className={ styles.planIdRadioButtonInfoBox }
                >
                    <span
                        className={ styles.planIdRadioButtonInfoText }
                    >
                        {
                            text[selectType]
                        }
                    </span>
                    <span
                        className={ styles.planIdRadioButtonInfoDescription }
                    >
                        {
                            text.DISABLE_PLAN_RADIO_BUTTON_TEXT
                        }
                    </span>
                    <div
                        className={ styles.planRedirectButtonBox }
                    >
                        <Button 
                            eventName="GROUP_BASIC_PLAN_ID_RADIO_BOX_INFO_BUTTON"
                            onClick={() => {
                                const to = "/plan";
                                movePageEventTranckClick(
                                    "/group/create",
                                    to,
                                    () => nav(to)
                                );
                            }}
                            title={ text.PLAN_REDIRECT_BUTTON_TITLE }
                            color={ BUTTON_COLOR.TEAL }
                            isBarButtonType={ true }
                        />
                    </div>
                </div>
            );
        }

        return props;
    }, [locale, userPlanId, onSelect, planBenefits, selectType, selectedPlanId]);
    return (
        <RadioButtonBox 
            { ...props }
        />
    );
});

type EditVisibilityRadioButtonFormProps = {
    formData: GroupFormBasicVisibilityType;
};

type PreviewVisibilityRadioButtonFormProps = {
    data: GroupCreateBasicVisibilityTypeFormData;
};

export const GroupBasicVisibilityRadioButtonForm: FC<GroupFormModeComponentProps<EditVisibilityRadioButtonFormProps, PreviewVisibilityRadioButtonFormProps>> = (props) => {
    const { locale } = useLocale();

    if (props.mode === GROUP_FORM_MODE.EDIT) {
        return (
            <VisibilityTypeRadioButtonBox 
                locale={ locale }
                { ...props.formData }
            />
        );
    }

    return (
        <VisibilityTypeRadioButtonBox 
            locale={ locale }
            isPreview={ true }
            { ...props.data }
            onSelect={ () => {} }
            selectedVisibilityType={ props.data.value }
        />
    );
};

const VisibilityTypeRadioButtonBox: FC<{ locale: LocaleType; isPreview?: boolean; } & GroupFormBasicVisibilityType > = ({ locale, isPreview = false, onSelect, selectedVisibilityType, visibilityTypeList }) => {
    const props = useMemo(() => {
        const props: RadioButtonBoxProps = {
            title: GROUP_FORM_VISIBILITY_TYPE_RADIO_BOX_TITLE[locale],
            list: visibilityTypeList.map((visibilityType) => {
                return {
                    key:  visibilityType,
                    id:  visibilityType,
                    name:  "groupVisibility",
                    value:  visibilityType,
                    onChange:  onSelect,
                    label:  GROUP_FORM_VISIBILITY_TYPE_RADIO_BOX_TEXT[locale][visibilityType],
                    checked:  selectedVisibilityType === visibilityType,
                    readOnly: isPreview,
                }
            }),
            labelContainerClassName: styles.full,
        };

        if (!isPreview) {
            props.informationButton = (
                <div
                    className={ styles.visibilityInfoBox }
                >
                    {
                        GROUP_FORM_VISIBILITY_TYPE_RADIO_INFO_TEXT[locale]
                    }
                </div>
            );
        }

        return  props;
    }, [locale, isPreview, onSelect, selectedVisibilityType, visibilityTypeList]);
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
    onChange?: (value: string) => void;
    label: string;
    checked: boolean;
    disabled?: boolean;
    readOnly?: boolean;
};

type RadioButtonBoxProps = {
    title: string;
    list: RadioButtonProps[];
    informationButton?: ReactNode;
    labelContainerClassName?: string;
};

const RadioButtonBox: FC<RadioButtonBoxProps> = ({ title, list, informationButton, labelContainerClassName }) => {
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
                    informationButton &&
                        <InformationButtonBox>
                            {
                                informationButton
                            }
                        </InformationButtonBox>
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