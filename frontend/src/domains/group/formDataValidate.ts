import { INVALID_ERROR_MESSAGE_TYPES } from "@/lib/validation/errorMessage";
import { hasConsecutiveWhitespace, hasEmoji, hasInvalidSpecialCharacterStrict, hasInvalidStartCharacter, isBlank, isLongerThan, isShorterThan } from "@/lib/validation/validation";

import { isPlanTypeId } from "../plan/planValidate";

import { FULL_NAME_MAX_LENGTH, FULL_NAME_MIN_LENGTH, SHORT_NAME_MAX_LENGTH, SHORT_NAME_MIN_LENGTH } from "./form";
import { GROUP_VISIBILITY_TYPE_LIST } from "./group";

import type { InvalidErrorMessageType } from "@/lib/validation/errorMessage";

import type { GroupBasicFormData } from "./form";

export const isValidFullName = (fullName: string): InvalidErrorMessageType | null => {
    if (isBlank(fullName)) {
        return INVALID_ERROR_MESSAGE_TYPES.BLANK;
    }

    if (hasInvalidStartCharacter(fullName)) {
        return INVALID_ERROR_MESSAGE_TYPES.START_CHARACTER;
    }

    if (hasInvalidSpecialCharacterStrict(fullName)) {
        return INVALID_ERROR_MESSAGE_TYPES.SPECIAL_CHARACTER_STRICT;
    }

    if (hasConsecutiveWhitespace(fullName)) {
        return INVALID_ERROR_MESSAGE_TYPES.CONSECUTIVE_SPACE;
    }

    if (isShorterThan(fullName, FULL_NAME_MIN_LENGTH)) {
        return INVALID_ERROR_MESSAGE_TYPES.SHORTER_THAN;
    }

    if (isLongerThan(fullName, FULL_NAME_MAX_LENGTH)) {
        return INVALID_ERROR_MESSAGE_TYPES.LONGER_THAN;
    }
    
    return null;
};

export const isValidShortName = (shortName: string): InvalidErrorMessageType | null => {
    if (isBlank(shortName)) {
        return INVALID_ERROR_MESSAGE_TYPES.BLANK;
    }

    if (hasInvalidStartCharacter(shortName)) {
        return INVALID_ERROR_MESSAGE_TYPES.START_CHARACTER;
    }

    if (hasInvalidSpecialCharacterStrict(shortName)) {
        return INVALID_ERROR_MESSAGE_TYPES.SPECIAL_CHARACTER_STRICT;
    }

    if (hasConsecutiveWhitespace(shortName)) {
        return INVALID_ERROR_MESSAGE_TYPES.CONSECUTIVE_SPACE;
    }

    if (hasEmoji(shortName)) {
        return INVALID_ERROR_MESSAGE_TYPES.EMOJI;
    }

    if (isShorterThan(shortName, SHORT_NAME_MIN_LENGTH)) {
        return INVALID_ERROR_MESSAGE_TYPES.SHORTER_THAN;
    }

    if (isLongerThan(shortName, SHORT_NAME_MAX_LENGTH)) {
        return INVALID_ERROR_MESSAGE_TYPES.LONGER_THAN;
    }

    return null;
};

export const validFormData = (formData: GroupBasicFormData) => {
    if (isValidFullName(formData.fullName) !== null) {
        return false;
    }

    if (isValidShortName(formData.shortName) !== null) {
        return false;
    }
    
    
    if (!isPlanTypeId(formData.maxOwnedGroupMemberPlanId)) {
        return false;
    }

    if (!isPlanTypeId(formData.maxSubLeaderPlanId)) {
        return false;
    }
    
    if (!GROUP_VISIBILITY_TYPE_LIST.includes(formData.visibilityType)) {
        return false;
    }

    return true;
};