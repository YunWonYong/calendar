import type { FC, MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { trackClickAndPreventDefault } from "@/analytics/button";
import { LOCALE_LABEL_DATAS } from "@/domains/locale/locale";
import useLocale from "@/hooks/locale/useLocale";

import styles from "./LocaleDropBox.module.css";

import type { LocaleLabelType, LocaleType } from "@/domains/locale/locale";

type ChangeLocaleHandlerType = (event: MouseEvent<HTMLLIElement>, localeType: LocaleType) => void;

const LocaleDropBox: FC<{ eventSource: string; }> = ({ eventSource }) => {
    const { locale, otherLocaleList, changeLocale } = useLocale();
    const [ isDrop, setIsDrop ] = useState<boolean>(false);
    const localeDropBoxWrapRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!isDrop) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target;

            if (
                target instanceof Node &&
                !localeDropBoxWrapRef.current?.contains(target)
            ) {
                setIsDrop(() => false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsDrop(() => false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };

    }, [isDrop]);

    const changeLocaleHandler = useCallback<ChangeLocaleHandlerType>((event, localeType) => {
        if (locale !== localeType) {
            trackClickAndPreventDefault(
                event,
                `CHANGE_LOCALE@${locale}->${localeType}`,
                () => changeLocale(localeType)
            );
        }

        setIsDrop(false);
        
    }, [locale, changeLocale]);

    const toggleDropBox = (event: MouseEvent<HTMLDivElement>) => {
        trackClickAndPreventDefault(
            event,
            `LOCALE_DROP_BOX@${eventSource}`,
            () => setIsDrop((previous) => !previous),
        );
    };

    return (
        <div
            ref={ localeDropBoxWrapRef }
            className={ styles.localeDropBoxWrap }
            onMouseLeave={() => setIsDrop(false)}
        >
            <div
                className={ styles.selectedLocaleBox }
                onClick={(event) => toggleDropBox(event)}
            >
                <LanguageIcon />
                <LocaleLabel 
                    labelData={LOCALE_LABEL_DATAS[locale]} 
                    wrapClassName={ styles.selectedLocaleLabelWrap }
                />
            </div>
            <DropBox 
                otherLocaleList={ otherLocaleList }
                changeLocaleHandler={ changeLocaleHandler }
                isDrop={ isDrop }
            />
        </div>
    );
};

const DropBox: FC<{ isDrop: boolean; otherLocaleList: LocaleType[]; changeLocaleHandler: ChangeLocaleHandlerType; }> = ({ isDrop, otherLocaleList, changeLocaleHandler }) => {
    return (
        <ul
            className={styles.localeDropBox}
            data-open={isDrop}
            role="listbox"
            aria-label="언어 선택"
            aria-hidden={!isDrop}
        >
            {
                otherLocaleList.map(localeType => {
                    const localeLabelData = LOCALE_LABEL_DATAS[localeType];
                    return (
                        <li
                            key={ localeType }
                            className={ styles.localeOption }
                            role="option" 
                            onClick={(event) => {
                                changeLocaleHandler(event, localeType);
                            }}
                            tabIndex={isDrop ? 0 : -1}
                        >
                            <LocaleLabel 
                                labelData={localeLabelData} 
                                wrapClassName={ styles.localeLabelWrap }
                            />
                        </li>
                    );
                })
            }
        </ul>
    );
};

const LocaleLabel: FC<{ labelData: LocaleLabelType; wrapClassName?: string; }> = ({ labelData, wrapClassName }) => {
    const { label, code } = labelData;
    return (
        <div
            className={ wrapClassName }
        >
            <span
                className={ styles.localeLabel }
            >
                {
                    label
                }
            </span>
            <span
                className={ styles.localeCode }
            >
                {
                    code
                }
            </span>
        </div>
    );
};

const LanguageIcon = () => {
    return (
        <div
            className={styles.languageIconWrap}
        >
            <svg
                className={styles.languageIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 3.5a1 1 0 0 1 1 1V5h3a1 1 0 1 1 0 2h-.627c-.313 1.912-.929 3.524-1.936 4.819.752.525 1.675.928 2.806 1.21a1 1 0 1 1-.486 1.941c-1.461-.365-2.717-.928-3.757-1.725-1.04.797-2.296 1.36-3.757 1.725a1 1 0 1 1-.486-1.94c1.131-.283 2.054-.686 2.806-1.211C5.556 10.524 4.94 8.912 4.628 7H4a1 1 0 0 1 0-2h3v-.5a1 1 0 0 1 1-1ZM9.342 7C9.076 8.414 8.626 9.527 8 10.401 7.374 9.527 6.924 8.414 6.658 7h2.684Zm8.552 3.553a1 1 0 0 0-1.788 0l-4 8a1 1 0 1 0 1.788.894L14.618 18h4.764l.724 1.447a1 1 0 1 0 1.788-.894l-4-8ZM17 13.236 18.382 16h-2.764L17 13.236Z"
                />
            </svg>
        </div>
    );
};


export default LocaleDropBox;