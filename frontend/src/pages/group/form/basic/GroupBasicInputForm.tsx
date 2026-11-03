import type { FC } from "react";
import { memo } from "react";

import { TextInput } from "@/components/form/TextInput";
import { GROUP_FORM_NAME_INPUT } from "@/domains/group/form";
import useGroupBasicInputForm from "@/hooks/group/form/basic/UseGroupBasicInputForm";
import useLocale from "@/hooks/locale/useLocale";
import { getInvalidErrorMessageByLocale } from "@/lib/validation/errorMessage";

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
            errorMessageType={ null }
            onChange={ () => {} }
            min={ 0 }
            max={ 0 }
            { ...props.data }
        />
    );
});

const InputBox: FC<{ locale: LocaleType; isPreview?: boolean; } & GroupFormBasicNameType> = memo(({ locale, isPreview = false, changeNameType, errorMessageType, onChange, value, min, max }) => {
    const localeText = GROUP_FORM_NAME_INPUT[locale][changeNameType];
    const isError = errorMessageType !== null;
    const errorMessage = isError 
        ?   getInvalidErrorMessageByLocale(
            errorMessageType, 
            locale,
            {
                maxLength: max,
                minLength: min
            }
        )
        :   undefined;
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
            min={ min }
            minLength={ min }
            max={ max }
            maxLength={ max }
        >
            {
                !isPreview &&
                    <span
                        className={ styles.basicFormNameFieldHelperText }
                        data-is-error={ isError }
                    >
                        {
                            value.length === 0
                                ?   localeText.DESCRIPTION
                                :   isError
                                        ? errorMessage 
                                        : undefined 
                        }
                    </span>
            }
        </TextInput>
    );
});

export default GroupBasicInputForm;