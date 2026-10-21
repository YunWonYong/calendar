import Button from "@/components/Button";
import { BUTTON_COLOR, BUTTON_SIZE } from "@/domains/button/buttonType";
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
    const { previousButtonTitle, previousButtonEventName, movePrevious } = useGroupCreateFlow();
    // [TODO] 추후 form 관련 hook 값과 같이 isDisabled 값 구함.
    const isDisabled = false; 
    return (
        <Button
            type="button"
            aria-disabled={ isDisabled }
            disabled={ isDisabled }
            onClick={ movePrevious }
            eventName={ previousButtonEventName }
            title={ previousButtonTitle }
            color={ BUTTON_COLOR.BLUE }
            size={ BUTTON_SIZE.MEDIUM }
        />
    );
};

const NextStepButton = () => {
    const { nextButtonTitle, nextButtonEventName, moveNext } = useGroupCreateFlow();
    // [TODO] 추후 form 관련 hook 값과 같이 isDisabled 값 구함.
    const isDisabled = false; 
    return (
        <Button
            type="button"
            aria-disabled={ isDisabled }
            disabled={ isDisabled }
            onClick={ moveNext }
            eventName={ nextButtonEventName }
            title={ nextButtonTitle }
            color={ BUTTON_COLOR.GREEN }
            size={ BUTTON_SIZE.MEDIUM }
        />
    );
};

export default GroupCreateFooter;