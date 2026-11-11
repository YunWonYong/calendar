import type { FC } from "react";

import type { ErrorCodeData } from "@/domains/fetch/fetchType";
import type { ModalContentPropsType } from "@/domains/global/modal/globalModalType";

const GroupCreateErrorModalContent: FC<ModalContentPropsType<ErrorCodeData>> = ({ props }) => {
    console.log(props);
    return (
        <div>
        </div>
    );
};

export default GroupCreateErrorModalContent;