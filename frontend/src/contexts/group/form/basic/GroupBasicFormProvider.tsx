
import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";

import { GROUP_BASIC_ACTION_TYPES } from "@/domains/group/form";
import useGroupFormReducer from "@/hooks/group/form/UseGroupFormReducer";

import { getDefaultState, reducer } from "./GroupBasicForm";
import GroupBasicFormContext from "./GroupBasicFormContext";

import type { GroupBasicFormChangeNameHandleType, GroupBasicFormData, GroupBasicFormSelectPlanIdHandleType, GroupBasicFormState } from "@/domains/group/form";

const GroupBasicFormProvider = ({ children, formData }: { children: ReactNode; formData?: GroupBasicFormData; }) => {
    const [state, dispatch] = useGroupFormReducer<GroupBasicFormState>(
        getDefaultState(formData),
        reducer
    );

    const onChangeName = useCallback<GroupBasicFormChangeNameHandleType>((type, value) => {
        dispatch({ type: GROUP_BASIC_ACTION_TYPES[type], value });
    }, []);

    const onSelectPlanId = useCallback<GroupBasicFormSelectPlanIdHandleType>((type, selectedPlanId) => {
        dispatch({ type: GROUP_BASIC_ACTION_TYPES[type], selectedPlanId });
    }, []);

    const isValidFormData = useCallback(() => state.isValid, [state.isValid]);
    
    const contextValue = useMemo(() => ({
        ...state,
        isValidFormData,
        onChangeName,
        onSelectPlanId
    }), [state, isValidFormData, onChangeName, onSelectPlanId]);

    return (
        <GroupBasicFormContext.Provider
            value={ contextValue }
        >
            {
                children
            }
        </GroupBasicFormContext.Provider>
    );

};

export default GroupBasicFormProvider;