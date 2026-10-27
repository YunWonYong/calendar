import { useMemo } from "react";

import { GROUP_EMBLEM_TYPE } from "@/domains/group/form";

import useGroupEmblemForm from "./UseGroupEmblemForm";

import type { GroupEmblemFormCustomData } from "@/domains/group/form";

const useGroupCustomEmblem = () => {
    const { errorMessages, formData, saveEmblem } = useGroupEmblemForm();
    const value = useMemo(() => {
        return {
            data: formData[GROUP_EMBLEM_TYPE.CUSTOM],
            errorMessage: errorMessages.custom,
            saveCustomEmblem: (data: GroupEmblemFormCustomData) => {
                saveEmblem({ type: GROUP_EMBLEM_TYPE.CUSTOM, data });
            },
        };
    }, [errorMessages.custom, formData[GROUP_EMBLEM_TYPE.CUSTOM], saveEmblem]);
    return value;

};

export default useGroupCustomEmblem;