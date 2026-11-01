import { useMemo } from "react";

import { GROUP_EMBLEM_TYPE } from "@/domains/group/form";
import { isNullOrUndefined } from "@/lib/validation/validation";

import useGroupEmblemForm from "./UseGroupEmblemForm";


const formatFileSize = (file?: File) => {
    if (isNullOrUndefined(file)) {
        return "";
    }

    const bytes = file.size;

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

const useGroupCustomEmblem = () => {
    const { errorCodes, formData, saveEmblem } = useGroupEmblemForm();
    const value = useMemo(() => {
        const errorCode = errorCodes.custom;
        const data = formData[GROUP_EMBLEM_TYPE.CUSTOM];
        return {
            data: data,
            errorCode,
            saveCustomEmblem: (file?: File) => {
                saveEmblem({ type: GROUP_EMBLEM_TYPE.CUSTOM, data: { file } });
            },
            formatFileSizeText: formatFileSize(data.file),
        };
    }, [errorCodes.custom, formData[GROUP_EMBLEM_TYPE.CUSTOM], saveEmblem]);
    return value;

};

export default useGroupCustomEmblem;