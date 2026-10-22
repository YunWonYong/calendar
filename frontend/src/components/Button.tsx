import type { FC } from "react";

import { trackClickAndPreventDefault } from "@/analytics/button";
import { BUTTON_COLOR, BUTTON_SIZE } from "@/domains/button/buttonType";

import styles from "./Button.module.css";

import type { ButtonProps } from "@/domains/button/buttonType";

const Button: FC<ButtonProps> = (props) => {
    const { eventName, title, children, disabled, ...r } = props;
    const { size = BUTTON_SIZE.SMALL, color = BUTTON_COLOR.DEFAULT, className = "", ...restProps } = r;
    return (
        <button
            { ...restProps }
            onClick={(event) => {
                if (disabled) {
                    return;
                }

                trackClickAndPreventDefault(
                    event,
                    eventName,
                    props.onClick
                )
            }}
            className={ `${className} ${styles.btn} ${styles[size]} ${styles[color]}` }
        >
            {
                title 
                    ?   <span>
                            {
                                title
                            }
                        </span>
                    :   children
            }
        </button>
    );
};

export default Button;