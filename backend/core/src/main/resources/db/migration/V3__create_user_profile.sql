CREATE TABLE user_profile (
	user_id				BIGINT NOT NULL PRIMARY KEY,
	email				VARCHAR(255) NULL,
	nickname			VARCHAR(50) NOT NULL,
	tel					VARCHAR(30) NULL,
	profile_image_type	VARCHAR(10) NOT NULL CHECK(profile_image_type IN('URL', 'ID')),
	profile_image		TEXT NOT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ NULL,
	CONSTRAINT fk_user_profile
		FOREIGN KEY(user_id) REFERENCES users(user_id)
);