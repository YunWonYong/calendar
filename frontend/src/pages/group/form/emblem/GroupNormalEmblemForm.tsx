import { trackClickAndPreventDefault } from "@/analytics/button";
import GroupEmblemIconSVG from "@/components/group/GroupEmblemIconSVG";
import { BG_IDS, type BGId } from "@/domains/group/emblemBg";
import type { IconId } from "@/domains/group/emblemIcon";
import { ICON_IDS } from "@/domains/group/emblemIcon";
import { GroupEmblemFormNormalData } from "@/domains/group/form";
import useGroupNormalEmblem from "@/hooks/group/form/emblem/UseGroupNormalEmblem";
import type { FC } from "react";
import { memo } from "react";

import Container from "@/components/Container";
import GroupEmblem, { getGroupEmblemId } from "@/components/group/GroupEmblem";
import GroupEmblemBG from "@/components/group/GroupEmblemBG";
import styles from "./GroupNormalEmblemForm.module.css";

const GroupNormalEmblemForm = () => {
    const { data, saveNormalEmblem } = useGroupNormalEmblem();
    
    const onChangeIconId = (iconId: IconId) => {
        saveNormalEmblem({
            ...data,
            iconId,
        });
    };
    
    const onChangeBgId = (bgId: BGId) => {
        saveNormalEmblem({
            ...data,
            bgId,
        });
    };

    return (
        <article
            className={ styles.normalEmblemForm }
        >
            <EmblemPreview
                data={ data }
            />
            <EmblemIconContainer 
                currentIconId={ data.iconId }
                onChange={ onChangeIconId }
            />
            <EmblemBGContainer 
                currentBGId={ data.bgId }
                onChange={ onChangeBgId }
            />
        </article>
    );
};

const EmblemPreview: FC<{ data: GroupEmblemFormNormalData; }> = ({ data }) => {
    return (
        <section className={ styles.preview }>
            <div className={ styles.previewHeader }>
                <h3 className={ styles.previewTitle }>
                    엠블럼 미리보기
                </h3>

                <span className={ styles.previewDescription }>
                    선택한 디자인이 이렇게 표시됩니다.
                </span>
            </div>

            <div className={ styles.previewCanvas }>
                <div className={ styles.emblemFrame }>
                    <GroupEmblem
                        emblemId={ getGroupEmblemId(data) }
                        size={ 100 }
                    />
                </div>
            </div>
        </section>
    );
};

const EmblemBGContainer: FC<{ currentBGId: BGId; onChange: (bgId: BGId) => void; }> = memo(({ currentBGId, onChange }) => {
    return (
        <Container
            className={ styles.container }
        >   
            {
                BG_IDS.map((bgId) => {
                    return (
                        <span
                            key={ bgId }
                            onClick={(event) => {
                                if (bgId !== currentBGId) {
                                    trackClickAndPreventDefault(
                                        event,
                                        `GROUP_EMBLEM_FORM_BG_BOX@${currentBGId} => ${bgId}`,
                                        () => onChange(bgId)
                                    )
                                }
                            }}
                        >
                            <GroupEmblemBG 
                                bgId={ bgId }
                                size={ 32 }
                            />
                        </span>
                    );
                })
            }
        </Container>
    );
});

const EmblemIconContainer: FC<{ currentIconId: IconId; onChange: (iconId: IconId) => void; }> = memo(({ currentIconId, onChange }) => {
    return (
        <Container
            className={ styles.container }
        >
            {
                ICON_IDS.map((iconId) => {
                    const isSelected = iconId === currentIconId;
                    return (
                        <span
                            key={ iconId }
                            className={ styles.containerWrap }
                            onClick={(event) => {
                                trackClickAndPreventDefault(
                                    event,
                                    `GROUP_EMBLEM_FORM_ICON_BOX@${currentIconId} => ${iconId}`,
                                    () => onChange(iconId)
                                )
                            }}
                        >
                            <Icon 
                                isSelected={ isSelected }
                                iconId={ iconId }
                            />
                        </span>
                    );
                })
            }
        </Container>
    );
});

const Icon: FC<{ isSelected?: boolean; iconId: IconId }> = memo(({ isSelected, iconId }) => {
    return (
        <span
            className={ styles.iconBox }
            data-selected-icon={ isSelected }
        >
            <GroupEmblemIconSVG 
                iconId={ iconId }
                className={ styles.icon }
            />
        </span>
    );
});

export default GroupNormalEmblemForm;