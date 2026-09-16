/**
 * 문자열에 Emoji Presentation 문자가 포함되어 있는지 확인합니다.
 *
 * @param value 검사할 문자열
 * @returns Emoji Presentation 문자가 하나라도 포함되어 있으면 true
 */
const EMOJI_REGEX = /\p{Emoji_Presentation}/u;
export const hasEmoji = (value: string) => EMOJI_REGEX.test(value);

const INVALID_SPECIAL_CHARACTER_REGEX = /[\[\]{}\\|`";:=^*<>,]/;
/**
 * 일반적으로 허용하지 않는 특수문자가 포함되어 있는지 확인합니다.
 *
 * 허용하지 않는 특수문자:    
 * [ ] { } \ | ' " ; : = ^ * < > ,
 * 
 * @param value 검사할 문자열
 * @returns 허용하지 않는 특수문자가 포함되어 있으면 true
 */
export const hasInvalidSpecialCharacter = (value: string) =>
    INVALID_SPECIAL_CHARACTER_REGEX.test(value);

const ALLOWED_SPECIAL_CHARACTERS = new Set([
    "@",
    "#",
    "$",
    "%",
    "~",
    "_",
    "-",
    ".",
    "+",
    "&",
    "'",
]);
/**
 * 허용하지 않는 특수문자가 포함되어 있는지 확인합니다.
 *
 * 허용하는 특수문자:
 * @ # $ % ~ _ - . + & '
 *
 * @param value 검사할 문자열
 * @returns 허용되지 않은 Unicode 특수문자가 포함되어 있으면 true
 */
export const hasInvalidSpecialCharacterStrict = (value: string) => {
    for (const char of value) {
        if (
            /\p{P}|\p{S}/u.test(char) &&
            !ALLOWED_SPECIAL_CHARACTERS.has(char)
        ) {
            return true;
        }
    }

    return false;
};

/**
 * 일반 공백(" ")을 제외한 금지된 whitespace가 포함되어 있는지 확인합니다.
 *
 * 금지되는 whitespace:
 * - \t Tab
 * - \n Line Feed
 * - \r Carriage Return
 * - \f Form Feed
 * - \v Vertical Tab
 * - \u00A0 Non-breaking Space
 *
 * @param value 검사할 문자열
 * @returns 금지된 whitespace가 포함되어 있으면 true
 */
const INVALID_WHITESPACE_REGEX = /[\t\n\r\f\v\u00A0]/;
export const hasInvalidWhitespace = (value: string) =>
    INVALID_WHITESPACE_REGEX.test(value);

/**
 * 모든 whitespace가 연속으로 2개 이상 포함되어 있는지 확인합니다.
 *
 * 일반 공백(" ")뿐만 아니라 \t, \n 등의 whitespace도 검사합니다.
 *
 * @param value 검사할 문자열
 * @returns whitespace가 2개 이상 연속으로 포함되어 있으면 true
 */
const CONSECUTIVE_SPACE_REGEX = /\s{2,}/;
export const hasConsecutiveWhitespace = (value: string) =>
    CONSECUTIVE_SPACE_REGEX.test(value);

/**
 * 문자열의 첫 번째 문자가 whitespace인지 확인합니다.
 *
 * @param value 검사할 문자열
 * @returns 첫 문자가 whitespace이면 true
 */
export const startsWithWhitespace = (value: string) =>
    /\s/.test(value.charAt(0));

/**
 * 주어진 값이 null인지 확인합니다.
 *
 * @param value 검사할 값
 * @returns 값이 null이면 true
*/
export const isNull = (value: unknown) => value === null;

/**
 * 값이 비어 있는지 확인합니다.
 *
 * 다음 값을 비어 있는 것으로 판단합니다.
 * - null
 * - undefined
 * - 빈 문자열
 * - 빈 배열
 * - 프로퍼티가 없는 객체
 *
 * @param value 검사할 값
 * @returns 값이 비어 있으면 true
 */
export const isEmpty = (value: unknown) => {
    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value === "string") {
        return value.length === 0;
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    if (typeof value === "object") {
        return Object.keys(value).length === 0;
    }

    return false;
};

/**
 * 문자열의 길이가 지정한 최소 길이보다 짧은지 확인합니다.
 *
 * @param value 검사할 문자열
 * @param minLength 허용할 최소 길이
 * @returns 문자열의 길이가 최소 길이보다 짧으면 true
*/
export const isBlank = (value: string) => value.trim().length === 0;

const NUMBER_TEXT_REGEX = /^-?\d+(?:\.\d+)?$/;
/**
 * 문자열이 십진수 형태의 숫자로 구성되어 있는지 확인합니다.
 *
 * 정수, 음수, 소수를 허용하며 정수 부분의 선행 0도 허용합니다.
 *
 * 허용 예시:
 * - 0
 * - 123
 * - 00123
 * - -123
 * - 0.5
 * - -0.5
 * - 001.23
 *
 * 허용하지 않는 예시:
 * - +123
 * - .5
 * - 1.
 * - 1e10
 *
 * @param value 검사할 문자열
 * @returns 십진수 형태의 숫자이면 true
 */
export const isNumberText = (value: string) => NUMBER_TEXT_REGEX.test(value);

const STRICT_NUMBER_TEXT_REGEX = /^-?(?:0|[1-9]\d*)(?:\.\d+)?$/;
/**
 * 문자열이 정규화되지 않는 십진수 형태의 숫자로 구성되어 있는지 확인합니다.
 *
 * 정수, 음수, 소수를 허용하며 정수 부분의 선행 0은 허용하지 않습니다.
 *
 * 허용 예시:
 * - 0
 * - 123
 * - -123
 * - 0.5
 * - -0.5
 * - 123.45
 *
 * 허용하지 않는 예시:
 * - 00123
 * - 01.23
 * - -00123
 * - +123
 * - .5
 * - 1.
 * - 1e10
 *
 * @param value 검사할 문자열
 * @returns 정규화 가능한 십진수 형태의 숫자이면 true
 */
export const isNumberTextStrict = (value: string) => STRICT_NUMBER_TEXT_REGEX.test(value);

/**
 * 문자열의 길이가 지정한 최소 길이보다 짧은지 확인합니다.
 *
 * @param value 검사할 문자열
 * @param minLength 허용할 최소 길이
 * @returns 문자열의 길이가 최소 길이보다 짧으면 true
*/
export const isShorterThan = (value: string, minLength: number) => value.length < minLength;

/**
 * 문자열의 길이가 지정한 최대 길이보다 긴지 확인합니다.
 *
 * @param value 검사할 문자열
 * @param maxLength 허용할 최대 길이
 * @returns 문자열의 길이가 최대 길이보다 길면 true
*/
export const isLongerThan = (value: string, maxLength: number) => value.length > maxLength;

/**
 * 문자열의 길이가 지정한 최소 길이보다 짧거나 최대 길이보다 긴지 확인합니다.
 *
 * @param value 검사할 문자열
 * @param minLength 허용할 최소 길이
 * @param maxLength 허용할 최대 길이
 * @returns 문자열의 길이가 허용 범위를 벗어나면 true
*/
export const isOutsideLength = (value: string, minLength: number, maxLength: number) => 
    isShorterThan(value, minLength) ||
    isLongerThan(value, maxLength);