
import GroupCreateFooter from "../layout/GroupCreateFooter";
import GroupCreateHeader from "../layout/GroupCreateHeader";
import GroupCreateStepIndicator from "../layout/GroupCreateStepIndicator";

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
                <article
                    className={ styles.groupCreateForm }
                >
                    <GroupCreateStepIndicator />
                    <GroupCreateFooter />
                </article>
            </div>
        </section>
    );
};

export default GroupCreateForm;