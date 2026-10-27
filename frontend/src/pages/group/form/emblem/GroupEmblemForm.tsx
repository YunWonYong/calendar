import type { FC } from "react";
import { memo } from "react";

import { trackClickAndPreventDefault } from "@/analytics/button";
import { GROUP_EMBLEM_TYPE, GROUP_FORM_EMBLEM_HEADER_TEXT } from "@/domains/group/form";
import useGroupEmblemForm from "@/hooks/group/form/emblem/UseGroupEmblemForm";
import useLocale from "@/hooks/locale/useLocale";

import GroupCustomEmblemForm from "./GroupCustomEmblemForm";
import GroupNormalEmblemForm from "./GroupNormalEmblemForm";

import styles from "./GroupEmblemForm.module.css";

import type { GroupEmblemTypes } from "@/domains/group/form";
import type { LocaleType } from "@/domains/locale/locale";

const GroupEmblemForm = () => {
    const { locale } = useLocale();
    const { currentEmblemType, onChangeEmblemType } = useGroupEmblemForm();
    return (
        <section
            className={ styles.container }
        >
            <TabBox 
                locale={ locale }
                currentEmblemType={ currentEmblemType }
                onChangeEmblemType={ onChangeEmblemType }
            />
            <div
                className={ styles.content }
            >
                {
                    currentEmblemType === GROUP_EMBLEM_TYPE.NORMAL
                        ? <GroupNormalEmblemForm />
                        : <GroupCustomEmblemForm />
                }
            </div>
        </section>
    );
};

const TabBox: FC<{ locale: LocaleType; currentEmblemType: GroupEmblemTypes; onChangeEmblemType: (changeType: GroupEmblemTypes) => void; }> = memo(({ locale, currentEmblemType, onChangeEmblemType }) => {
    return (
        <ul
            className={ styles.tabList }
            data-select-emblem-tab={ currentEmblemType }
        >
            <Tab 
                locale={ locale }
                currentEmblemType={ currentEmblemType }
                emblemType={ GROUP_EMBLEM_TYPE.NORMAL }
                onChangeEmblemType={ onChangeEmblemType }
            />
            <Tab 
                locale={ locale }
                currentEmblemType={ currentEmblemType }
                emblemType={ GROUP_EMBLEM_TYPE.CUSTOM }
                onChangeEmblemType={ onChangeEmblemType }
            />
        </ul>
    );
});

const Tab: FC<{ locale: LocaleType; currentEmblemType: GroupEmblemTypes; emblemType: GroupEmblemTypes; onChangeEmblemType: (changeType: GroupEmblemTypes) => void; }> = memo(({ locale, currentEmblemType, emblemType, onChangeEmblemType }) => {
    const isSelected = currentEmblemType === emblemType;
    return (
        <li
            className={ styles.tab }
            data-selected={ isSelected }
            onClick={(event) => {
                if (!isSelected) {
                    trackClickAndPreventDefault(
                        event,
                        `GROUP_EMBLEM_FORM_TAB@${currentEmblemType}->${emblemType}`,
                        () => onChangeEmblemType(emblemType)
                    );
                }
            }}
        >
            {
                GROUP_FORM_EMBLEM_HEADER_TEXT[locale][emblemType]
            }
        </li>
    );
});

export default GroupEmblemForm;