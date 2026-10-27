import useGroupCreateForm from "@/hooks/group/create/UseGroupCreateForm";

import styles from "./GroupCreateFormArticle.module.css";

const GroupCreateFormArticle = () => {
    const { FormComponent } = useGroupCreateForm();
    return (
        <article
            className={ styles.groupCreateFromArticle }
        >
            {
                FormComponent && 
                    <FormComponent />
            }
        </article>
    );
};

export default GroupCreateFormArticle;