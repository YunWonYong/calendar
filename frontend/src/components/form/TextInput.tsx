import React, { FC, InputHTMLAttributes } from "react";

import styles from "./TextInput.module.css";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    errorMessage?: string;
    descriptionMessage?: string;
    layout?: "vertical" | "horizontal";
    labelRightElement?: React.ReactNode;
}

export const TextInput: FC<TextInputProps> = ({ id, label, errorMessage, descriptionMessage, layout = "vertical", labelRightElement, className = "", disabled, ...restProps }) => {
    const isError = errorMessage !== undefined && errorMessage.length > 0;
    return (
        <div
            className={`
                ${styles.fieldGroup} 
                ${styles[layout]} 
                ${isError? styles.hasError : ""} 
                ${disabled ? styles.disabled : ""} 
                ${className}
            `.trim()}
        >
            {label && (
                <div className={styles.labelWrapper}>
                    <label htmlFor={id}>{label}</label>
                    {labelRightElement}
                </div>
            )}
            <div className={styles.inputControlGroup}>
                <input
                    id={id}
                    disabled={disabled}
                    {...restProps}
                />
                {
                    isError
                        ?   <ErrorTextBox
                                errorMessage={ errorMessage }
                            />
                        :   <DescriptionTextBox 
                                descriptionMessage={ descriptionMessage }
                            />
                }
            </div>
        </div>
    );
};

type ErrorTextBoxProps = {
    errorMessage: string;
};

const ErrorTextBox: FC<ErrorTextBoxProps> = ({ errorMessage }) => {
    return (
        <div 
            className={ styles.errorContainer }
        >
            <div 
                className={ styles.errorTrack }
            >
                <span 
                    className={ styles.errorText }
                >
                    { errorMessage }
                </span>
            </div>
        </div>
    );
};

type DescriptionTextBoxProps = {
    descriptionMessage?: string;
};

const DescriptionTextBox: FC<DescriptionTextBoxProps> = ({ descriptionMessage }) => {
    return (
        <div 
            className={ styles.errorContainer }
        >
            <div 
                className={ styles.errorTrack }
            >
                <span 
                    className={ styles.errorText }
                >
                    {descriptionMessage}
                </span>
            </div>
        </div>
    );
};