import GroupMembersSearchBox from "./GroupMemberSearchBox";
import GroupMembersList from "./GroupMembersList";

import styles from "./GroupMembersForm.module.css";

const GroupMembersForm = () => {
    return (
        <section
            className={ styles.groupMembersFormWrap }
        >
            <GroupMembersSearchBox />
            <GroupMembersList />
        </section>
    );
};

export default GroupMembersForm;