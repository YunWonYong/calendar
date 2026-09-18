import { useState } from "react";

import GroupEmblem from "@/components/group/GroupEmblem";
import { BG_THEMES } from "@/domains/group/emblemBg";
import { ICON_PRESETS } from "@/domains/group/emblemIcon";

import styles from "./GroupEmblemTestPage.module.css";

const GroupEmblemTestPage = () => {
    const bgKeys = Object.keys(BG_THEMES);
    const iconKeys = Object.keys(ICON_PRESETS);

    const [selectedBg, setSelectedBg] = useState(bgKeys[0] || "bg-01");
    const [selectedIcon, setSelectedIcon] = useState(iconKeys[0] || "icon-01");
    const [previewSize, setPreviewSize] = useState(64);
    const [copied, setCopied] = useState(false);

    const currentEmblemId = `${selectedBg}@_@${selectedIcon}`;

    const handleCopyId = () => {
        navigator.clipboard.writeText(currentEmblemId);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>🛠️ 엠블럼 조합 테스트 보드 (Dev Only)</h3>
            </div>

            <div className={styles.content}>
                {/* [좌측] 조합 결과 및 컨트롤 영역 */}
                <div className={styles.leftPanel}>
                    <div className={styles.previewCard}>
                        <GroupEmblem emblemId={currentEmblemId} size={previewSize} />
                    </div>

                    <div className={styles.codeBox}>
                        <code>{currentEmblemId}</code>
                        <button type="button" onClick={handleCopyId}>
                            {copied ? "복사 완료!" : "ID 복사"}
                        </button>
                    </div>

                    <div className={styles.sizeControl}>
                        <label>크기 조절: {previewSize}px</label>
                        <input
                            type="range"
                            min="24"
                            max="128"
                            value={previewSize}
                            onChange={(e) => setPreviewSize(Number(e.target.value))}
                        />
                    </div>
                </div>

                {/* [우측] 배경/아이콘 선택 영역 (독립된 Y축 스크롤) */}
                <div className={styles.rightPanel}>
                    {/* 배경 테마 선택 박스 */}
                    <div className={styles.sectionGroup}>
                        <h4>배경 테마 ({bgKeys.length}개)</h4>
                        <div className={styles.scrollGrid}>
                            {bgKeys.map((bgId) => {
                                const theme = BG_THEMES[bgId];
                                return (
                                    <button
                                        key={bgId}
                                        type="button"
                                        className={`${styles.bgTile} ${selectedBg === bgId ? styles.activeBg : ""}`}
                                        style={{ background: theme?.background || "#e2e8f0" }}
                                        onClick={() => setSelectedBg(bgId)}
                                        title={bgId}
                                    >
                                        <span className={styles.tileLabel}>{bgId}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.sectionGroup}>
                        <h4>아이콘 ({iconKeys.length}개)</h4>
                        <div className={styles.scrollGrid}>
                            {iconKeys.map((iconId) => (
                                <button
                                    key={iconId}
                                    type="button"
                                    className={`${styles.iconTile} ${selectedIcon === iconId ? styles.activeIcon : ""}`}
                                    onClick={() => setSelectedIcon(iconId)}
                                    title={iconId}
                                >
                                    {/* GroupEmblem을 직접 사용하여 아이콘 렌더링 */}
                                    <GroupEmblem emblemId={`${selectedBg}@_@${iconId}`} size={28} />
                                    <span className={styles.tileLabel}>{iconId}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupEmblemTestPage;