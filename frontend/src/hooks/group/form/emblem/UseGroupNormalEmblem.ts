import { useMemo } from "react";

import { GROUP_EMBLEM_TYPE } from "@/domains/group/form";

import useGroupEmblemForm from "./UseGroupEmblemForm";

import type { GroupEmblemFormNormalData } from "@/domains/group/form";

const useGroupNormalEmblem = () => {
    const { errorMessages, formData, saveEmblem } = useGroupEmblemForm();
    const value = useMemo(() => {
        return {
            data: formData[GROUP_EMBLEM_TYPE.NORMAL],
            errorMessage: errorMessages.normal,
            saveNormalEmblem: (data: GroupEmblemFormNormalData) => {
                saveEmblem({ type: GROUP_EMBLEM_TYPE.NORMAL, data });
            },
        };
    }, [errorMessages.normal, formData[GROUP_EMBLEM_TYPE.NORMAL], saveEmblem]);
    return value;
};

export default useGroupNormalEmblem;