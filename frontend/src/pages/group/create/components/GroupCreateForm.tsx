
import styles from "./GroupCreateForm.module.css";

const GroupCreateForm = () => { 
    return (
        <section
            className={ styles.groupCreateFormWrap }
        >
            <div
                className={ styles.groupCreateFormInner }
            >
                <article
                    className={ styles.groupCreateForm }
                >
                </article>
            </div>
        </section>
    );
};

export default GroupCreateForm;