import GroupBasicForm from "../../form/basic/GroupBasicForm";

import styles from "./GroupCreateFormArticle.module.css";

const GroupCreateFormArticle = () => {
    return (
        <article
            className={ styles.groupCreateFromArticle }
        >
            <GroupBasicForm />
        </article>
    );
};

export default GroupCreateFormArticle;