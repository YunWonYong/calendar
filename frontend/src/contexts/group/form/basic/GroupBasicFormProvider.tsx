
import { GROUP_BASIC_ACTION_TYPES } from "@/domains/group/form";
import useGroupFormReducer from "@/hooks/group/form/UseGroupFormReducer";

import { getDefaultState, reducer } from "./GroupBasicForm";
import GroupBasicFormContext from "./GroupBasicFormContext";

import type { GroupBasicFormChangeNameHandleType, GroupBasicFormData, GroupBasicFormSelectPlanIdHandleType, GroupBasicFormState } from "@/domains/group/form";
import type { ReactNode } from "react";

const GroupBasicFormProvider = ({ children, formData }: { children: ReactNode; formData?: GroupBasicFormData; }) => {
    const [state, dispatch] = useGroupFormReducer<GroupBasicFormState>(
        getDefaultState(formData),
        reducer
    );

    const onChangeName: GroupBasicFormChangeNameHandleType = (type, value) => {
        dispatch({ type: GROUP_BASIC_ACTION_TYPES[type], value });
    };

    const onSelectPlanId: GroupBasicFormSelectPlanIdHandleType = (type, selectedPlanId) => {
        dispatch({ type: GROUP_BASIC_ACTION_TYPES[type], selectedPlanId });
    };

    return (
        <GroupBasicFormContext.Provider
            value={{
                ...state,
                isValidFormData: () => state.isValid,
                onChangeName,
                onSelectPlanId
            }}
        >
            {
                children
            }
        </GroupBasicFormContext.Provider>
    );

};

export default GroupBasicFormProvider;