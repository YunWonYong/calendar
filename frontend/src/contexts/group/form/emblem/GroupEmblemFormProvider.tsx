import type { ReactNode } from "react";
import { useMemo } from "react";

import { GROUP_EMBLEM_FORM_ACTIONS, GROUP_EMBLEM_TYPE } from "@/domains/group/form";
import useGroupFormReducer from "@/hooks/group/form/UseGroupFormReducer";

import { getDefaultState, reducer } from "./GroupEmblemForm";
import GroupEmblemFormContext from "./GroupEmblemFormContext";

import type { GroupEmblemFormContextType, GroupEmblemFormData, GroupEmblemFormState } from "@/domains/group/form";

const GroupEmblemFormProvider = ({ children, formData }: { children: ReactNode; formData?: GroupEmblemFormData; }) => {
    const [state, dispatch] = useGroupFormReducer<GroupEmblemFormState>(
        getDefaultState(formData),
        reducer
    );
    const value = useMemo<GroupEmblemFormContextType>(() => {
        return {
            formData: state.formData,
            errorCodes: state.errorCodes,
            onChangeEmblemType: (changeType) => {
                dispatch({ 
                    type: GROUP_EMBLEM_FORM_ACTIONS.SELECT_EMBLEM_TAB, 
                    selectedEmblemType: changeType,
                });
            },
            saveEmblem: (params) => {
                const { data, type } = params;

                if (type === GROUP_EMBLEM_TYPE.NORMAL) {
                    dispatch({
                        type: GROUP_EMBLEM_FORM_ACTIONS.CHANGE_NORMAL_EMBLEM,
                        data,
                    });
                } else if (type === GROUP_EMBLEM_TYPE.CUSTOM) {
                    dispatch({
                        type: GROUP_EMBLEM_FORM_ACTIONS.CHANGE_CUSTOM_EMBLEM,
                        data,
                    });
                }
            },
            isValidFormData: () => state.isValid,
            currentEmblemType: state.currentEmblemType,
        };
    }, [state]);
    return (
        <GroupEmblemFormContext.Provider
            value={ value }
        >
            {
                children
            }
        </GroupEmblemFormContext.Provider>
    );
};

export default GroupEmblemFormProvider;