import React, { InputHTMLAttributes } from "react";
import styles from "./TextInput.module.css";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    errorMessage?: string;
    /** 라벨과 input의 배치 방향 (기본값: 'vertical') */
    layout?: "vertical" | "horizontal";
    /** i 버튼, 툴팁 등 라벨 우측에 들어갈 요소 */
    labelRightElement?: React.ReactNode;
}

export const TextInput = ({
    id,
    label,
    errorMessage,
    layout = "vertical",
    labelRightElement,
    className = "",
    disabled,
    ...restProps
}: TextInputProps) => {
    return (
        <div
            className={`
                ${styles.fieldGroup} 
                ${styles[layout]} 
                ${errorMessage !== undefined ? styles.hasError : ""} 
                ${disabled ? styles.disabled : ""} 
                ${className}
            `.trim()}
        >
            {/* 1. 라벨 영역 */}
            {label && (
                <div className={styles.labelWrapper}>
                    <label htmlFor={id}>{label}</label>
                    {labelRightElement}
                </div>
            )}

            {/* 2. Input + ErrorBox 영역 */}
            <div className={styles.inputControlGroup}>
                <input
                    id={id}
                    disabled={disabled}
                    {...restProps}
                />

                {/* 3. 에러 메시지가 있을 때만 한 줄 영역을 가지고 애니메이션 렌더링 */}
                {errorMessage !== undefined && (
                    <div className={styles.errorContainer}>
                        <div className={styles.errorTrack}>
                            <span className={styles.errorText}>{errorMessage}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};