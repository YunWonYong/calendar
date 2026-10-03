CREATE TYPE user_payment_card_status AS ENUM (
	'ACTIVE', 		-- 사용자가 등록한 사용할 수 있는 카드.
	'INACTIVE', 	-- 사용자가 해지한 사용할 수 없는 카드.
    'CHANGED',      -- 카드의 정보를 수정한 경우.
	'EXPIRED'		-- 사용자가 등록한 카드의 유효기간이 만료됐을 때.
);

CREATE TABLE user_payment_cards (
    card_id                 BIGSERIAL NOT NULL,
    user_id                 BIGINT NOT NULL,
	payment_method_token	VARCHAR(255) NOT NULL,
	card_status				user_payment_card_status NOT NULL DEFAULT 'ACTIVE',
	card_brand				VARCHAR(30) NOT NULL,
	card_last_4				CHAR(4) NOT NULL,
	card_exp_month			SMALLINT NOT NULL,
	card_exp_year			SMALLINT NOT NULL,
    card_nickname           VARCHAR(60) NULL,
	created_at          	TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at          	TIMESTAMPTZ NULL,
	CONSTRAINT fk_user_payment_cards_users
        FOREIGN KEY(user_id) REFERENCES users(user_id),
	CONSTRAINT pk_user_payment_cards
		PRIMARY KEY(card_id),
    CONSTRAINT uk_user_payment_cards_user_token
        UNIQUE(user_id, payment_method_token),
    CONSTRAINT uk_user_payment_cards_user_card
        UNIQUE(user_id, card_id)
);

CREATE TABLE user_payment_card_history (
	seq				        BIGSERIAL NOT NULL,
    card_id                 BIGINT NOT NULL,
	user_id		            BIGINT NOT NULL,
	payment_method_token	VARCHAR(255) NOT NULL,
	card_status		        user_payment_card_status NOT NULL,
	card_brand		        VARCHAR(30) NOT NULL,
	card_last_4		        CHAR(4) NOT NULL,
	card_exp_month	        SMALLINT NOT NULL,
	card_exp_year	        SMALLINT NOT NULL,
    card_nickname           VARCHAR(60) NULL,
	created_at              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
