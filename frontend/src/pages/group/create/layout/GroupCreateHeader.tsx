import ThemeToggleButton from "@/components/theme/ThemeToggleButton";
import { GROUP_CREATE_HEADER_TITLES } from "@/domains/group/create";
import { DisplayMode } from "@/domains/theme/themeButtonType";
import useLocale from "@/hooks/locale/useLocale";

import styles from "./GroupCreateHeader.module.css";

const GroupCreateHeader = () => {
    const { locale } = useLocale();
    return (
        <header
            className={ styles.groupCreateHeader }
        >
            <h1
                className={ styles.groupCreateHeaderTitle }
            >
                {
                    GROUP_CREATE_HEADER_TITLES[locale]
                }
            </h1>
            <ul
                className={ styles.groupCreateHeaderUtils }
            >
                <li>
                    한국어
                </li>
                <li>
                    <ThemeToggleButton 
                        source="GROUP_CREATE_HEADER"
                        displayMode={ DisplayMode.CIRCLE }
                        className={ styles.themeToggleBtn }
                    />
                </li>
            </ul>
        </header>
    );
};

export default GroupCreateHeader;