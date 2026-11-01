import { createContext } from "react";

import type { GroupCreateFormContextType } from "@/domains/group/create";

const GroupCreateFormContext = createContext<GroupCreateFormContextType | null>(null);

export default GroupCreateFormContext;