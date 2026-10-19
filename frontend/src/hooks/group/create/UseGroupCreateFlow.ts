import type { MouseEvent } from "react";
import { useContext } from "react";

import { trackClick } from "@/analytics/button";
import GroupCreateFlowContext from "@/contexts/group/create/GroupCreateFlowContext";
import { GROUP_CREATE_STEP_BUTTON_TITLE, GROUP_CREATE_STEP_BUTTON_TYPE, GroupCreateFlowStepByFormType, GroupFormTypeByCreateFlowStep } from "@/domains/group/create";
import useLocale from "@/hooks/locale/useLocale";
import usePageMove from "@/hooks/page/move/UsePageMove";

import type { GroupCreateFlowContextType, GroupCreateStepButtonTypes } from "@/domains/group/create";
import type { GroupCreateStepTypes } from "@/domains/group/form";
import type { LocaleType } from "@/domains/locale/locale";

const getButtonTitle = (locale: LocaleType, buttonType: GroupCreateStepButtonTypes, formType: GroupCreateStepTypes): string => {
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
    const { movePageToClick } = usePageMove();
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
    
    const moveNext = <T extends HTMLElement>(event: MouseEvent<T>) => {
        if (nextButtonType === GROUP_CREATE_STEP_BUTTON_TYPE.LOBBY) {
            movePageToClick(event, "/lobby", { replace: true });
            return;
        }

        if (steps.next !== undefined) {
            trackClick(
                `GROUP_CREATE_NEXT_FLOW@${steps.current}=>${steps.next}`,
                nextStep
            );
        }
    }
    ;

    const movePrevious = <T extends HTMLElement>(event: MouseEvent<T>) => {
        if (previousButtonType === GROUP_CREATE_STEP_BUTTON_TYPE.LOBBY) {
            movePageToClick(event, "/lobby", { replace: true });
            return;
        }

        if (steps.previous !== undefined) {
            trackClick(
                `GROUP_CREATE_PREVIOUS_FLOW@${steps.current}=>${steps.previous}`,
                previousStep
            );
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
        nextButtonType,
        nextButtonTitle: getButtonTitle(
            locale,
            nextButtonType,
            GroupFormTypeByCreateFlowStep[steps.current]
        ),
        moveNext,
        movePrevious
    };
};

export default useGroupCreateFlow;