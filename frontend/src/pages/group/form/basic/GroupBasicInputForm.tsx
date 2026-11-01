import type { FC } from "react";
import { memo } from "react";

import { TextInput } from "@/components/form/TextInput";
import { GROUP_FORM_NAME_INPUT } from "@/domains/group/form";
import useGroupBasicInputForm from "@/hooks/group/form/basic/UseGroupBasicInputForm";
import useLocale from "@/hooks/locale/useLocale";

import styles from "./GroupBasicInputForm.module.css";

import type { GroupCreateBasicNameFormData } from "@/domains/group/create";
import type { GroupFormBasicNameType } from "@/domains/group/form";
import type { LocaleType } from "@/domains/locale/locale";

const GroupBasicInputForm = () => {
    const { fullName, shortName } = useGroupBasicInputForm();
    return (
        <article
            className={ styles.basicFormWrap }
        >
            <div 
                className={ styles.basicFormWrapInner }
            >
                <GroupBasicInputBox 
                    mode="EDIT"
                    formData={ fullName }
                />
                <GroupBasicInputBox 
                    mode="EDIT"
                    formData={ shortName }
                />
            </div>
        </article>
    );
};

type GroupBasicInputBoxProps = 
    {
        mode: "EDIT",
        formData: GroupFormBasicNameType;
    } |
    {
        mode: "PREVIEW",
        data : GroupCreateBasicNameFormData;
    };

export const GroupBasicInputBox: FC<GroupBasicInputBoxProps> = memo((props) => {
    const { locale } = useLocale();

    if (props.mode === "EDIT") {
        return (
            <InputBox 
                locale={ locale }
                { ...props.formData }
            />
        );
    }

    return (
        <InputBox 
            locale={ locale }
            isPreview={ true }
            errorMessage=""
            isError={ false }
            onChange={ () => {} }
            { ...props.data }
        />
    );
});

const InputBox: FC<{ locale: LocaleType; isPreview?: boolean; } & GroupFormBasicNameType> = memo(({ locale, isPreview = false, changeNameType, errorMessage, isError, onChange, value }) => {
    const localeText = GROUP_FORM_NAME_INPUT[locale][changeNameType];
    return (
        <TextInput
            id={ changeNameType }
            value={ value }
            label={ localeText.LABEL }
            placeholder={ isPreview? "": localeText.PLACEHOLDER }
            onChange={ onChange }
            containerClassName={ styles.basicFormNameInputContainer }
            labelClassName={ styles.basicFormNameFieldLabel }
            className={ styles.input }
        >
            {
                !isPreview &&
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
            }
        </TextInput>
    );
});

export default GroupBasicInputForm;