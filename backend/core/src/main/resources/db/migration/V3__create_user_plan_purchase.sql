CREATE TYPE user_plan_purchases_status AS ENUM (
	'FREE_TRIAL', 				-- 무료 체험 중
	'FREE_TRIAL_PENDING',   	-- 무료 체험 중인데 결제 취소한 상태.
	'ACTIVE',			    	-- 정기 구독 이용 중
	'ACTIVE_PENDING',       	-- 정기 구독 취소한 상태.
	'PURCHASE_LEDGER_FAILED',	-- 구독료 결제 실패 상태.
	'CANCELED'					-- 완전히 종료 및 해지된 상태
);

CREATE TABLE user_plan_purchases (
	purchase_id 		BIGSERIAL NOT NULL PRIMARY KEY,
	user_id				BIGINT NOT NULL,
	purchase_status 	user_plan_purchases_status NOT NULL,
	purchase_currency	VARCHAR(10) NOT NULL,
	purchase_price 		BIGINT NOT NULL,
	purchase_decimals	SMALLINT NOT NULL DEFAULT 0,
	period_start_at		TIMESTAMPTZ NOT NULL,
	period_end_at		TIMESTAMPTZ NOT NULL,
	is_auto_purchase	BOOLEAN NOT NULL DEFAULT FALSE,
	created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at          TIMESTAMPTZ NULL,
	CONSTRAINT uk_user_id_purchase_id 
		UNIQUE(user_id, purchase_id),
	CONSTRAINT fk_user_plan_purchases_users
        FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE user_plan_purchase_history (
	seq 				BIGSERIAL NOT NULL,
	user_id				BIGINT NOT NULL,
	purchase_id			BIGINT NOT NULL,
	purchase_status 	user_plan_purchases_status NOT NULL,
	purchase_currency	VARCHAR(10) NOT NULL,
	purchase_price 		BIGINT NOT NULL,
	purchase_decimals	SMALLINT NOT NULL DEFAULT 0,
	purchase_at			TIMESTAMPTZ NULL,
	created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TYPE user_plan_purchase_card_status AS ENUM (
	'ACTIVE', 	-- 사용자가 등록한 사용할 수 있는 카드.
	'INACTIVE' 	-- 사용자가 해지한 사용할 수 없는 카드.
	'EXPIRED'	-- 사용자가 등록한 카드의 유효기간이 만료됐을 때.
);

CREATE TABLE user_plan_purchase_cards (
	purchase_id				BIGINT NOT NULL,
	payment_method_token	VARCHAR(255) NOT NULL,
	card_status				user_plan_purchase_card_status NOT NULL,
	card_brand				VARCHAR(30) NOT NULL,
	card_last_4				CHAR(4) NOT NULL,
	card_exp_month			SMALLINT,
	card_exp_year			SMALLINT,
	created_at          	TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at          	TIMESTAMPTZ NULL,
	CONSTRAINT fk_user_plan_purchase_cards_purchases
        FOREIGN KEY(purchase_id) REFERENCES user_plan_purchases(purchase_id),
	CONSTRAINT pk_purchase_id_pay_method_token 
		PRIMARY KEY(purchase_id, payment_method_token)
);
