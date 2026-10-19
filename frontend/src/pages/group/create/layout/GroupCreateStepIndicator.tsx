import type { FC } from "react";

import Image from "@/components/Image";
import { GroupCreateFlowStepByFormType } from "@/domains/group/create";
import { GROUP_CREATE_STEP_ICON, GROUP_CREATE_STEP_TITLE } from "@/domains/group/form";
import useLocale from "@/hooks/locale/useLocale";

import styles from "./GroupCreateStepIndicator.module.css";

import type { GroupCreateStepTitleTypes, GroupCreateStepTypes } from "@/domains/group/form";

const GroupCreateStepIndicator = () => {
    const { locale } = useLocale();
    const formTitles = GROUP_CREATE_STEP_TITLE[locale];
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

const GroupCreateStepList: FC<{ titles: GroupCreateStepTitleTypes; }> = ({ titles }) => {
    return (
        <ul
            className={ styles.groupCreateStepList }
        >
            {
                Object.keys(titles).map((formType) => {
                    const groupFormType = formType as GroupCreateStepTypes;
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


const GroupCreateStepItem: FC<{ formType: GroupCreateStepTypes, title: string; }> = ({ formType, title }) => {
    const icon = GROUP_CREATE_STEP_ICON[formType];
    return (
        <li
            className={styles.groupCreateStepItem}
            data-current-step={GroupCreateFlowStepByFormType[formType] === 2}
            data-valid-type={
                GroupCreateFlowStepByFormType[formType] === 1
                    ? "failed"
                    : GroupCreateFlowStepByFormType[formType] < 1
                        ? "success"
                        : "none"
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