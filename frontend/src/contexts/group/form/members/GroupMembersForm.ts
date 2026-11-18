import { GROUP_MEMBERS_FORM_ACTIONS } from "@/domains/group/form";
import { GROUP_MEMBER_MANIPULATION_TYPES } from "@/domains/group/member";
import { isNullOrUndefined } from "@/lib/validation/validation";

import type { GroupChangeMembersType, GroupFormReducerType, GroupMemberFormDataType, GroupMembersFormData, GroupMembersFormState } from "@/domains/group/form";
import type { GroupMemberManipulationType, GroupMemberType } from "@/domains/group/member";

export const getDefaultState = (members?: GroupMemberType[]) => {
    const oldFormData: GroupMemberType[] = isNullOrUndefined(members)
        ? []
        : members.map((member) => ({ ...member }));

    const state: GroupMembersFormState = {
        oldFormData,
        formData: {
            members: oldFormData.map(
                (member) => { 
                    return {
                        ...member,
                        manipulationType: GROUP_MEMBER_MANIPULATION_TYPES.NONE
                    }; 
                }
            )
        },
        changeMembers: {},
        isDirty: false,
        isValid: true,
        searchOptions: {
            input: "",
            errorCode: undefined
        },
    };
    return state;
};

const getOriginMember = (memberUserId: number, members?: GroupMemberType[]) => {
    return getMember(memberUserId, members);
};

const getFormDataMember = (members: GroupMemberFormDataType[], memberUserId: number) => {
    return getMember(memberUserId, members);
};

const getMember = <T extends { id: number }> (memberUserId: number, members?: T[]) => {
    if (isNullOrUndefined(members)) {
        return;
    }

    let i = 0;
    const size = members.length;

    while (i < size) {
        const member = members[i++];

        if (member.id === memberUserId) {
            return member;
        }
    }
};

const updateFormDataMember = (formData: GroupMembersFormData, memberFormData: GroupMemberFormDataType) => {
    return {
        ...formData,
        members: formData.members.map(oldMember => {
            if (oldMember.id === memberFormData.id) {
                return memberFormData;
            }

            return oldMember;
        }),
    };
};

const addFormDataMember = (formData: GroupMembersFormData, memberFormData: GroupMemberFormDataType) => {
    return {
        ...formData,
        members: [...formData.members, memberFormData]
    }
};


const removeChangeMembers = (changeMembers: GroupChangeMembersType, memberUserId: number) => {
    const { [memberUserId]: _removed, ...newChangeMembers } = changeMembers;

    return newChangeMembers;
};

const checkDirty = (changeMembers: GroupChangeMembersType) => {
    return Object.keys(changeMembers).length > 0;
};

const equalsMember = (member1: GroupMemberType, member2: GroupMemberType) => {
    return member1.id === member2.id 
        &&  member1.status === member2.status
        &&  member1.type === member2.type;
};

const newMember = (state: GroupMembersFormState, member: GroupMemberType) => {
    let formData = state.formData;
    const oldMember = getFormDataMember(formData.members, member.id);

    if (!isNullOrUndefined(oldMember) && oldMember.manipulationType !== GROUP_MEMBER_MANIPULATION_TYPES.REMOVE) {
        return state;
    }

    let changeMembers: GroupChangeMembersType = state.changeMembers;
    const originMember = getOriginMember(member.id, state.oldFormData);

    if (isNullOrUndefined(originMember)) {
        // 신규 데이터 추가 로직.
        changeMembers = {
            ...changeMembers,
            [member.id]: {
                type: GROUP_MEMBER_MANIPULATION_TYPES.NEW,
                data: member
            },
        };

      
        const setFormData = isNullOrUndefined(oldMember) 
            ?   addFormDataMember
            :   updateFormDataMember;

        formData = setFormData(
            formData,
            {
                ...member,
                manipulationType: GROUP_MEMBER_MANIPULATION_TYPES.NEW,
            },
        );
    } else {
        // 기존 데이터를 삭제 후 되돌릴 때 처리 로직.
        changeMembers = removeChangeMembers(changeMembers, originMember.id);
        const setFormData = isNullOrUndefined(oldMember) 
            ?   addFormDataMember
            :   updateFormDataMember;
            
        formData = setFormData(
            formData,
            {
                ...originMember,
                manipulationType: GROUP_MEMBER_MANIPULATION_TYPES.NONE,
            },
        );
    }

    return {
        ...state,
        changeMembers,
        formData,
        isDirty: checkDirty(changeMembers),
    };
};

const removeMember = (state: GroupMembersFormState, memberUserId: number) => {
    let formData = state.formData;
    const oldMember = getFormDataMember(formData.members, memberUserId);

    if (isNullOrUndefined(oldMember) || oldMember.manipulationType === GROUP_MEMBER_MANIPULATION_TYPES.REMOVE) {
        return state;
    }

    let changeMembers = state.changeMembers;
    const originMember = getOriginMember(memberUserId, state.oldFormData);
    
    if (oldMember.manipulationType === GROUP_MEMBER_MANIPULATION_TYPES.NEW) {
        // 신규로 추가한 멤버인 경우엔 서버로 보낼 데이터에선 삭제.
        changeMembers = removeChangeMembers(changeMembers, oldMember.id);
    } else if (!isNullOrUndefined(originMember)) {
        // NEW가 아닌 경우엔 무조건 originMember가 있어서 REMOVE 처리하면 됨.
        changeMembers = {
            ...changeMembers,
            [memberUserId]: {
                type: GROUP_MEMBER_MANIPULATION_TYPES.REMOVE,
                oldData: originMember
            }
        };
    }

    // UI에 보여질 데이터는 상태만 삭제로 변경함.
    formData = updateFormDataMember(
        formData, 
        {
            ...oldMember,
            manipulationType: GROUP_MEMBER_MANIPULATION_TYPES.REMOVE
        }
    );
    return {
        ...state,
        formData,
        changeMembers,
        isDirty: checkDirty(changeMembers)
    };
};

const modifyMember = (state: GroupMembersFormState, member: GroupMemberType) => {
    let formData = state.formData;
    const oldMember = getFormDataMember(formData.members, member.id);

    if (isNullOrUndefined(oldMember) || oldMember.manipulationType === GROUP_MEMBER_MANIPULATION_TYPES.REMOVE) {
        return state;
    }
    
    let changeMembers = state.changeMembers;
    const originMember = getOriginMember(member.id, state.oldFormData);

    if (oldMember.manipulationType === GROUP_MEMBER_MANIPULATION_TYPES.NEW) {
        // 신규 추가 멤버는 MODIFY로 변경하지 않음.
        changeMembers = {
            ...changeMembers,
            [member.id]: {
                type: GROUP_MEMBER_MANIPULATION_TYPES.NEW,
                data: member
            }
        };

        formData = updateFormDataMember(
            formData, 
            { 
                ...member, 
                manipulationType: GROUP_MEMBER_MANIPULATION_TYPES.NEW, 
            }
        );
    } else if (!isNullOrUndefined(originMember)) {
        // NEW가 아닌 경우엔 무조건 originMember가 있어서 MODIFY 처리하면 됨.
        let manipulationType: GroupMemberManipulationType = GROUP_MEMBER_MANIPULATION_TYPES.MODIFY;

        if (equalsMember(originMember, member)) {
            // 기존 데이터와 변경하려는 데이터가 같은 경우엔 서버 데이터에선 삭제함.
            changeMembers = removeChangeMembers(changeMembers, member.id);
            manipulationType = GROUP_MEMBER_MANIPULATION_TYPES.NONE;
        } else {
            // 기존 데이터와 변경하려는 데이터가 다른 경우 서버 데이터의 상태를 수정함.
            changeMembers = {
                ...changeMembers,
                [member.id]: {
                    type: GROUP_MEMBER_MANIPULATION_TYPES.MODIFY,
                    oldData: originMember,
                    data: member,
                },
            };
        }

        // UI에 보여질 데이터는 삭제하지 않고 상태만 수정함.
        formData = updateFormDataMember(
            formData, 
            {
                ...member,
                manipulationType
            }
        );
    }

    return {
        ...state,
        formData,
        changeMembers,
        isDirty: checkDirty(changeMembers)
    };
};

export const reducer: GroupFormReducerType<GroupMembersFormState> = (state, action) => {
    switch (action.type) {
        case GROUP_MEMBERS_FORM_ACTIONS.ADD_MEMBER: 
            return newMember(state, action.data);
        case GROUP_MEMBERS_FORM_ACTIONS.REMOVE_MEMBER: 
            return removeMember(state, action.userId);
        case GROUP_MEMBERS_FORM_ACTIONS.MODIFY_MEMBER:
            return modifyMember(state, action.data);
    }
};