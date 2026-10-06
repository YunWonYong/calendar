CREATE TABLE user_profile (
	user_id				BIGINT NOT NULL PRIMARY KEY,
	email				VARCHAR(255) NULL,
	nickname			VARCHAR(50) NOT NULL,
	tel					VARCHAR(30) NULL,
	profile_image_url	TEXT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ NULL,
	CONSTRAINT fk_profiles_user
		FOREIGN KEY(user_id) REFERENCES users(user_id)
);