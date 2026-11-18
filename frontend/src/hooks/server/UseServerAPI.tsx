import { useCallback, useRef, useState } from "react";

import { ERROR_MOTION_TYPE, isErrorCodeData } from "@/domains/server/useServerAPIType";
import { getAbortController } from "@/lib/fetch";
import { isNullOrUndefined } from "@/lib/validation/validation";

import useGlobalLoading from "../global/loading/useGlobalLoading";
import useGlobalModal from "../global/modal/useGlobalModal";

import type { ServerApiResult, UseServerApiParamType } from "@/domains/server/useServerAPIType";

const useServerApi = <R, > (params: UseServerApiParamType<R>) => {
    const [isFetch, setIsFetch] = useState<boolean>(false);
    const fetchRef = useRef<boolean>(false);
    const { createLoading, destroyLoading } = useGlobalLoading();
    const { openModal } = useGlobalModal();
    const call = useCallback<() => Promise<ServerApiResult<R>>>(async () => {
        if (fetchRef.current === true) {
            return {
                isSuccess: false,
                isDuplicated: true,
                isError: false,
                isModalOpen: false,
                data: null,
            };
        }

        fetchRef.current = true;
        let isLoading = false;

        const timeoutMs = params.timeoutMs ?? 30_000;

        if (params.loadingOption && params.loadingOption.isLoading) {
            isLoading = true;
            createLoading(params.loadingOption.Content);
        }

        let isModalOpen = false;

        let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

        try {
            setIsFetch(true);
            const { api, errorMotionType } = params;
            const { timeoutId: tid, signal } = getAbortController(timeoutMs);
            timeoutId = tid;

            const data = await api({ signal });

            if (isErrorCodeData(data)) {
                if (errorMotionType === ERROR_MOTION_TYPE.MODAL) {
                    openModal(params.Content, data, params.options);
                    isModalOpen = true;
                }

                return {
                    isSuccess: false,
                    isDuplicated: false,
                    isError: true,
                    isModalOpen,
                    data,
                };
            }

            return {
                isSuccess: true,
                isError: false,
                isModalOpen,
                data,
            };
        } finally {
            setIsFetch(() => false);
            fetchRef.current = false;

            if (isLoading && !isModalOpen) {
                destroyLoading();
            }

            if (!isNullOrUndefined(timeoutId)) {
                clearTimeout(timeoutId);
            }
        }
    }, [params, createLoading, destroyLoading, openModal]);
    return {
        isFetch,
        call
    };
};

export default useServerApi;