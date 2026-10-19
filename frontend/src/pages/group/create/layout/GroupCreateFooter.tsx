import useGroupCreateFlow from "@/hooks/group/create/UseGroupCreateFlow";

import styles from "./GroupCreateFooter.module.css";

const GroupCreateFooter = () => {
    return (
        <footer
            className={ styles.groupCreateFooter }
        >
            <PreviousStepButton />
            <NextStepButton />
        </footer>
    );
};

const PreviousStepButton = () => {
    const { previousButtonTitle, movePrevious } = useGroupCreateFlow();
    // [TODO] 추후 form 관련 hook 값과 같이 isDisabled 값 구함.
    const isDisabled = false; 
    return (
        <button
            type="button"
            aria-disabled={ isDisabled }
            disabled={ isDisabled }
            onClick={ movePrevious }
        >
            <span>
                {
                    previousButtonTitle
                }
            </span>
        </button>
    );
};

const NextStepButton = () => {
    const { nextButtonTitle, moveNext } = useGroupCreateFlow();
    // [TODO] 추후 form 관련 hook 값과 같이 isDisabled 값 구함.
    const isDisabled = false; 
    return (
        <button
            type="button"
            aria-disabled={ isDisabled }
            disabled={ isDisabled }
            onClick={ moveNext }
        >
            <span>
                {
                    nextButtonTitle
                }
            </span>
        </button>
    );
};

export default GroupCreateFooter;