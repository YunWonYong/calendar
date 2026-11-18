import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";

import { GROUP_MEMBERS_FORM_ACTIONS } from "@/domains/group/form";
import useGroupFormReducer from "@/hooks/group/form/UseGroupFormReducer";

import { getDefaultState, reducer } from "./GroupMembersForm";
import GroupMembersFormContext from "./GroupMembersFormContext";

import type { GroupMembersContextType, GroupMembersFormState } from "@/domains/group/form";
import type { GroupMemberType } from "@/domains/group/member";

const GroupMembersFormProvider = ({ children, formData }: { children: ReactNode; formData?: GroupMemberType[]; }) => {
    const [state, dispatch] = useGroupFormReducer<GroupMembersFormState>(
        getDefaultState(formData),
        reducer
    );

    const { formData: stateFormData, searchOptions } = state;

    const addMember = useCallback((member: GroupMemberType) => {
        dispatch({ 
            type: GROUP_MEMBERS_FORM_ACTIONS.ADD_MEMBER, 
            data: member,
        });
    }, []);

    const removeMember = useCallback((userId: number) => {
        dispatch({ 
            type: GROUP_MEMBERS_FORM_ACTIONS.REMOVE_MEMBER,
            userId 
        });
    }, []);

    const modifyMember = useCallback((member: GroupMemberType) => {
        dispatch({
            type: GROUP_MEMBERS_FORM_ACTIONS.MODIFY_MEMBER,
            data: member
        });
    }, []);

    const isValidFormData = useCallback(() => {
        return true;
    }, []);

    const value = useMemo<GroupMembersContextType>(() => {
        return {
            formData: stateFormData,
            searchValue: searchOptions.input,
            searchErrorCode: searchOptions.errorCode,
            isValidFormData,
            addMember,
            removeMember,
            modifyMember,
        };
    }, [stateFormData, searchOptions.input, searchOptions.errorCode, addMember, removeMember, modifyMember, isValidFormData]);
    return (
        <GroupMembersFormContext.Provider
            value={ value }
        >
            {
                children
            }
        </GroupMembersFormContext.Provider>
    );
};

export default GroupMembersFormProvider;