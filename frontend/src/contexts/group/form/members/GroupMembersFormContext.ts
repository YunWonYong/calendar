import { createContext } from "react";

import type { GroupMembersContextType } from "@/domains/group/form";

const GroupMembersFormContext = createContext<GroupMembersContextType | null>(null);

export default GroupMembersFormContext;