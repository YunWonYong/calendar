import { createContext } from "react";

import type { GroupEmblemFormContextType } from "@/domains/group/form";

const GroupEmblemFormContext = createContext<GroupEmblemFormContextType | null>(null);

export default GroupEmblemFormContext;