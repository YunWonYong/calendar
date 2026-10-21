import { createContext } from "react";

import type { GroupBasicFormContextType } from "@/domains/group/form";

const GroupBasicFormContext = createContext<GroupBasicFormContextType | null>(null);

export default GroupBasicFormContext;