
import GroupCreateFormArticle from "../components/GroupCreateFormArticle";

import GroupCreateFooter from "./GroupCreateFooter";
import GroupCreateHeader from "./GroupCreateHeader";
import GroupCreateStepIndicator from "./GroupCreateStepIndicator";

import styles from "./GroupCreateForm.module.css";

const GroupCreateForm = () => { 
    return (
        <section
            className={ styles.groupCreateFormWrap }
        >
            <div
                className={ styles.groupCreateFormInner }
            >
                <GroupCreateHeader />
                <div
                    className={ styles.groupCreateForm }
                >
                    <GroupCreateStepIndicator />
                    <GroupCreateFormArticle />
                    <GroupCreateFooter />
                </div>
            </div>
        </section>
    );
};

export default GroupCreateForm;