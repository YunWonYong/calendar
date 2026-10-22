import { createContext } from "react";

const GroupCreateFormContext = createContext<({ test: string; }) | null>(null);

export default GroupCreateFormContext;