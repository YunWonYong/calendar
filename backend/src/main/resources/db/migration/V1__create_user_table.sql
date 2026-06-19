CREATE TABLE users (
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    platform VARCHAR(20) NOT NULL,
    platform_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_users_platform UNIQUE(platform, platform_id)
);

CREATE TABLE user_profiles (
    user_id BIGINT PRIMARY KEY REFERENCES users(user_id),
    email VARCHAR(255) NULL,
    nickname VARCHAR(50) NOT NULL,
    tel VARCHAR(30) NULL,
    profile_image_url TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NULL
);