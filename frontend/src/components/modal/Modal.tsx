import type { ReactNode } from "react";

import { BUTTON_COLOR, BUTTON_SIZE } from "@/domains/button/buttonType";
import useGlobalOverlay from "@/hooks/global/overlay/useGlobalOverlay";

import Button from "../Button";
import Container from "../Container";

import styles from "./Modal.module.css";

const Modal = ({ children, useCloseButton }: { children: ReactNode; useCloseButton?: boolean; }) => {
    const { closeGlobalOverlay } = useGlobalOverlay();
    return (
        <div
            className={ styles.modalWrap }
        >
            <Container>
                {
                    children
                }
            </Container>
            {
                useCloseButton &&
                    <footer>
                        <Button 
                            title="close"
                            eventName="MODAL_CLOSE"
                            onClick={ closeGlobalOverlay }
                            size={ BUTTON_SIZE.SMALL }
                            color={ BUTTON_COLOR.BLUE }
                        />
                    </footer>
            }
        </div>
    );
};

export default Modal;