import { useMemo } from "react";

import { CHANGE_NAME_TYPE } from "@/domains/group/form";

import useGroupBasicForm from "./UseGroupBasicForm";

import type { GroupFormBasicNameType } from "@/domains/group/form";

const useGroupBasicNames = () => {
    const ctx = useGroupBasicForm();

    const { formData, errorCodes: errorMessages, onChangeName } = ctx;

    const fullName = useMemo<GroupFormBasicNameType>(() => {
        const changeNameType = CHANGE_NAME_TYPE.FULL_NAME;
        return {
            changeNameType,
            value: formData.fullName,
            errorMessage: errorMessages.fullName,
            isError: errorMessages.fullName.length > 0,
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
            errorMessage: errorMessages.shortName,
            isError: errorMessages.shortName.length > 0,
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

export default useGroupBasicNames;