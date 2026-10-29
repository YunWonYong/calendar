import type { DragEvent, FC } from "react";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import { trackClickAndPreventDefault } from "@/analytics/button";
import Button from "@/components/Button";
import Image from "@/components/Image";
import { BUTTON_SIZE } from "@/domains/button/buttonType";
import { EMBLEM_CUSTOM_FILE_ACCEPTED_TYPES, EMBLEM_CUSTOM_FILE_DROP_ZONE_TEXT, EMBLEM_CUSTOM_FILE_ERROR_MESSAGES, EMBLEM_CUSTOM_FILE_PREVIEW_TEXT, EMBLEM_CUSTOM_FILE_UPLOAD_BUTTON_TEXT } from "@/domains/group/form";
import useDevice from "@/hooks/device/UseDevice";
import useGroupCustomEmblem from "@/hooks/group/form/emblem/UseGroupCustomEmblem";
import useLocale from "@/hooks/locale/useLocale";
import { isEmpty, isNullOrUndefined } from "@/lib/validation/validation";

import styles from "./GroupCustomEmblemForm.module.css";

import type { EmblemCustomFileErrorCodeType, GroupEmblemFormCustomData } from "@/domains/group/form";
import type { LocaleType } from "@/domains/locale/locale";

const GroupCustomEmblemForm = () => {
    const { locale } = useLocale();
    const { data, errorCode, saveCustomEmblem } = useGroupCustomEmblem();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const changeFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.currentTarget;
        const file = input.files?.[0];
        saveCustomEmblem({
            file
        });
        
        input.value = "";
    }, [saveCustomEmblem]);

    const onSelectFile = useCallback(() => {
        fileInputRef.current?.click();
    }, []);
    return (
        <article className={styles.custom_emblem_form}>
            <input
                ref={fileInputRef}
                className={styles.file_input}
                type="file"
                accept={ EMBLEM_CUSTOM_FILE_ACCEPTED_TYPES.join(",") }
                onChange={changeFile}
                aria-label="select custom emblem image"
            />
            <Preview 
                locale={ locale }
                data={ data }
                onSelectFile={ onSelectFile }
            />
            <UploadSection 
                locale={ locale }
                errorCode={ errorCode }
                data={ data }
                onSelectFile={ onSelectFile }
                saveCustomEmblem={ saveCustomEmblem }
            />
        </article>
    );
};

type PreviewProps = {
    locale: LocaleType; 
    data: GroupEmblemFormCustomData;
    onSelectFile: () => void;
};
const Preview: FC<PreviewProps> = memo(({ locale, onSelectFile, data }) => {
    const { deviceType } = useDevice();
    const [previewUrl, setPreviewUrl] = useState(data.url ?? null);

    useEffect(() => {
        if (data.url) {
            setPreviewUrl(data.url);
            return;
        }

        if (!data.file) {
            setPreviewUrl(null);
            return;
        }
        
        const url = URL.createObjectURL(data.file);
        setPreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [data.url, data.file]);

    const text = EMBLEM_CUSTOM_FILE_PREVIEW_TEXT[locale];

    if (deviceType === "desktop" && previewUrl === null) {
        return null;
    }

    return (
        <section className={styles.preview}>
            <header className={styles.preview_header}>
                <h3 className={styles.preview_title}>
                    {
                        text.TITLE
                    }
                </h3>
                <p className={styles.preview_description}>
                    {
                        previewUrl
                            ?   text.DESCRIPTION_MODIFY
                            :   text.DESCRIPTION
                    }
                </p>
            </header>

            <div className={styles.preview_canvas}>
                <div className={styles.emblem_frame}>
                    {
                        previewUrl
                            ?   <Image
                                    className={styles.preview_image}
                                    src={previewUrl}
                                    alt={ text.PREVIEW_IMAGE_ALT }
                                />
                            :   deviceType !== "desktop" 
                                    ?   <div 
                                            className={styles.emptyPreview}
                                            onClick={(event) => {
                                                trackClickAndPreventDefault(
                                                    event,
                                                    "EMBLEM_CUSTOM_PREVIEW_FILE_UPLOAD",
                                                    onSelectFile
                                                )
                                            }}
                                        >
                                            <span className={styles.emptyPreviewIcon} aria-hidden="true">
                                                ＋
                                            </span>
                                            <span>{ text.EMPTY_PREVIEW_ICON }</span>
                                        </div>
                                    : null
                    }
                </div>
            </div>
        </section>
    );
});

type UploadSectionProps = {
    data: GroupEmblemFormCustomData;
    locale: LocaleType; 
    errorCode?: EmblemCustomFileErrorCodeType; 
    onSelectFile: () => void;
    saveCustomEmblem: (data: GroupEmblemFormCustomData) => void; 
};

const UploadSection: FC<UploadSectionProps> = ({ locale, data, errorCode, onSelectFile, saveCustomEmblem }) => {
    const { deviceType } = useDevice();
    const hasSelectedImage = !isNullOrUndefined(data.file) || !isEmpty(data.url);
    const showDropUploadZone = !hasSelectedImage && deviceType === "desktop";
    return (
        <section 
            className={ styles.uploadSection }
            data-show-drop-upload-zone={ showDropUploadZone }
        >

            {
                showDropUploadZone
                    ?   <UploadDropZone 
                            locale={ locale }
                            saveCustomEmblem={ saveCustomEmblem }
                            onSelectFile={ onSelectFile }
                        />
                    :   <UploadButton 
                            locale={ locale }
                            label={ 
                                hasSelectedImage
                                    ? EMBLEM_CUSTOM_FILE_UPLOAD_BUTTON_TEXT[locale].LABEL_MODIFY
                                    : EMBLEM_CUSTOM_FILE_UPLOAD_BUTTON_TEXT[locale].LABEL
                                }
                            eventName={
                                hasSelectedImage
                                    ? "EMBLEM_CUSTOM_IMAGE_UPLOAD@MODIFY"
                                    : "EMBLEM_CUSTOM_IMAGE_UPLOAD"
                            }
                            onSelectFile={ onSelectFile }
                        />
            }
            {
                errorCode && 
                    <p className={styles.error_message} role="alert">
                        {
                            EMBLEM_CUSTOM_FILE_ERROR_MESSAGES[locale][errorCode]
                        }
                    </p>
            }
        </section>
    );
};

type UploadDropZoneProps = {
    locale: LocaleType;
    onSelectFile: () => void;
    saveCustomEmblem: (data: GroupEmblemFormCustomData) => void;
};

const UploadDropZone: FC<UploadDropZoneProps> = ({ locale, onSelectFile, saveCustomEmblem, }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        // 자식 요소로 이동할 때 발생하는 불필요한 상태 변경 방지
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
            return;
        }

        setIsDragging(false);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];

        if (!file) {
            return;
        }

        saveCustomEmblem({ file });
    };

    return (
        <div
            className={`${styles.drop_zone} ${
                isDragging ? styles.dragging : ""
            }`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <span className={styles.drop_zone_icon} aria-hidden="true">
                ＋
            </span>

            <p className={styles.drop_zone_title}>
                {
                    EMBLEM_CUSTOM_FILE_DROP_ZONE_TEXT[locale].TITLE
                }
            </p>

            <span className={styles.drop_zone_separator}>
                {
                    EMBLEM_CUSTOM_FILE_DROP_ZONE_TEXT[locale].SEPARATOR
                }
            </span>

            <UploadButton 
                locale={ locale }
                label={ EMBLEM_CUSTOM_FILE_UPLOAD_BUTTON_TEXT[locale].LABEL }
                eventName="EMBLEM_CUSTOM_IMAGE_UPLOAD"
                onSelectFile={ onSelectFile }
            />
        </div>
    );
};


type UploadButtonProps = {
    locale: LocaleType;
    label: string;
    eventName: string;
    onSelectFile: () => void;
};

const UploadButton: FC<UploadButtonProps> = ({ locale, label, eventName, onSelectFile }) => {
    return (
        <div
            className={ styles.uploadButtonBox }
        >
            <Button
                eventName={ eventName }
                size={ BUTTON_SIZE.LARGE }
                onClick={ onSelectFile }
            >
                {
                    label
                }

            </Button>
            <p className={styles.upload_description}>
                {
                    EMBLEM_CUSTOM_FILE_UPLOAD_BUTTON_TEXT[locale].DESCRIPTION
                }
            </p>
        </div>
    );
};


export default GroupCustomEmblemForm;