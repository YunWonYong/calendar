import { FC } from "react";

import LogoImage from "@/components/LogoImage";
import Link from "@/components/link";
import { CalendarEventMainTypes } from "@/domains/calendar/calendarType";

import LandingHeroCalendarPreview from "./LandingHeroCalendarPreView";

import styles from "./LandingHeroSection.module.css";

import type { CalendarEventMainType } from "@/domains/calendar/calendarType";

const LandingHeroSection = () => {
    return (
        <section className={ styles.hero }>
            <div className={ styles.heroContent }>
                <div className={ styles.heroLogo }>
                    <LogoImage
                        className={ styles.heroLogoImage }
                    />
                    <span className={ styles.heroBrand }>
                        <span className={ styles.heroBrandPrimary }>
                            OUR
                        </span>
                        <span className={ styles.heroBrandSecondary }>
                            CALENDAR
                        </span>
                    </span>
                </div>
                <div className={ styles.heroText }>
                    <p className={ styles.heroTitle }>
                        우리들의 계획적인 하루를 위해!
                    </p>
                    <p className={ styles.heroDescription }> 
                        <CalendarDotLegendText
                            eventType={ CalendarEventMainTypes.MISSION }
                        />부터 
                        <CalendarDotLegendText
                            eventType={ CalendarEventMainTypes.TRANSACTION }
                        />,
                        <CalendarDotLegendText
                            eventType={ CalendarEventMainTypes.SCHEDULE }
                        />까지
                        <br />
                        우리 그룹의 계획과 기록을 한곳에서 관리하세요.
                    </p>
                </div>
                <Link
                    to="/login"
                    className={ styles.heroButton }
                    clickEventName="LOBBY_HERO_BTN"
                >
                    <span className={ styles.heroButtonText }>
                        아워캘 시작하기
                        <span aria-hidden="true">
                            →
                        </span>
                    </span>
                </Link>
            </div>
            <div className={ styles.heroVisual }>
                <LandingHeroCalendarPreview />
            </div>
        </section>
    );
};

const calendarDotLegendTexts = {
    [CalendarEventMainTypes.MISSION]: "미션",
    [CalendarEventMainTypes.SCHEDULE]: " 일정",
    [CalendarEventMainTypes.TRANSACTION]: " 가게부",
};

const CalendarDotLegendText: FC<{ eventType: CalendarEventMainType }> = ({ eventType }) => {
    return (
        <span
            className={ styles.dotLegendText }
            data-event-type={ eventType }
        >
            {
                calendarDotLegendTexts[eventType]
            }
        </span>
    );
};
export default LandingHeroSection;