import { useEffect, useRef, useState } from "react";

export type ScrollDirectionType = "down" | "up";

type ScrollState = {
    currentY: number;
    direction: ScrollDirectionType;
};

type UseScrollProps = {
    onWheel: (event: WheelEvent, direction: ScrollDirectionType) => void;
    wheelOptions?: AddEventListenerOptions;
    onScroll?: (ev: Event, direction: ScrollDirectionType) => void;
    scrollOptions?: AddEventListenerOptions;
};

const getInitialScrollState = (): ScrollState => {
    return {
        currentY: window.scrollY,
        direction: "down",
    };
};

const useScroll = (props: UseScrollProps) => {
    const [scrollState, setScrollState] = useState<ScrollState>(
        getInitialScrollState
    );

    const directionRef = useRef<ScrollDirectionType>("down");

    useEffect(() => {
        const { onWheel, wheelOptions, onScroll, scrollOptions } = props
        const handleWheel = (event: WheelEvent) => {
            directionRef.current = event.deltaY >= 0 ? "down" : "up";
            onWheel(event, directionRef.current);
            setScrollState((oldState) => ({
                ...oldState,
                direction: directionRef.current,
            }));
        };

        const handleScroll = (event: Event) => {
            if (onScroll) {
                onScroll(event, directionRef.current);
            }
            setScrollState((oldScrollState) => {
                return {
                    ...oldScrollState,
                    currentY: window.scrollY,
                };
            });
        };
        
        window.addEventListener("scroll", handleScroll, scrollOptions);
        window.addEventListener("wheel", handleWheel, wheelOptions);
        return () => {
            window.removeEventListener("scroll", handleScroll, scrollOptions);
            window.removeEventListener(
                "wheel",
                handleWheel,
                wheelOptions
            );
        };
    }, [props]);
    return scrollState;
};

export default useScroll;