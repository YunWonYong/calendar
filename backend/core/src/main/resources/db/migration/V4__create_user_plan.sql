CREATE TABLE user_plan (
	user_id        BIGINT NOT NULL PRIMARY KEY,
	plan_id        BIGINT NOT NULL,
	purchase_id    BIGINT NULL,
	created_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at     TIMESTAMPTZ NULL,
	CONSTRAINT fk_user_plan_users 
        FOREIGN KEY(user_id) REFERENCES users(user_id),
	CONSTRAINT fk_user_plan_plans 
        FOREIGN KEY(plan_id) REFERENCES plans(plan_id),
	CONSTRAINT fk_user_plan_plan_purchases 
        FOREIGN KEY(purchase_id) REFERENCES user_plan_purchases(purchase_id)
);

CREATE TABLE user_plan_history (
	seq				BIGSERIAL NOT NULL,
	user_id			BIGINT NOT NULL,
	before_plan_id	BIGINT NOT NULL,
	after_plan_id	BIGINT NOT NULL,
	reason			VARCHAR NOT NULL,
	created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_user_plan_history_before_plan_id
        FOREIGN KEY(before_plan_id) REFERENCES plans(plan_id),
	CONSTRAINT fk_user_plan_history_after_plan_id
        FOREIGN KEY(after_plan_id) REFERENCES plans(plan_id)
);
