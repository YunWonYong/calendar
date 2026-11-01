import type { FC } from "react";
import { memo, useMemo } from "react";

import { TextInput } from "@/components/form/TextInput";
import { GROUP_FORM_NAME_INPUT } from "@/domains/group/form";
import useGroupBasicInputForm from "@/hooks/group/form/basic/UseGroupBasicInputForm";
import useLocale from "@/hooks/locale/useLocale";

import styles from "./GroupBasicInputForm.module.css";

import type { GroupBasicFormChangeNameTypes, GroupFormBasicNameType, GroupFormNameInputTextType } from "@/domains/group/form";

const GroupBasicInputForm = () => {
    const { fullName, shortName } = useGroupBasicInputForm();
    return (
        <article
            className={ styles.basicFormWrap }
        >
            <div 
                className={ styles.basicFormWrapInner }
            >
                <GroupBasicInfoBox 
                    mode="EDIT"
                    changeNameType={ fullName.changeNameType }
                    value={ fullName.value }
                    onChange={ fullName.onChange }
                    isError={ fullName.isError }
                    errorMessage={ fullName.errorMessage }
                />
                <GroupBasicInfoBox 
                    mode="EDIT"
                    changeNameType={ shortName.changeNameType }
                    value={ shortName.value }
                    onChange={ shortName.onChange }
                    isError={ shortName.isError }
                    errorMessage={ shortName.errorMessage }
                />
            </div>
        </article>
    );
};

type GroupBasicInputBoxProps = 
    {
        mode: "EDIT",
        changeNameType: GroupBasicFormChangeNameTypes;
        value: string;
        errorMessage: string;
        isError: boolean;
        onChange: (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
    } |
    {
        mode: "PREVIEW",
        changeNameType: GroupBasicFormChangeNameTypes;
        value: string;
    };

export const GroupBasicInfoBox: FC<GroupBasicInputBoxProps> = memo((props) => {
    const { locale } = useLocale();
    const localeText = useMemo(() => {
        return GROUP_FORM_NAME_INPUT[locale][props.changeNameType];
    }, [props.changeNameType]);

    if (props.mode === "EDIT") {
        return (
            <InputBox 
                formData={ props }
                localeText={ localeText }
            />
        );
    }

    return (
        <PreviewInput 
            localeText={ localeText }
            changeNameType={ props.changeNameType }
            value={ props.value }
        />
    );
});

const PreviewInput: FC<{ changeNameType: GroupBasicFormChangeNameTypes; value: string; localeText: GroupFormNameInputTextType; }> = ({ changeNameType, localeText, value }) => {
    return (
        <TextInput
            id={ changeNameType }
            value={ value }
            label={ localeText.LABEL }
            containerClassName={ styles.basicFormNameInputContainer }
            labelClassName={ styles.basicFormNameFieldLabel }
            className={ styles.input }
            readOnly={ true }
        />
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