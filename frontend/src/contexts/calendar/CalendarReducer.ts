import { ActionTypes, type Action, type State } from "@/domains/calendar/calendarReducer";

export const reducer = (state: State, action: Action) => {
    switch(action.type) {
        case ActionTypes.INIT_CALENDAR:
            if (state.hasInit) {
                throw new Error("already calendar state.");
            }

            // [TODO] reducer 초기화.
            return {};
        case ActionTypes.PREV_MONTH:
            return { ...state, months: {} };
        case ActionTypes.NEXT_MONTH:
            return { ...state };
    }
};