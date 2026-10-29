import { useContext } from "react";

import GroupCreateFlowContext from "@/contexts/group/create/GroupCreateFlowContext";
import { GROUP_CREATE_STEP_BUTTON_TITLE, GROUP_CREATE_STEP_BUTTON_TYPE, GroupCreateFlowStepByFormType, GroupFormTypeByCreateFlowStep } from "@/domains/group/create";
import useLocale from "@/hooks/locale/useLocale";
import usePageMove from "@/hooks/page/move/UsePageMove";

import type { GroupCreateFlowContextType, GroupCreateStepButtonTypes } from "@/domains/group/create";
import type { GroupFormTypes } from "@/domains/group/form";
import type { LocaleType } from "@/domains/locale/locale";

const getButtonTitle = (locale: LocaleType, buttonType: GroupCreateStepButtonTypes, formType: GroupFormTypes): string => {
    const titleByButtonType = GROUP_CREATE_STEP_BUTTON_TITLE[locale];

    if (
        buttonType === GROUP_CREATE_STEP_BUTTON_TYPE.LOBBY ||
        buttonType === GROUP_CREATE_STEP_BUTTON_TYPE.SUBMIT
    ) {
        return titleByButtonType[buttonType];
    }
    
    if (
        buttonType === GROUP_CREATE_STEP_BUTTON_TYPE.NEXT ||
        buttonType === GROUP_CREATE_STEP_BUTTON_TYPE.PREVIOUS
    ) {
        return titleByButtonType[buttonType][formType];
    }

    return "";
};

const useGroupCreateFlow = () => {
    const { steps, nextStep, previousStep } = useContext<GroupCreateFlowContextType>(GroupCreateFlowContext);
    const { locale } = useLocale();
    const { movePageTo } = usePageMove();
    const hasNext = steps.next !== undefined;
    const hasPrevious = steps.previous !== undefined;
    const previousButtonType = !hasPrevious && steps.current === GroupCreateFlowStepByFormType.BASIC
        ? GROUP_CREATE_STEP_BUTTON_TYPE.LOBBY
        : GROUP_CREATE_STEP_BUTTON_TYPE.PREVIOUS;
    const nextButtonType = hasNext && steps.current === GroupCreateFlowStepByFormType.REVIEW
        ? GROUP_CREATE_STEP_BUTTON_TYPE.SUBMIT
        : !hasNext && steps.current === GroupCreateFlowStepByFormType.RESULT
            ? GROUP_CREATE_STEP_BUTTON_TYPE.LOBBY
            : GROUP_CREATE_STEP_BUTTON_TYPE.NEXT;
    
    const moveNext = () => {
        if (nextButtonType === GROUP_CREATE_STEP_BUTTON_TYPE.LOBBY) {
            movePageTo("/lobby", { replace: true });
            return;
        }

        if (steps.next !== undefined) {
            nextStep();
        }
    };

    const movePrevious = () => {
        if (previousButtonType === GROUP_CREATE_STEP_BUTTON_TYPE.LOBBY) {
            movePageTo("/lobby", { replace: true });
            return;
        }

        if (steps.previous !== undefined) {
            previousStep();
        }
    };
    
    return {
        steps,
        hasPrevious,
        hasNext,
        previousButtonType,
        previousButtonTitle: getButtonTitle(
            locale,
            previousButtonType,
            GroupFormTypeByCreateFlowStep[steps.current]
        ),
        previousButtonEventName: `GROUP_CREATE_PREVIOUS_FLOW@${steps.current}=>${steps.previous}`,
        nextButtonType,
        nextButtonTitle: getButtonTitle(
            locale,
            nextButtonType,
            GroupFormTypeByCreateFlowStep[steps.current]
        ),
        nextButtonEventName: `GROUP_CREATE_NEXT_FLOW@${steps.current}=>${steps.next}`,
        moveNext,
        movePrevious
    };
};

export default useGroupCreateFlow;