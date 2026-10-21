import useGroupBasicForm from "./UseGroupBasicForm";

const useGroupBasicPlanIds = () => {
    const ctx = useGroupBasicForm();

    const { formData: { maxOwnedGroupMemberPlanId, maxSubLeaderPlanId }, onSelectPlanId } = ctx;

    return {
        maxOwnedGroupMemberPlanId,
        maxSubLeaderPlanId,
        onSelectPlanId
    };
};

export default useGroupBasicPlanIds;