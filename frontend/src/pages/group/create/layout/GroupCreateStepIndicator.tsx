import type { FC } from "react";

import Image from "@/components/Image";
import { GroupCreateFlowStepByFormType } from "@/domains/group/create";
import { GROUP_FORM_ICON, GROUP_FORM_TITLE } from "@/domains/group/form";
import useGroupCreateFlow from "@/hooks/group/create/UseGroupCreateFlow";
import useLocale from "@/hooks/locale/useLocale";

import styles from "./GroupCreateStepIndicator.module.css";

import type { GroupFormTitleTypes, GroupFormTypes } from "@/domains/group/form";

const GroupCreateStepIndicator = () => {
    const { locale } = useLocale();
    const formTitles = GROUP_FORM_TITLE[locale];
    return (
        <nav
            className={ styles.groupCreateStepNav }
        >
            <GroupCreateStepList
                titles={ formTitles }
            />
        </nav>
    );
};

const GroupCreateStepList: FC<{ titles: GroupFormTitleTypes; }> = ({ titles }) => {
    return (
        <ul
            className={ styles.groupCreateStepList }
        >
            {
                Object.keys(titles).map((formType) => {
                    const groupFormType = formType as GroupFormTypes;
                    return (
                        <GroupCreateStepItem 
                            key={ groupFormType } 
                            formType={ groupFormType }
                            title={ titles[groupFormType] }
                        />
                    );
                })
            }
        </ul>
    );
};


const GroupCreateStepItem: FC<{ formType: GroupFormTypes, title: string; }> = ({ formType, title }) => {
    const { steps: { current } } = useGroupCreateFlow();
    const icon = GROUP_FORM_ICON[formType];
    return (
        <li
            className={styles.groupCreateStepItem}
            data-current-step={GroupCreateFlowStepByFormType[formType] === current}
            data-valid-type={
                GroupCreateFlowStepByFormType[formType] >= current
                    ? "none"
                    : "success"
            }
        >
            <Image
                src={icon}
                alt={`${formType} icon`}
                className={ styles.groupCreateStepIcon}
            />

            <span className={ styles.groupCreateStepTitle}>
                {title}
            </span>
        </li>
    );
};

export default GroupCreateStepIndicator;