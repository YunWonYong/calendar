ALTER TABLE user_profile 
    ADD COLUMN tag VARCHAR(8) NULL;

WITH tags AS (
    SELECT  user_id
        ,  'UP' || ROW_NUMBER() OVER(PARTITION BY nickname ORDER BY user_id) AS tag
    FROM  user_profile
)
UPDATE  user_profile up
SET  tag = t.tag
    ,  updated_at = CURRENT_TIMESTAMP
FROM  tags t
WHERE  up.user_id = t.user_id;

ALTER TABLE user_profile 
    ALTER COLUMN tag SET NOT NULL;

ALTER TABLE user_profile 
    ADD CONSTRAINT uq_user_profile_nick_tag 
        UNIQUE(nickname, tag);