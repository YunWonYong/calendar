import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { landingPageSectionIdByStep, landingPageSectionIds, LandingPageSectionIdType } from "@/domains/landing/landingPageType";

import useScroll from "../scroll/UseScroll";
import useViewport from "../viewport/UseViewport";

import type { ScrollDirectionType } from "../scroll/UseScroll";

const SCROLL_LOCK_MILI_SEC = 600;

const MIN_STEP: number = 0;
const MAX_STEP: number = 2;

const checkSectionArraySize = (sections: HTMLElement[]) => {
    return sections && sections.length === landingPageSectionIds.length;
};

const findSectionElements = () => {
    const sections = landingPageSectionIds.map(landingPageSectionId => {
        return window.document.getElementById(landingPageSectionId);
    });

    const filteredSections = sections.filter((section) => section !== null);

    if (!checkSectionArraySize(filteredSections)) {
        return [];
    }

    return filteredSections;
};

/**
 * [방법 1] section 높이가 모두 동일하다는 전제에서 계산
 *
 * section의 높이가 항상
 * Math.max(viewportHeight, minHeight)
 * 라는 레이아웃 규칙을 가지고 있을 때 사용할 수 있다.
 * 
 * 단점은 js와 css에서 min-height에 대한 강한 종속성이 생김.
 * 
 * 예:
 * sectionHeight = 765
 *
 * scrollY: 0 ~ 764
 *   -> step 0
 *
 * scrollY: 765 ~ 1529
 *   -> step 1
 *
 * scrollY: 1530 ~ 2294
 *   -> step 2
 */
const getVisibleSectionV1 = (sections: HTMLElement[], minHeight: number) => {
    return getVisibleSectionStep(
        sections,
        (section: HTMLElement) => {
            const step = landingPageSectionIdByStep[section.id as LandingPageSectionIdType];

            if (step === undefined) {
                return false;
            }
            
            const viewportHeight = window.innerHeight;
            const height = Math.max(viewportHeight, minHeight);
            const top = step * height;
            const bottom = (step + 1) * height;
            // console.log("v1: ", JSON.stringify({ top, bottom }));
            return window.scrollY >= top && window.scrollY < bottom;
        }
    );
}; 

/**
 * [방법 2] DOM의 실제 section 위치를 기준으로 계산
 *
 * JS가 section의 높이를 직접 계산하지 않고
 * 브라우저가 실제로 계산한 section의 위치와 높이를 사용한다.
 *
 * 따라서 section마다 높이가 달라도 사용할 수 있다.
 *
 * 예:
 *
 * Section 0
 * top    = 0
 * bottom = 800
 *
 * Section 1
 * top    = 800
 * bottom = 1700
 *
 * Section 2
 * top    = 1700
 * bottom = 2600
 *
 * 현재 window.scrollY가 어느 범위에 포함되는지 확인한다.
 */
// const getVisibleSectionV2 = (sections: HTMLElement[]) => {
//     return getVisibleSectionStep(
//         sections,
//         (section: HTMLElement) => {
//             const { offsetTop, offsetHeight } = section;
//             console.log("v2: ", JSON.stringify({ top: offsetTop, bottom: offsetTop + offsetHeight }));
//             return offsetTop <= window.scrollY && window.scrollY < offsetTop + offsetHeight;
//         },
//     );
// };

/**
 * [방법 3] viewport 중앙에 위치한 section을 현재 section으로 판단
 *
 * getBoundingClientRect()는 viewport를 기준으로 좌표를 반환한다.
 *
 * rect.top
 *   -> section의 viewport 상단으로부터의 거리
 *
 * rect.bottom
 *   -> section의 viewport 상단으로부터 section 하단까지의 거리
 *
 * 현재 viewport의 중앙에 section이 포함되어 있으면
 * 해당 section을 현재 section으로 판단한다.
 *
 * 장점:
 * section의 실제 높이가 서로 달라도 사용할 수 있다.
 *
 * 단점:
 * "현재 scrollY가 section의 어느 범위에 있는가"가 아니라
 * "현재 화면 중앙에 어떤 section이 있는가"를 판단하는 방식이다.
 */
const getVisibleSectionV3 = (sections: HTMLElement[]) => {
    return getVisibleSectionStep(
        sections,
        (section: HTMLElement) => {
            const viewportCenter = window.innerHeight / 2;
            const rect = section.getBoundingClientRect();
            // console.log("v3: ", JSON.stringify({ top: rect.top, bottom: rect.bottom }));
            return rect.top <= viewportCenter && rect.bottom > viewportCenter;
        },
    );
}; 

const getVisibleSection = (sections: HTMLElement[], version: 1 | 2 | 3, minHeight: number) => {
    switch (version) {
        case 1:
            return getVisibleSectionV1(sections, minHeight);
        // case 2:
        //     return getVisibleSectionV2(sections);
        case 3:
            return getVisibleSectionV3(sections);
    }

    throw new Error(`not supported version. getVisibleSection(..., ${version}, ...)`);
};

const getVisibleSectionStep = (sections: HTMLElement[], condition: (section: HTMLElement) => boolean) => {
    let i = 0;
    const size = sections.length;

    do {
        const section = sections[i];

        if (condition(section)) {
            return landingPageSectionIdByStep[
                section.id as LandingPageSectionIdType
            ] ?? MIN_STEP;
        } 
    } while (++i < size);

    return MIN_STEP;
};

type StepState = {
    step: number;
    previousStep: number;
};

const useLandingPageSectionScroll = (minHeight: number) => {
    const [stepState, setStepState] = useState<StepState>({
        step: -1,
        previousStep: -1,
    });
    const stepRef = useRef<number>(-1);
    const sections = useRef<HTMLElement[]>([]);
    useLayoutEffect(() => {
        if (checkSectionArraySize(sections.current)) {
            return;
        }
        
        const findSections = findSectionElements();

        if (!checkSectionArraySize(findSections)) {
            return;
        } 
        
        let step = MIN_STEP;
        const currentY = window.scrollY;
        findSections.forEach((findSection, index) => {
            const top = findSection.offsetTop;
            const bottom = top + findSection.offsetHeight;

            if (top <= currentY && currentY < bottom) {
                step = index;
            }
        });
        sections.current = findSections;
        setStepState({
            step,
            previousStep: step === MIN_STEP? MIN_STEP: MAX_STEP - 1
        });
        stepRef.current = step;
    }, [sections, landingPageSectionIds]);

    const { isVerticalUI, height } = useViewport();
    useEffect(() => {
        window.scrollTo({  behavior: "smooth" , top: stepRef.current * Math.max(height, minHeight) });
    }, [height]);

    const isWheelable = useRef<boolean>(true);
    const tick = useRef<NodeJS.Timeout | null>(null);
    const isActive = !isVerticalUI && minHeight <= height;
    const onWheel = useCallback((event: WheelEvent, direction: ScrollDirectionType) => {
        if (!isActive) {
            // wheel과 scroll 이벤트를 구분함.
            return;
        }

        const isWheel = isWheelable.current;

        if (!isWheel) {
            event.preventDefault();
            return;
        }
        
        const nextStep = stepRef.current + (direction === "up"? -1: 1);

        if (nextStep < MIN_STEP || nextStep > MAX_STEP) {
            event.preventDefault();
            return;
        }

        isWheelable.current = false;
        setStepState(() => ({
            previousStep: stepRef.current,
            step: nextStep,
        }));
        stepRef.current = nextStep;
        window.scrollTo({  behavior: "smooth" , top: nextStep * Math.max(height, minHeight) });
        tick.current = setTimeout(() => { 
            isWheelable.current = true;

            if (tick.current) {
                clearTimeout(tick.current);
                tick.current = null;
            }
        }, SCROLL_LOCK_MILI_SEC);
    }, [isActive, height, minHeight]);

    const onScroll = useCallback((_: Event, direction: ScrollDirectionType) => {
        if (isActive) {
            // wheel과 scroll 이벤트를 구분함.
            return;
        }

        const sectionss = sections.current;
        const size = sectionss.length;

        if (size === 0) {
            return MIN_STEP;
        }
        
        // console.log("scrollY: ", window.scrollY, ", innerHeight: ", window.innerHeight);
        // const stepV1 = getVisibleSection(sectionss, 1, minHeight);
        // console.log("stepV1: ", stepV1);
        // const stepV2 = getVisibleSection(sectionss, 2, minHeight);
        // console.log("stepV2: ", stepV2);
        const stepV3 = getVisibleSection(sectionss, 3, minHeight);
        console.log("stepV3: ", stepV3);
        // const step = getCurrentSection(sections.current);
        
        const previousStep = direction === "down"? stepV3 -1: stepV3 + 1;
        setStepState({
            previousStep,
            step: stepV3,
        });
        stepRef.current = stepV3;
    }, [isActive, minHeight]);

    const scrollArgs = useMemo(() => {
        return { onWheel, wheelOptions: { passive: false }, onScroll };
    }, [onWheel]);
    const { currentY, direction } = useScroll(scrollArgs);

    return {
        currentY,
        direction,
        ...stepState,
        isVerticalUI,
        viewportHeight: height,
    };
};

export default useLandingPageSectionScroll;