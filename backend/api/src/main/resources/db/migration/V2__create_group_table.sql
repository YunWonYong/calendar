-- CREATE TYPE calendar_group_status AS ENUM (
--     'ACTIVE',
--     'SUSPENDED',
--     'DELETED'
-- );

-- CREATE TYPE calendar_group_member_status AS ENUM (
--     'PENDING',
--     'ACTIVE',
--     'BANNED'
-- );

-- CREATE TYPE calendar_group_member_role AS ENUM (
--     'VICE_OWNER',
--     'MEMBER'
-- );

-- CREATE TYPE wallet_type AS ENUM (
--     'USER',
--     'GROUP'
-- );

-- CREATE TYPE wallet_currency_type AS ENUM (
--     'POINT',
--     'TICKET'
-- );

-- CREATE TYPE wallet_transaction_type AS ENUM (
--     'CHARGE',
--     'TRANSFER',
--     'USE',
--     'REWARD'
-- );

-- CREATE TYPE ticket_status AS ENUM (
--     'ACTIVE',
--     'DELETED'
-- );


-- CREATE TABLE calendar_group (
--     group_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     group_owner_id BIGINT NOT NULL,

--     status calendar_group_status NOT NULL DEFAULT 'ACTIVE',

--     created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMPTZ
-- );


-- CREATE TABLE user_calendar_group (
--     group_id BIGINT NOT NULL,
--     user_id BIGINT NOT NULL,

--     role calendar_group_member_role NOT NULL DEFAULT 'MEMBER',
--     status calendar_group_member_status NOT NULL DEFAULT 'PENDING',

--     created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMPTZ,

--     CONSTRAINT pk_user_calendar_group
--         PRIMARY KEY (group_id, user_id)
-- );


-- CREATE TABLE wallet (
--     wallet_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

--     group_id BIGINT,

--     wallet_type wallet_type NOT NULL,
--     owner_id BIGINT NOT NULL,

--     created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMPTZ
-- );


-- CREATE UNIQUE INDEX uk_wallet_global_user
-- ON wallet (owner_id)
-- WHERE group_id IS NULL
--   AND wallet_type = 'USER';


-- CREATE UNIQUE INDEX uk_wallet_group_owner
-- ON wallet (group_id, wallet_type, owner_id)
-- WHERE group_id IS NOT NULL;


-- CREATE TABLE wallet_balance (
--     wallet_id BIGINT PRIMARY KEY,

--     amount BIGINT NOT NULL DEFAULT 0,

--     updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

--     CONSTRAINT fk_wallet_balance_wallet
--         FOREIGN KEY (wallet_id)
--         REFERENCES wallet (wallet_id),

--     CONSTRAINT ck_wallet_balance_amount
--         CHECK (amount >= 0)
-- );


-- CREATE TABLE ticket (
--     ticket_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

--     group_id BIGINT NOT NULL,

--     name VARCHAR(100) NOT NULL,
--     description VARCHAR(500),

--     point_price BIGINT NOT NULL,

--     status ticket_status NOT NULL DEFAULT 'ACTIVE',

--     created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMPTZ,

--     CONSTRAINT ck_ticket_point_price
--         CHECK (point_price > 0)
-- );


-- CREATE TABLE ticket_wallet (
--     wallet_id BIGINT NOT NULL,
--     ticket_id BIGINT NOT NULL,

--     amount BIGINT NOT NULL DEFAULT 0,

--     updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

--     CONSTRAINT pk_ticket_wallet
--         PRIMARY KEY (wallet_id, ticket_id),

--     CONSTRAINT fk_ticket_wallet_wallet
--         FOREIGN KEY (wallet_id)
--         REFERENCES wallet (wallet_id),

--     CONSTRAINT fk_ticket_wallet_ticket
--         FOREIGN KEY (ticket_id)
--         REFERENCES ticket (ticket_id),

--     CONSTRAINT ck_ticket_wallet_amount
--         CHECK (amount >= 0)
-- );


-- CREATE TABLE wallet_transaction (
--     transaction_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

--     from_wallet_id BIGINT,
--     to_wallet_id BIGINT,

--     currency_type wallet_currency_type NOT NULL,
--     currency_id BIGINT,

--     amount BIGINT NOT NULL,

--     transaction_type wallet_transaction_type NOT NULL,

--     created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

--     CONSTRAINT fk_wallet_transaction_from_wallet
--         FOREIGN KEY (from_wallet_id)
--         REFERENCES wallet (wallet_id),

--     CONSTRAINT fk_wallet_transaction_to_wallet
--         FOREIGN KEY (to_wallet_id)
--         REFERENCES wallet (wallet_id),

--     CONSTRAINT fk_wallet_transaction_ticket
--         FOREIGN KEY (currency_id)
--         REFERENCES ticket (ticket_id),

--     CONSTRAINT ck_wallet_transaction_amount
--         CHECK (amount > 0),

--     CONSTRAINT ck_wallet_transaction_currency
--         CHECK (
--             (
--                 currency_type = 'POINT'
--                 AND currency_id IS NULL
--             )
--             OR
--             (
--                 currency_type = 'TICKET'
--                 AND currency_id IS NOT NULL
--             )
--         )
-- );