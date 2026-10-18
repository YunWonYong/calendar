import { LOCALE } from "@/domains/locale/locale";

import type { LocaleType } from "@/domains/locale/locale";

export const DIGIT_FORMAT_TEXT = "$d";

export const INVALID_ERROR_MESSAGE_TYPES = {
    EMOJI: "EMOJI",
    SPECIAL_CHARACTER: "SPECIAL_CHARACTER",
    SPECIAL_CHARACTER_STRICT: "SPECIAL_CHARACTER_STRICT",
    WHITESPACE: "WHITESPACE",
    CONSECUTIVE_SPACE: "CONSECUTIVE_SPACE",
    START_WHITESPACE: "START_WHITESPACE",
    NULL: "NULL",
    EMPTY: "EMPTY",
    BLANK: "BLANK",
    NUMBER_TEXT: "NUMBER_TEXT",
    NUMBER_TEXT_STRICT: "NUMBER_TEXT_STRICT",
    SHORTER_THAN: "SHORTER_THAN",
    LONGER_THAN: "LONGER_THAN",
    OUTSIDE_LENGTH: "OUTSIDE_LENGTH",
} as const;

export type InvalidErrorMessageType = typeof INVALID_ERROR_MESSAGE_TYPES[keyof typeof INVALID_ERROR_MESSAGE_TYPES];

export const LOCALE_INVALID_ERROR_MESSAGES = {
    [LOCALE.KR]: {
        [INVALID_ERROR_MESSAGE_TYPES.EMOJI]: "이모지는 사용할 수 없습니다.",
        [INVALID_ERROR_MESSAGE_TYPES.SPECIAL_CHARACTER]: "사용할 수 없는 특수문자가 포함되어 있습니다.",
        [INVALID_ERROR_MESSAGE_TYPES.SPECIAL_CHARACTER_STRICT]: "허용되지 않는 특수문자가 포함되어 있습니다.",
        [INVALID_ERROR_MESSAGE_TYPES.WHITESPACE]: "사용할 수 없는 공백 문자가 포함되어 있습니다.",
        [INVALID_ERROR_MESSAGE_TYPES.CONSECUTIVE_SPACE]: "공백을 연속해서 사용할 수 없습니다.",
        [INVALID_ERROR_MESSAGE_TYPES.START_WHITESPACE]: "문자열의 처음에는 공백을 사용할 수 없습니다.",
        [INVALID_ERROR_MESSAGE_TYPES.NULL]: "값이 없습니다.",
        [INVALID_ERROR_MESSAGE_TYPES.EMPTY]: "값을 입력해주세요.",
        [INVALID_ERROR_MESSAGE_TYPES.BLANK]: "공백만 입력할 수 없습니다.",
        [INVALID_ERROR_MESSAGE_TYPES.NUMBER_TEXT]: "숫자 형식으로 입력해주세요.",
        [INVALID_ERROR_MESSAGE_TYPES.NUMBER_TEXT_STRICT]: "올바른 숫자 형식으로 입력해주세요.",
        [INVALID_ERROR_MESSAGE_TYPES.SHORTER_THAN]: "최소 $d자 이상 입력해주세요.",
        [INVALID_ERROR_MESSAGE_TYPES.LONGER_THAN]: "최대 $d자까지 입력할 수 있습니다.",
        [INVALID_ERROR_MESSAGE_TYPES.OUTSIDE_LENGTH]: "$d자에서 $d자 사이로 입력해주세요.",
    },
    [LOCALE.JP]: {
        [INVALID_ERROR_MESSAGE_TYPES.EMOJI]: "絵文字は使用できません。",
        [INVALID_ERROR_MESSAGE_TYPES.SPECIAL_CHARACTER]: "使用できない特殊文字が含まれています。",
        [INVALID_ERROR_MESSAGE_TYPES.SPECIAL_CHARACTER_STRICT]: "許可されていない特殊文字が含まれています。",
        [INVALID_ERROR_MESSAGE_TYPES.WHITESPACE]: "使用できない空白文字が含まれています。",
        [INVALID_ERROR_MESSAGE_TYPES.CONSECUTIVE_SPACE]: "空白を連続して使用することはできません。",
        [INVALID_ERROR_MESSAGE_TYPES.START_WHITESPACE]: "先頭に空白を使用することはできません。",
        [INVALID_ERROR_MESSAGE_TYPES.NULL]: "値がありません。",
        [INVALID_ERROR_MESSAGE_TYPES.EMPTY]: "値を入力してください。",
        [INVALID_ERROR_MESSAGE_TYPES.BLANK]: "空白のみを入力することはできません。",
        [INVALID_ERROR_MESSAGE_TYPES.NUMBER_TEXT]: "数字形式で入力してください。",
        [INVALID_ERROR_MESSAGE_TYPES.NUMBER_TEXT_STRICT]: "正しい数字形式で入力してください。",
        [INVALID_ERROR_MESSAGE_TYPES.SHORTER_THAN]: "最低 $d文字以上入力してください。",
        [INVALID_ERROR_MESSAGE_TYPES.LONGER_THAN]: "最大 $d文字まで入力できます。",
        [INVALID_ERROR_MESSAGE_TYPES.OUTSIDE_LENGTH]: "$d文字から$d文字の間で入力してください。",
    },
    [LOCALE.ZH]: {
        [INVALID_ERROR_MESSAGE_TYPES.EMOJI]: "不能使用表情符号。",
        [INVALID_ERROR_MESSAGE_TYPES.SPECIAL_CHARACTER]: "包含无法使用的特殊字符。",
        [INVALID_ERROR_MESSAGE_TYPES.SPECIAL_CHARACTER_STRICT]: "包含不允许使用的特殊字符。",
        [INVALID_ERROR_MESSAGE_TYPES.WHITESPACE]: "不能使用空白字符。",
        [INVALID_ERROR_MESSAGE_TYPES.CONSECUTIVE_SPACE]: "不能连续使用空格。",
        [INVALID_ERROR_MESSAGE_TYPES.START_WHITESPACE]: "开头不能使用空格。",
        [INVALID_ERROR_MESSAGE_TYPES.NULL]: "没有输入值。",
        [INVALID_ERROR_MESSAGE_TYPES.EMPTY]: "请输入内容。",
        [INVALID_ERROR_MESSAGE_TYPES.BLANK]: "不能只输入空格。",
        [INVALID_ERROR_MESSAGE_TYPES.NUMBER_TEXT]: "请输入数字格式。",
        [INVALID_ERROR_MESSAGE_TYPES.NUMBER_TEXT_STRICT]: "请输入正确的数字格式。",
        [INVALID_ERROR_MESSAGE_TYPES.SHORTER_THAN]: "请输入至少 $d 个字符。",
        [INVALID_ERROR_MESSAGE_TYPES.LONGER_THAN]: "最多可以输入 $d 个字符。",
        [INVALID_ERROR_MESSAGE_TYPES.OUTSIDE_LENGTH]: "请输入 $d 到 $d 个字符。",
    },
    
    [LOCALE.EN]: {
        [INVALID_ERROR_MESSAGE_TYPES.EMOJI]: "Emojis are not allowed.",
        [INVALID_ERROR_MESSAGE_TYPES.SPECIAL_CHARACTER]: "The input contains unsupported special characters.",
        [INVALID_ERROR_MESSAGE_TYPES.SPECIAL_CHARACTER_STRICT]: "The input contains disallowed special characters.",
        [INVALID_ERROR_MESSAGE_TYPES.WHITESPACE]: "The input contains unsupported whitespace characters.",
        [INVALID_ERROR_MESSAGE_TYPES.CONSECUTIVE_SPACE]: "Consecutive spaces are not allowed.",
        [INVALID_ERROR_MESSAGE_TYPES.START_WHITESPACE]: "The input cannot start with whitespace.",
        [INVALID_ERROR_MESSAGE_TYPES.NULL]: "No value was provided.",
        [INVALID_ERROR_MESSAGE_TYPES.EMPTY]: "Please enter a value.",
        [INVALID_ERROR_MESSAGE_TYPES.BLANK]: "The input cannot contain only whitespace.",
        [INVALID_ERROR_MESSAGE_TYPES.NUMBER_TEXT]: "Please enter a numeric value.",
        [INVALID_ERROR_MESSAGE_TYPES.NUMBER_TEXT_STRICT]: "Please enter a valid numeric format.",
        [INVALID_ERROR_MESSAGE_TYPES.SHORTER_THAN]: `Please enter at least ${DIGIT_FORMAT_TEXT} characters.`,
        [INVALID_ERROR_MESSAGE_TYPES.LONGER_THAN]: `Please enter no more than ${DIGIT_FORMAT_TEXT} characters.`,
        [INVALID_ERROR_MESSAGE_TYPES.OUTSIDE_LENGTH]: `Please enter between ${DIGIT_FORMAT_TEXT} and ${DIGIT_FORMAT_TEXT} characters.`,
    }
};

export const getInvalidErrorMessageByLocale = (errorMessageType: InvalidErrorMessageType, locale?: LocaleType) => {
    if (!locale) {
        return getDefaultInvalidErrorMessage(errorMessageType);
    }

    const errorMessages = LOCALE_INVALID_ERROR_MESSAGES[locale];

    if (!errorMessages || !errorMessages[errorMessageType]) {
        return getDefaultInvalidErrorMessage(errorMessageType);
    }

    return errorMessages[errorMessageType];
};

export const getDefaultInvalidErrorMessage = (errorMessageType: InvalidErrorMessageType) => {
    const enErrorMessages = LOCALE_INVALID_ERROR_MESSAGES[LOCALE.EN];
    const errorMessage = enErrorMessages[errorMessageType];

    if (!errorMessage) {
        return "default error message.";
    }

    return errorMessage;
}; 