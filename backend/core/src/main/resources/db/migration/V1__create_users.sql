CREATE TYPE user_status AS ENUM (
	'ACTIVE',			-- 활동 중인 상태.
	'SLEEP',			-- 로그인 안 한지 3개월이 지나면.
	'SUSPENDED',		-- 일시 정지 상태.
	'BANNED',			-- 정지 사용자
	'PENDING_DELETE',	-- 회원 탈퇴 요청.
	'DELETED' 			-- 회원 탈퇴
);

CREATE TABLE users (
	user_id	      BIGSERIAL NOT NULL PRIMARY KEY,
	user_status   user_status NOT NULL DEFAULT 'ACTIVE',
	platform      VARCHAR(20) NOT NULL,
	platform_id   VARCHAR(255) NOT NULL,
	created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT uk_users_platform 
		UNIQUE(platform, platform_id)
);

CREATE TABLE user_profiles (
	user_id				BIGINT NOT NULL PRIMARY KEY,
	email				VARCHAR(255) NULL,
	nickname			VARCHAR(50) NOT NULL,
	tel					VARCHAR(30) NULL,
	profile_image_url	TEXT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ NULL,
	CONSTRAINT fk_profiles_users 
		FOREIGN KEY(user_id) REFERENCES users(user_id)
);
