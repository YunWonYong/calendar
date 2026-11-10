import { useCallback, useMemo } from "react";

import Modal from "@/components/modal/Modal";
import useLocale from "@/hooks/locale/useLocale";

import useGlobalOverlay from "../overlay/useGlobalOverlay";

import type { OpenGlobalOverlayOptions } from "@/domains/global/overlay/overlayType";
import type { ModalContentType } from "@/domains/modal/modalType";

const useGlobalModal = () => {
    const { openGlobalOverlay, updateGlobalOverlay, closeGlobalOverlay } = useGlobalOverlay();
    const { locale } = useLocale();

    const openModal = useCallback(<T, >(Content: ModalContentType<T>, props: T, opts?: { useCloseButton?: boolean; } & OpenGlobalOverlayOptions) => {
        openGlobalOverlay(
            () => (
                <Modal
                    useCloseButton={ opts && opts.useCloseButton }
                >
                    <Content
                        locale={ locale }
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
    }, [locale, openGlobalOverlay]);

    const updateModal = useCallback(<T, >(Content: ModalContentType<T>, props: T, opts?: { useCloseButton?: boolean; } & OpenGlobalOverlayOptions) => {
        updateGlobalOverlay(
            () => (
                <Modal
                    useCloseButton={ opts && opts.useCloseButton }
                >
                    <Content
                        locale={ locale }
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
    }, [locale, updateGlobalOverlay]);

    const value = useMemo(() => {
        return {
            openModal,
            updateModal,
            closeModal: closeGlobalOverlay,
        };
    }, [openModal, updateModal, closeGlobalOverlay]);
    
    return value;
};

export default useGlobalModal;