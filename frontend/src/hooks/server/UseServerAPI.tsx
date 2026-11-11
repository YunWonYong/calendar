import { useCallback, useRef, useState } from "react";

import { ERROR_MOTION_TYPE, isErrorCodeData } from "@/domains/server/useServerAPIType";

import useGlobalLoading from "../global/loading/useGlobalLoading";
import useGlobalModal from "../global/modal/useGlobalModal";

import type { ServerApiResult, UseServerApiParamType } from "@/domains/server/useServerAPIType";




const useServerApi = <R, > (params: UseServerApiParamType<R>) => {
    const [isFetch, setIsFetch] = useState<boolean>(false);
    const fetchRef = useRef<boolean>(false);
    const { createLoading, destroyLoading } = useGlobalLoading();
    const { openModal, closeModal } = useGlobalModal();
    const call = useCallback<() => Promise<ServerApiResult<R>>>(async () => {
        if (fetchRef.current === true) {
            return {
                isDuplicated: true,
                isError: false,
                isModalOpen: false,
                data: null,
            };
        }

        let isLoading = false;

        if (params.loadingOption && params.loadingOption.isLoading) {
            isLoading = true;
            createLoading(params.loadingOption.Content);
        }

        let isModalOpen = false;

        try {
            setIsFetch(true);
            fetchRef.current = true;
            const { api, errorMotionType } = params;
            const data = await api();

            if (isErrorCodeData(data)) {
                if (errorMotionType === ERROR_MOTION_TYPE.MODAL) {
                    openModal(params.Content, data, params.options);
                    isModalOpen = true;
                }

                return {
                    isDuplicated: false,
                    isError: true,
                    isModalOpen,
                    data,
                };
            }

            return {
                isDuplicated: false,
                isError: false,
                isModalOpen: false,
                data,
            };
        } finally {
            setIsFetch(() => false);
            fetchRef.current = false;

            if (isLoading && !isModalOpen) {
                destroyLoading();
            }
        }
    }, [params, createLoading, destroyLoading, openModal, closeModal]);
    return {
        isFetch,
        call
    };
};

export default useServerApi;