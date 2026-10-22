import type { ReactNode } from "react";

import GroupBasicFormProvider from "../form/basic/GroupBasicFormProvider";

import GroupCreateFormContext from "./GroupCreateFormContext";

const GroupCreateFormProvider = ({ children }: { children: ReactNode; }) => {
    return (
        <GroupCreateFormContext.Provider
            value={{
                test: "",
            }}
        >
            <GroupBasicFormProvider>
                {
                    children
                }
            </GroupBasicFormProvider>
        </GroupCreateFormContext.Provider>
    );
};

export default GroupCreateFormProvider;