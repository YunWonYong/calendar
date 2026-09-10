import { useCallback, useEffect, useRef, useState } from "react";

const MIN_STEP: number = 0;
const MAX_STEP: number = 2;

type WheelDirectionType = "up" | "down";

type WheelStepState = {
    step: number;
    isWheelable: boolean;
    direction: WheelDirectionType;
};

const defaultStepState: WheelStepState = {
    step: MIN_STEP, 
    isWheelable: true,
    direction: "down" 
};

const useScroll = ({ isActive }: { isActive: boolean; }) => {
    const [step, setStep] = useState<WheelStepState>({ ...defaultStepState });
    const refStep = useRef(MIN_STEP);
    const isWheelable = useRef<boolean>(true);
    const tick = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (isActive) {
            return;
        }
        
        isWheelable.current = true;
        refStep.current = MIN_STEP;
        setStep({ ...defaultStepState });
        if (tick.current) {
            clearTimeout(tick.current);
            tick.current = null;
        }
    }, [isActive]);

    useEffect(() => {
        if (!isActive) {
            return;
        }
        const wheelEventHandler = (event: WheelEvent) => {
            event.preventDefault();

            if (!isWheelable.current) {
                return;
            }

            const direction: WheelDirectionType = event.deltaY > 0? "down": "up";
            const nextStep = refStep.current + (direction === "down"? 1: -1);
            if (nextStep < MIN_STEP || nextStep > MAX_STEP) {
                return;
            }

            refStep.current = nextStep;
            setStep({
                step: nextStep,
                isWheelable: false,
                direction,
            });
            isWheelable.current = false;
            tick.current = setTimeout(() => {
                isWheelable.current = true;
                setStep((oldStep) => {
                    return {
                        ...oldStep,
                        isWheelable: true,
                    };
                });
            }, 700);
        };

        window.addEventListener("wheel", wheelEventHandler, { passive: false });
        return () => {
            window.removeEventListener("wheel", wheelEventHandler);
            isWheelable.current = true;
            refStep.current = MIN_STEP;
            setStep({ ...defaultStepState });
            if (tick.current) {
                clearTimeout(tick.current);
                tick.current = null;
            }
        };
    }, [isActive]);

    const moveStep = useCallback((step: number) => {
        if (!isActive) {
            return;
        }

        if (refStep.current === step) {
            return;
        }

        if (step < MIN_STEP || step > MAX_STEP) {
            return;
        }

        refStep.current = step;
        setStep({
            step,
            isWheelable: true,
            direction: step <= MAX_STEP? "down": "up",
        });
        if (tick.current) {
            clearTimeout(tick.current);
            tick.current = null;
        }
        isWheelable.current = true;
    }, [isActive]);
    return { ...step, moveStep };
};

export default useScroll;