CREATE TYPE plan_types AS ENUM (
	'FREE',
	'BASIC',
	'PRO',
	'PREMIUM',
	'ULTIMATE'
);

CREATE TABLE plans (
	plan_id     BIGSERIAL NOT NULL PRIMARY KEY,
	plan_type   plan_types NOT NULL UNIQUE,
	plan_price  BIGINT NOT NULL,
	is_active   BOOLEAN NOT NULL DEFAULT TRUE,
	created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at  TIMESTAMPTZ NULL,
	CONSTRAINT uk_plans_plan_type
		UNIQUE(plan_type)
);

INSERT 
  INTO plans(plan_id, plan_type, plan_price)
VALUES (0, 'FREE', 0)
     , (1, 'BASIC', 0)
     , (2, 'PRO', 0)
     , (3, 'PREMIUM', 0)
     , (4, 'ULTIMATE', 0);
