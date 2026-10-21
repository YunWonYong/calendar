import useGroupBasicForm from "./UseGroupBasicForm";

const useGroupBasicNames = () => {
    const ctx = useGroupBasicForm();

    const { formData: { fullName, shortName }, errorMessages, onChangeName } = ctx;

    return {
        fullName,
        shortName,
        errorMessages,
        onChangeName
    };
};

export default useGroupBasicNames;