import { useMemo } from "react";

import { CHANGE_NAME_TYPE, FULL_NAME_MAX_LENGTH, FULL_NAME_MIN_LENGTH, SHORT_NAME_MAX_LENGTH, SHORT_NAME_MIN_LENGTH } from "@/domains/group/form";

import useGroupBasicForm from "./UseGroupBasicForm";

import type { GroupFormBasicNameType } from "@/domains/group/form";

const useGroupBasicInputForm = () => {
    const ctx = useGroupBasicForm();

    const { formData, errorCodes: errorMessages, onChangeName } = ctx;

    const fullName = useMemo<GroupFormBasicNameType>(() => {
        const changeNameType = CHANGE_NAME_TYPE.FULL_NAME;
        return {
            changeNameType,
            value: formData.fullName,
            errorMessageType: errorMessages.fullName,
            min: FULL_NAME_MIN_LENGTH,
            max: FULL_NAME_MAX_LENGTH,
            onChange: (event) => 
                onChangeName(
                    changeNameType, 
                    event.target.value,
                ),
        };
    }, [formData.fullName, errorMessages.fullName, onChangeName]);

    const shortName = useMemo<GroupFormBasicNameType>(() => {
        const changeNameType = CHANGE_NAME_TYPE.SHORT_NAME;
        return {
            changeNameType,
            value: formData.shortName,
            errorMessageType: errorMessages.shortName,
            min: SHORT_NAME_MIN_LENGTH,
            max: SHORT_NAME_MAX_LENGTH,
            onChange: (event) => 
                onChangeName(
                    changeNameType, 
                    event.target.value,
                ),
        };
    }, [formData.shortName, errorMessages.shortName, onChangeName]);

    return {
        fullName,
        shortName
    };
};

export default useGroupBasicInputForm;