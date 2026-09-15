import { useState } from "react";
// import GroupEmblemTestPage from "./GroupEmblemTestPage"; // 이전 엠블럼 테스트/선택 컴포넌트
import styles from "./GroupCreatePage.module.css";
import GroupBasicInfoStep from "./components/GroupBasicInfoStep";
import { DEFAULT_GROUP_BASIC_INFO_STEP_LIMITS } from "@/domains/group/groupCreate";


const CreateGroupPage = () => {
    // 1: 기본 정보 입력, 2: 엠블럼 선택
    const [step, setStep] = useState<1 | 2>(1);

    // Step 1 폼 상태
    const [groupName, setGroupName] = useState("");
    const [shortName, setShortName] = useState("");
    const [memberLimit, setMemberLimit] = useState(15);
    const [subLeaderLimit, setSubLeaderLimit] = useState(5);

    // Step 2 엠블럼 탭 상태 ('preset' | 'upload')
    const [emblemTab, setEmblemTab] = useState<"preset" | "upload">("preset");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleNextStep = () => {
        if (!groupName.trim() || !shortName.trim()) {
            alert("그룹 이름과 닉네임을 모두 입력해 주세요.");
            return;
        }
        setStep(2);
    };

    const handlePrevStep = () => {
        setStep(1);
    };

    const handleSubmit = () => {
        alert("그룹 생성이 완료되었습니다!");
        // 생성 API 호출 로직 연결
    };

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
                    fullNameEditInfo={{
                        onChange: (value) => setGroupName(value),
                        value: groupName,
                        errorMessage: ""
                    }}
                    shortNameEditInfo={{
                        onChange: (value) => setShortName(value),
                        value: shortName,
                        errorMessage: ""
                    }}
                    selectedLimitLevel={ 0 }
                    limitInfo={{
                        userPlanLevel: 0,
                        limits: [ ...DEFAULT_GROUP_BASIC_INFO_STEP_LIMITS ]
                    }}
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

                        {/* 하단 네비게이션 버튼 (이전 / 그룹 생성) */}
                        <div className={styles.bottomNavBetween}>
                            <button type="button" className={styles.prevBtn} onClick={handlePrevStep}>
                                &larr; 이전 단계
                            </button>
                            <button type="button" className={styles.submitBtn} onClick={handleSubmit}>
                                그룹 만들기 완료
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateGroupPage;