CREATE TYPE user_social_status AS ENUM (
	'CONNECTED',
	'DISCONNECTED',
	'PENDING_DELETE',
	'DELETED'
);

CREATE TABLE user_social_accounts (
	user_id 			BIGINT NOT NULL,
	social_account_id 	BIGINT NOT NULL,
	user_social_status	user_social_status NOT NULL DEFAULT 'CONNECTED',
	created_at      	TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at			TIMESTAMPTZ NULL,
	CONSTRAINT pk_user_social_account 
		PRIMARY KEY(user_id, social_account_id),
	CONSTRAINT fk_user_social_accounts_users
		FOREIGN KEY (user_id) REFERENCES users(user_id),
	CONSTRAINT fk_user_social_accounts_accounts
		FOREIGN KEY(social_account_id) REFERENCES social_accounts(social_account_id)
);

