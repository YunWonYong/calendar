import { useCallback, useMemo } from "react";

import Modal from "@/components/modal/Modal";

import useGlobalOverlay from "../overlay/useGlobalOverlay";

import type { ModalContentType } from "@/domains/global/modal/globalModalType";
import type { OpenGlobalOverlayOptions } from "@/domains/global/overlay/globalOverlayType";

const useGlobalModal = () => {
    const { openGlobalOverlay, updateGlobalOverlay, closeGlobalOverlay, isOpenGlobalOverlay } = useGlobalOverlay();

    const openModal = useCallback(<T, >(Content: ModalContentType<T>, props: T, opts?: { useCloseButton?: boolean; } & OpenGlobalOverlayOptions) => {
        let fn = openGlobalOverlay;

        if (isOpenGlobalOverlay) {
            fn = updateGlobalOverlay;
        }

        fn(
            () => (
                <Modal
                    useCloseButton={ opts && opts.useCloseButton }
                >
                    <Content
                        props={ props }
                    >
                    </Content>
                </Modal>
            ),
            {
                isOverlayClickClose: opts && opts.isOverlayClickClose,
                onClick: opts && opts.onClick
            },
        );
    }, [openGlobalOverlay, isOpenGlobalOverlay, updateGlobalOverlay]);

    const value = useMemo(() => {
        return {
            openModal,
            closeModal: closeGlobalOverlay,
        };
    }, [openModal, closeGlobalOverlay]);
    
    return value;
};

export default useGlobalModal;