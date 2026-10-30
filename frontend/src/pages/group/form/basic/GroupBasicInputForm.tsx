import type { FC } from "react";
import { memo, useMemo } from "react";

import { TextInput } from "@/components/form/TextInput";
import { GROUP_FORM_NAME_INPUT } from "@/domains/group/form";
import useGroupBasicInputForm from "@/hooks/group/form/basic/UseGroupBasicInputForm";
import useLocale from "@/hooks/locale/useLocale";

import styles from "./GroupBasicInputForm.module.css";

import type { GroupFormBasicNameType, GroupFormNameInputTextType } from "@/domains/group/form";

const GroupBasicInputForm = () => {
    const { locale } = useLocale();
    const { fullName, shortName } = useGroupBasicInputForm();
    const localeFullNameText = useMemo(() => {
        return GROUP_FORM_NAME_INPUT[locale][fullName.changeNameType];
    }, [locale, fullName.changeNameType]);

    const localeShortNameText = useMemo(() => {
        return GROUP_FORM_NAME_INPUT[locale][shortName.changeNameType];
    }, [locale, shortName.changeNameType]);
    return (
        <article
            className={ styles.basicFormWrap }
        >
            <div 
                className={ styles.basicFormWrapInner }
            >
                <InputBox 
                    formData={ fullName }
                    localeText={ localeFullNameText }
                />
                <InputBox
                    formData={ shortName }
                    localeText={ localeShortNameText }
                />
            </div>
        </article>
    );
};

const InputBox: FC<{ formData: GroupFormBasicNameType; localeText: GroupFormNameInputTextType; }> = memo(({ formData, localeText }) => {
    const { changeNameType, value, onChange, isError, errorMessage  } = formData;
    return (
        <TextInput
            id={ changeNameType }
            value={ value }
            label={ localeText.LABEL }
            placeholder={ localeText.PLACEHOLDER }
            onChange={ onChange }
            containerClassName={ styles.basicFormNameInputContainer }
            labelClassName={ styles.basicFormNameFieldLabel }
            className={ styles.input }
        >
            <span
                className={ styles.basicFormNameFieldHelperText }
                data-is-error={ isError }
            >
                {
                    isError
                        ?   errorMessage 
                        :   localeText.DESCRIPTION
                }
            </span>
        </TextInput>
    );
});

export default GroupBasicInputForm;