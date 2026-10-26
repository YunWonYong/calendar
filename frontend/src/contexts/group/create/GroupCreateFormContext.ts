import type { ComponentType } from "react";
import { createContext } from "react";

const GroupCreateFormContext = createContext<({ FormComponent: ComponentType | null; }) | null>(null);

export default GroupCreateFormContext;