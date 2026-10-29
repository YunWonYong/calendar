import Link from "../Link";

import styles from "./CreateGroupButton.module.css";

interface CreateGroupButtonProps {
    eventSource: string;
    className?: string;
    label?: string;
    showLabel?: boolean;
}

const CreateGroupButton = ({ eventSource, label = "새 그룹 만들기", showLabel = true, className = "", }: CreateGroupButtonProps) => {
    return (
        <Link
            to="/group/create"
            className={`${styles.createBtn} ${className}`}
            aria-label={label}
            clickEventName={ `CREATE_GROUP_BUTTON@${eventSource}` }
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
        </Link>
    );
};

export default CreateGroupButton;