CREATE TABLE social_accounts (
	social_account_id   BIGSERIAL NOT NULL,
	social_type      	VARCHAR(20) NOT NULL,
	social_identity   	VARCHAR(255) NOT NULL,
	created_at    		TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT pk_social_accounts PRIMARY KEY(social_account_id),
	CONSTRAINT uk_social_type_identity 
		UNIQUE(social_type, social_identity)
);