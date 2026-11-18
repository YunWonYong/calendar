import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ERROR_MOTION_TYPE } from "@/domains/server/useServerAPIType";
import { NICKNAME_MAX_LEN, NICKNAME_MIN_LEN, TAG_MAX_LEN, TAG_MIN_LEN } from "@/domains/user/userType";
import { INVALID_ERROR_MESSAGE_TYPES } from "@/lib/validation/errorMessage";
import { hasEmoji, hasInvalidSpecialCharacterStrict, isBlank, isNullOrUndefined, isNumberText, isOutsideLength } from "@/lib/validation/validation";
import { searchUsers } from "@/server/api";

import useServerApi from "../server/UseServerAPI";

import type { UseServerApiParamType } from "@/domains/server/useServerAPIType";
import type { UserProfileType, UsersResponseBody } from "@/domains/user/userType";
import type { InvalidErrorMessageType } from "@/lib/validation/errorMessage";

type UserProfileListStateType = {
    searchValue: string;
    page: number;
    hasNext: boolean;
    limit: number;
    // [TODO] errorCode, errorMessage 정의.
    errorCode?: InvalidErrorMessageType | string;
    searchType: "tag" | "nickname",
    list: UserProfileType[];
    empty: boolean;
    // [TODO] errorCode, errorMessage 정의.
    searchApiErrorCode?: string;
    effectSearchFlag: boolean;
};

const TAG_REGEX = new RegExp(`^[A-Za-z0-9]{${TAG_MIN_LEN},${TAG_MAX_LEN}}$`);

const validationTag = (searchValue: string) => {
    const value = searchValue.slice(1);

    if (isNullOrUndefined(value) || isBlank(value)) {
        return INVALID_ERROR_MESSAGE_TYPES.EMPTY;
    }

    if (isOutsideLength(value, TAG_MIN_LEN, TAG_MAX_LEN)) {
        return INVALID_ERROR_MESSAGE_TYPES.OUTSIDE_LENGTH;
    }

    if (!TAG_REGEX.test(value)) {
        return "INVALID_TAG";
    }
};

const validationNickname = (searchValue: string) => {
    if (isNullOrUndefined(searchValue) || isBlank(searchValue)) {
        return INVALID_ERROR_MESSAGE_TYPES.EMPTY;
    }

    const firstChar = searchValue.charAt(0);

    if (isNumberText(firstChar)) {
        return "INVALID_FIRST_CHAR";
    }

    if (hasEmoji(searchValue)) {
        return INVALID_ERROR_MESSAGE_TYPES.EMOJI;
    }

    if (hasInvalidSpecialCharacterStrict(searchValue)) {
        return INVALID_ERROR_MESSAGE_TYPES.SPECIAL_CHARACTER_STRICT;
    }

    if (isOutsideLength(searchValue, NICKNAME_MIN_LEN, NICKNAME_MAX_LEN)) {
        return INVALID_ERROR_MESSAGE_TYPES.OUTSIDE_LENGTH;
    }
};

const useUserProfileList = () => {
    const [state, setState] = useState<UserProfileListStateType>({
        limit: 20,
        hasNext: false,
        page: 0,
        searchValue: "",
        searchType: "nickname",
        empty: true,
        list: [],
        effectSearchFlag: false,
    });

    const isFetchingRef = useRef(false);
    const changeSearchValueTick = useRef<NodeJS.Timeout>(undefined);
    useEffect(() => {
        return () => {
            if (changeSearchValueTick.current) {
                clearTimeout(changeSearchValueTick.current);
            }
        };
    }, []);

    const changeSearchValue = useCallback((searchValue: string) => {
        if (isFetchingRef.current) {
            return;
        }

        setState((old) => {
            let searchType: "tag" | "nickname" = "nickname";
            let errorCode: string | undefined = undefined;

            if ("#" === searchValue.charAt(0)) {
                errorCode = validationTag(searchValue);
                searchType = "tag";
            } else {
                errorCode = validationNickname(searchValue);
            }

            return {
                ...old,
                page: 0,
                empty: true,
                hasNext: false,
                searchValue,
                searchType,
                errorCode,
                list: [],
                searchApiErrorCode: undefined,
                effectSearchFlag: false,
            };
        });

        if (changeSearchValueTick.current) {
            clearTimeout(changeSearchValueTick.current);
        }

        changeSearchValueTick.current = setTimeout(() => {
            if (isFetchingRef.current) {
                return;
            }

            setState((old) => {
                if (isNullOrUndefined(old.errorCode) && isNullOrUndefined(old.searchApiErrorCode) && !old.effectSearchFlag) {
                    return {
                        ...old,
                        effectSearchFlag: true,
                    };
                }

                return old;
            });
        }, 2000);
    }, []);

    const changeLimit = useCallback((limit: number) => {
        if (isFetchingRef.current) {
            return;
        }

        if (isNullOrUndefined(limit) || limit > 100 || limit < 1) {
            setState((old) => {
                return {
                    ...old,
                    errorCode: "INVALID_LIMIT_VALUE"
                };
            });
            return;
        }

        
        setState((old) => {
            return {
                ...old,
                limit,
                page: 0,
                hasNext: false,
                empty: true,
                list: [],
                searchApiErrorCode: undefined,
                errorCode: undefined,
                effectSearchFlag: true,
            };
        });
    }, []);

    const nextPage = useCallback(() => {
        if (isFetchingRef.current) {
            return;
        }

        setState(old => {
            if (old.hasNext && isNullOrUndefined(old.searchApiErrorCode) && isNullOrUndefined(old.errorCode)) {
                return {
                    ...old,
                    page: old.page + 1,
                    effectSearchFlag: true,
                };
            }

            return old;
        });
    }, []);


    const serverApiParams = useMemo<UseServerApiParamType<UsersResponseBody>>(() => {
        return {
            api: async (otps) => {
                if (state.searchValue.length < 2 || state.errorCode) {
                    return {
                        errorCode: state.errorCode
                            ? state.errorCode
                            : "INVALID_SEARCH_VALUE",
                    };
                }

                return await searchUsers(
                    {
                        searchValue: state.searchValue, 
                        searchType: state.searchType,
                        page: state.page,
                        limit: state.limit,
                    },
                    otps,
                );
            },
            errorMotionType: ERROR_MOTION_TYPE.CUSTOM,
            timeoutMs: 5_000,
        };
    }, [state.searchValue, state.searchType, state.page, state.limit, state.errorCode]);

    const { call, isFetch } = useServerApi(serverApiParams);

    const search = useCallback(async () => {
        if (isFetchingRef.current) {
            return;
        }

        isFetchingRef.current = true;
        
        try {
            const response = await call();
            
            if (response.isError) {
                setState((old) => {
                    return {
                        ...old,
                        page: 0,
                        empty: true,
                        hasNext: false,
                        list: [],
                        searchApiErrorCode : response.data.errorCode,
                        isFetch: false,
                    };
                });
                return;
            }
    
            if (response.isSuccess) {
                const { data: { empty, hasNext, list } } = response;
                setState((old) => ({
                    ...old,
                    empty,
                    hasNext,
                    list: empty
                        ? old.list
                        : old.page === 0
                            ? list
                            : [...old.list, ...list],
                    searchApiErrorCode: undefined,
                    isFetch: false,
                }));
            }
        } finally {
            isFetchingRef.current = false;
        }
    }, [call]);

    const resetPage = useCallback(async () => {
        if (isFetchingRef.current) {
            return;
        }

        setState(old => {
            return {
                ...old,
                empty: true,
                hasNext: false,
                page: 0,
                effectSearchFlag: true,
            };
        });
    }, []);

    useEffect(() => {
        if (isFetch) {
            return;
        }

        if (state.effectSearchFlag) {
            setState((old) => ({ ...old, effectSearchFlag: false, }));
            search();
        }
    }, [search, isFetch, state.effectSearchFlag]);

    return {
        searchValue: state.searchValue,
        hasNext: state.hasNext,
        errorCode: state.errorCode,
        searchType: state.searchType,
        list: state.list,
        empty: state.empty,
        searchApiErrorCode: state.searchApiErrorCode,
        handlers: {
            search,
            resetPage,
            nextPage,
            changeLimit,
            changeSearchValue,
        },
    };
};

export default useUserProfileList;