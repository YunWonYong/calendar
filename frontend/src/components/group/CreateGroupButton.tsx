import { HTMLAttributes } from "react";
import styles from "./CreateGroupButton.module.css";

interface CreateGroupButtonProps extends HTMLAttributes<HTMLButtonElement> {
    label?: string;
    showLabel?: boolean;
}

const CreateGroupButton = ({ label = "새 그룹 만들기", showLabel = true, className = "", ...props }: CreateGroupButtonProps) => {
    return (
        <button
            type="button"
            className={`${styles.createBtn} ${className}`}
            title={!showLabel ? label : undefined}
            aria-label={label}
            {...props}
        >
            <div className={styles.iconEmblem}>
                <svg
                    className={styles.plusIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </div>

            {showLabel && (
                <div className={styles.labelWrapper}>
                    <span className={styles.btnText}>{label}</span>
                </div>
            )}
        </button>
    );
};

export default CreateGroupButton;