
export const handleTrackedClick = async <T extends HTMLElement,> (event: React.MouseEvent<T, MouseEvent>, eventName: string, fn: () => void | Promise<void> ) => {
    event.stopPropagation();
    event.preventDefault();
    await fn();
    // [TODO] event name transfer
    console.log(eventName);
};