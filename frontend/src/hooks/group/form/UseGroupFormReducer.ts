import { useReducer } from "react";

import type { GroupFormReducerType, GroupReducerState } from "@/domains/group/form";

const useGroupFormReducer = <T extends GroupReducerState>(defaultState: T, reducer: GroupFormReducerType<T>) => {
    return useReducer(reducer, defaultState);
};

export default useGroupFormReducer;