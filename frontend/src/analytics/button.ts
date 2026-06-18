
export const trackClick = async (eventName: string, fn?: () => void | Promise<void> ) => {
    if (fn) {
        await fn();
    }
    // [TODO] event name transfer
    console.log(eventName);
};

export const trackClickAndPreventDefault = async <T extends HTMLElement,> (event: React.MouseEvent<T, MouseEvent>, eventName: string, fn?: () => void | Promise<void> ) => {
    event.stopPropagation();
    event.preventDefault();    
    await trackClick(eventName, fn);
};