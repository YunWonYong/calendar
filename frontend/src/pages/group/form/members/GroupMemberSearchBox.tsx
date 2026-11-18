import Button from "@/components/Button";
import { TextInput } from "@/components/form/TextInput";
import { BUTTON_SIZE } from "@/domains/button/buttonType";

import styles from "./GroupMemberSearchBox.module.css";

const GroupMembersSearchBox = () => {
    // const { call, isFetch } = useServerApi({
    //     api: async () => {
    //         await searchUsers(
    //             "Bl",
    //             "nickname",
    //             1,
    //             20
    //         );
    //         return "";
    //     },
    //     errorMotionType: ERROR_MOTION_TYPE.CUSTOM,
    // });

    return (
        <div
            className={ styles.searchBoxWrap }
        >
            <div
                className={ styles.searchBox }
            >
                <TextInput
                    type="text" 
                    id="searchText"
                    name="searchText"
                    containerClassName={ styles.searchContainer }
                    className={ styles.searchInput }
                />
                <Button
                    eventName="GROUP_MEMBERS_SEARCH"
                    size={ BUTTON_SIZE.MEDIUM }
                    onClick={async () => {
                        // if (isFetch) {
                        //     return;
                        // }

                        // await call();
                    }}
                >
                    검색
                </Button>
            </div>
        </div>
    );
};

export default GroupMembersSearchBox;