CREATE TYPE user_plan_purchase_status AS ENUM (
	'FREE_TRIAL', 				-- 무료 체험 중
	'FREE_TRIAL_PENDING',   	-- 무료 체험 중인데 결제 취소한 상태.
	'ACTIVE',			    	-- 정기 구독 이용 중
	'ACTIVE_PENDING',       	-- 정기 구독 취소한 상태.
	'PURCHASE_LEDGER_FAILED',	-- 구독료 결제 실패 상태.
	'CANCELED'					-- 완전히 종료 및 해지된 상태
);

CREATE TABLE user_plan_purchases (
	purchase_id 		BIGSERIAL NOT NULL,
	user_id				BIGINT NOT NULL,
	card_id				BIGINT NOT NULL,
	purchase_status 	user_plan_purchase_status NOT NULL,
	purchase_currency	VARCHAR(10) NOT NULL,
	purchase_price 		BIGINT NOT NULL,
	purchase_decimals	SMALLINT NOT NULL DEFAULT 0,
	period_start_at		TIMESTAMPTZ NOT NULL,
	period_end_at		TIMESTAMPTZ NOT NULL,
	is_auto_purchase	BOOLEAN NOT NULL DEFAULT FALSE,
	created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at          TIMESTAMPTZ NULL,
	CONSTRAINT pk_user_plan_purchases
		PRIMARY KEY(purchase_id),
	CONSTRAINT fk_user_plan_purchases_users
        FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT fk_user_plan_purchases_user_card
        FOREIGN KEY(user_id, card_id) REFERENCES user_payment_cards(user_id, card_id)
);

CREATE TABLE user_plan_purchase_history (
	seq 				BIGSERIAL NOT NULL,
	user_id				BIGINT NOT NULL,
	purchase_id			BIGINT NOT NULL,
	card_id				BIGINT NOT NULL,
	purchase_status 	user_plan_purchase_status NOT NULL,
	purchase_currency	VARCHAR(10) NOT NULL,
	purchase_price 		BIGINT NOT NULL,
	purchase_decimals	SMALLINT NOT NULL DEFAULT 0,
	period_start_at		TIMESTAMPTZ NOT NULL,
	period_end_at		TIMESTAMPTZ NOT NULL,
	is_auto_purchase	BOOLEAN NOT NULL,
	created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);