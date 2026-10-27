import { useEffect, useRef, useState } from "react";

import useGroupCustomEmblem from "@/hooks/group/form/emblem/UseGroupCustomEmblem";
import styles from "./GroupCustomEmblemForm.module.css";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

const GroupCustomEmblemForm = () => {
    const { data, errorMessage, saveCustomEmblem } = useGroupCustomEmblem();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fileError, setFileError] = useState("");

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!ACCEPTED_TYPES.includes(file.type)) {
            setFileError("PNG, JPG, WEBP 형식의 이미지 파일만 업로드할 수 있습니다.");
            event.target.value = "";
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setFileError("이미지 파일은 5MB 이하로 업로드해주세요.");
            event.target.value = "";
            return;
        }

        setFileError("");
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleSelectFile = () => {
        fileInputRef.current?.click();
    };

    return (
        <article className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>커스텀 엠블럼</h2>
                <p className={styles.description}>
                    원하는 이미지를 업로드해 그룹만의 엠블럼을 만들어보세요.
                </p>
            </header>

            <section className={styles.previewSection} aria-label="엠블럼 미리보기">
                <div className={styles.preview}>
                    {previewUrl ? (
                        <img
                            className={styles.previewImage}
                            src={previewUrl}
                            alt="업로드한 엠블럼 미리보기"
                        />
                    ) : (
                        <div className={styles.emptyPreview}>
                            <span className={styles.emptyPreviewIcon} aria-hidden="true">
                                ＋
                            </span>
                            <span>이미지를 선택해주세요</span>
                        </div>
                    )}
                </div>

                <p className={styles.previewCaption}>
                    미리보기
                </p>
            </section>

            <section className={styles.uploadSection}>
                <input
                    ref={fileInputRef}
                    className={styles.fileInput}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleFileChange}
                    aria-label="엠블럼 이미지 선택"
                />

                <button
                    className={styles.uploadButton}
                    type="button"
                    onClick={handleSelectFile}
                >
                    이미지 선택
                </button>

                <p className={styles.helpText}>
                    PNG, JPG, WEBP · 최대 5MB
                </p>

                {fileError && (
                    <p className={styles.errorMessage} role="alert">
                        {fileError}
                    </p>
                )}

                {errorMessage && (
                    <p className={styles.errorMessage} role="alert">
                        {errorMessage}
                    </p>
                )}
            </section>

            <footer className={styles.footer}>
                <button
                    className={styles.saveButton}
                    type="button"
                    onClick={() => saveCustomEmblem}
                    disabled={!previewUrl}
                >
                    엠블럼 저장
                </button>
            </footer>
        </article>
    );
};

export default GroupCustomEmblemForm;