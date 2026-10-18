import type { FC} from "react";
import { useState } from "react";

import { GROUP_LIMIT_LEVEL_LIST_DUMMY_INFO } from "@/domains/group/group";

import GroupBasicInfoStep from "./components/GroupBasicInfoStep";

// import GroupEmblemTestPage from "./GroupEmblemTestPage"; // 이전 엠블럼 테스트/선택 컴포넌트
import styles from "./GroupCreatePage.module.css";

import type { UserPlanLevelType } from "@/domains/user/userPlan";


const CreateGroupPage = () => {
    // 1: 기본 정보 입력, 2: 엠블럼 선택
    const [step, _] = useState<1 | 2>(1);

    // const [memberLimit, setMemberLimit] = useState(15);
    // const [subLeaderLimit, setSubLeaderLimit] = useState(5);

    // Step 2 엠블럼 탭 상태 ('preset' | 'upload')
    const [emblemTab, setEmblemTab] = useState<"preset" | "upload">("preset");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // const handleNextStep = () => {
    //     if (!groupName.trim() || !shortName.trim()) {
    //         alert("그룹 이름과 닉네임을 모두 입력해 주세요.");
    //         return;
    //     }

    //     setStep(2);
    // };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {/* 헤더 & 진행 단계 Indicator */}
                <div className={styles.header}>
                    <h2>새 그룹 만들기</h2>
                    <div className={styles.stepIndicator}>
                        <span className={step === 1 ? styles.activeStep : ""}>1. 기본 정보</span>
                        <span className={styles.stepDivider}>&gt;</span>
                        <span className={step === 2 ? styles.activeStep : ""}>2. 엠블럼 설정</span>
                    </div>
                </div>
                <GroupBasicInfoStep 
                    editForm={{
                        fullName: {
                            value: "",
                            onChange: (value: string) => console.log(value),
                            errorMessage: "",
                        },
                        shortName: {
                            value: "",
                            onChange: (value: string) => console.log(value),
                            errorMessage: "",
                        },
                        participantLimitLevel: {
                            selectedLevel: 0,
                            onSelect: (selectedLevel: UserPlanLevelType) => console.log(selectedLevel)
                        },
                        subGroupManagerLimitLevel: {
                            selectedLevel: 0,
                            onSelect: (selectedLevel: UserPlanLevelType) => console.log(selectedLevel)
                        },
                    }}

                    limitLevelInfo={ GROUP_LIMIT_LEVEL_LIST_DUMMY_INFO }
                />

                {/* Step 2: 엠블럼 선택/업로드 */}
                {step === 2 && (
                    <div className={styles.stepContent}>
                        {/* 탭 박스 */}
                        <div className={styles.tabContainer}>
                            <button
                                type="button"
                                className={`${styles.tabBtn} ${emblemTab === "preset" ? styles.activeTab : ""}`}
                                onClick={() => setEmblemTab("preset")}
                            >
                                기본 엠블럼 선택
                            </button>
                            <button
                                type="button"
                                className={`${styles.tabBtn} ${emblemTab === "upload" ? styles.activeTab : ""}`}
                                onClick={() => setEmblemTab("upload")}
                            >
                                엠블럼 업로드
                            </button>
                        </div>

                        {/* 탭 1: 기존 엠블럼 선택 보드 */}
                        {emblemTab === "preset" ? (
                            <div className={styles.emblemBoardWrapper}>
                                {/* <GroupEmblemTestPage /> */}
                            </div>
                        ) : (
                            /* 탭 2: 직접 커스텀 파일 업로드 */
                            <div className={styles.uploadArea}>
                                <label htmlFor="emblemFileInput" className={styles.uploadBox}>
                                    <span className={styles.uploadIcon}>📁</span>
                                    <span>클릭하여 엠블럼 이미지 업로드 (PNG, JPG)</span>
                                    {uploadedFile && (
                                        <p className={styles.fileName}>선택된 파일: {uploadedFile.name}</p>
                                    )}
                                </label>
                                <input
                                    id="emblemFileInput"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                        if (e.target.files?.[0]) {
                                            setUploadedFile(e.target.files[0]);
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}
                

                <GroupCreateNavigator 
                    canNext={ false }
                    canPrevious={ false }
                    canSubmit={ false }
                    handleNextStep={ () => { } }
                    handlePrevStep={ () => { } }
                    handleSubmit={ () => { } }
                    isLastStep={ false }
                />
            </div>
        </div>
    );
};

type GroupCreateNavigatorProps = {
    handlePrevStep: () => void;
    handleNextStep: () => void;
    handleSubmit: () => void;
    canNext: boolean;
    canPrevious: boolean;
    canSubmit: boolean;
    isLastStep: boolean;
};

const GroupCreateNavigator: FC<GroupCreateNavigatorProps> = (props) => {
    const { canNext, canPrevious, canSubmit, isLastStep } = props;
    const { handlePrevStep, handleNextStep, handleSubmit } = props;
    return (
        <div
            className={ styles.bottomNavBetween }
        >
            <button 
                type="button" 
                className={styles.prevBtn} 
                onClick={handlePrevStep}
                disabled={ !canPrevious }
            >
                &larr; 이전 단계
            </button>
            <button 
                type="button" 
                className={ isLastStep? styles.submitBtn: styles.nextBtn } 
                onClick={ isLastStep? handleSubmit: handleNextStep }
                disabled={ isLastStep? !canSubmit: !canNext }
            >
                {
                    isLastStep 
                        ?   "그룹 만들기"
                        :   "다음 단계"
                }
            </button>
        </div>
    );
};

export default CreateGroupPage;