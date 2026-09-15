import { useState } from "react";

import CreateGroupButton from "@/components/group/CreateGroupButton";

import styles from "./EmptyGroupPage.module.css";

interface EmptyGroupPageProps {
    onCreateGroup?: () => void;
    onJoinGroup?: (code: string) => void;
}

const EmptyGroupPage = ({ onCreateGroup, onJoinGroup }: EmptyGroupPageProps) => {
    const [inviteCode, setInviteCode] = useState("");

    const handleJoinSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteCode.trim()) return;
        onJoinGroup?.(inviteCode.trim());
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconContainer}>
                    <div className={styles.iconBadge}>
                        <svg
                            className={styles.calendarIcon}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                            <path d="M12 14v4M10 16h4" />
                        </svg>
                    </div>
                </div>

                {/* 텍스트 안내 */}
                <h1 className={styles.title}>아직 참여 중인 그룹이 없어요</h1>
                <p className={styles.description}>
                    새로운 그룹을 만들어 일정을 공유하거나,<br />
                    초대 코드를 입력하여 기존 그룹에 참여해 보세요.
                </p>
                <CreateGroupButton 
                    onClick={ onCreateGroup }
                />
                <div className={styles.divider}>
                    <span>또는</span>
                </div>

                {/* 메인 액션 2: 초대 코드로 참여 */}
                <form className={styles.joinForm} onSubmit={handleJoinSubmit}>
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            className={styles.codeInput}
                            placeholder="초대 코드 입력 (예: ABC-123)"
                            value={inviteCode}
                            onChange={(e) => setInviteCode(e.target.value)}
                        />
                        <button
                            type="submit"
                            className={styles.joinButton}
                            disabled={!inviteCode.trim()}
                        >
                            참여
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmptyGroupPage;