CREATE TABLE plan_benefits (
    plan_id             BIGINT NOT NULL,
    version_no          BIGINT NOT NULL DEFAULT 1,
    benefit_name        VARCHAR(100) NOT NULL,
    benefit_value       VARCHAR(255) NOT NULL,
    benefit_value_type  VARCHAR(30) NOT NULL CHECK(benefit_value_type IN('INTEGER', 'DECIMAL', 'BOOLEAN', 'STRING')),
	is_view             BOOLEAN NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by          VARCHAR(100) NOT NULL,
	updated_at          TIMESTAMPTZ NULL,
    updated_by          VARCHAR NULL,
    CONSTRAINT pk_plan_benefits
        PRIMARY KEY(plan_id, version_no, benefit_name),
    CONSTRAINT fk_plan_benefits_plans
        FOREIGN KEY(plan_id) REFERENCES plans(plan_id)
);

INSERT INTO plan_benefits (
    plan_id,
    version_no,
    benefit_name,
    benefit_value,
    benefit_value_type,
    created_by
)
VALUES
    -- FREE
    (0, 1, 'MAX_CREATED_GROUPS', '1', 'INTEGER', 'SYSTEM'),
    (0, 1, 'MAX_SUB_LEADERS', '2', 'INTEGER', 'SYSTEM'),
    (0, 1, 'MAX_JOINED_GROUPS', '3', 'INTEGER', 'SYSTEM'),
    (0, 1, 'MAX_OWNED_GROUP_MEMBERS', '20', 'INTEGER', 'SYSTEM'),
    (0, 1, 'ENABLE_PERSONAL_ALARMS', 'TRUE', 'BOOLEAN', 'SYSTEM'),
    -- BASIC
    (1, 1, 'MAX_CREATED_GROUPS', '5', 'INTEGER', 'SYSTEM'),
    (1, 1, 'MAX_SUB_LEADERS', '10', 'INTEGER', 'SYSTEM'),
    (1, 1, 'MAX_JOINED_GROUPS', '12', 'INTEGER', 'SYSTEM'),
    (1, 1, 'MAX_OWNED_GROUP_MEMBERS', '50', 'INTEGER', 'SYSTEM'),
    (1, 1, 'ENABLE_PERSONAL_ALARMS', 'TRUE', 'BOOLEAN', 'SYSTEM'),
    (1, 1, 'ENABLE_GROUP_ALARMS', 'TRUE', 'BOOLEAN', 'SYSTEM'),
    (1, 1, 'MAX_ALARM_GROUPS', '5', 'INTEGER', 'SYSTEM'),
    -- PRO
    (2, 1, 'MAX_CREATED_GROUPS', '10', 'INTEGER', 'SYSTEM'),
    (2, 1, 'MAX_SUB_LEADERS', '15', 'INTEGER', 'SYSTEM'),
    (2, 1, 'MAX_JOINED_GROUPS', '15', 'INTEGER', 'SYSTEM'),
    (2, 1, 'MAX_OWNED_GROUP_MEMBERS', '70', 'INTEGER', 'SYSTEM'),
    (2, 1, 'ENABLE_PERSONAL_ALARMS', 'TRUE', 'BOOLEAN', 'SYSTEM'),
    (2, 1, 'ENABLE_GROUP_ALARMS', 'TRUE', 'BOOLEAN', 'SYSTEM'),
    (2, 1, 'MAX_ALARM_GROUPS', '10', 'INTEGER', 'SYSTEM'),
    -- PREMIUM
    (3, 1, 'MAX_CREATED_GROUPS', '15', 'INTEGER', 'SYSTEM'),
    (3, 1, 'MAX_SUB_LEADERS', '20', 'INTEGER', 'SYSTEM'),
    (3, 1, 'MAX_JOINED_GROUPS', '20', 'INTEGER', 'SYSTEM'),
    (3, 1, 'MAX_OWNED_GROUP_MEMBERS', '80', 'INTEGER', 'SYSTEM'),
    (3, 1, 'ENABLE_PERSONAL_ALARMS', 'TRUE', 'BOOLEAN', 'SYSTEM'),
    (3, 1, 'ENABLE_GROUP_ALARMS', 'TRUE', 'BOOLEAN', 'SYSTEM'),
    (3, 1, 'MAX_ALARM_GROUPS', '15', 'INTEGER', 'SYSTEM'),
    -- ULTIMATE
    (4, 1, 'MAX_CREATED_GROUPS', '30', 'INTEGER', 'SYSTEM'),
    (4, 1, 'MAX_SUB_LEADERS', '20', 'INTEGER', 'SYSTEM'),
    (4, 1, 'MAX_JOINED_GROUPS', '30', 'INTEGER', 'SYSTEM'),
    (4, 1, 'MAX_OWNED_GROUP_MEMBERS', '100', 'INTEGER', 'SYSTEM'),
    (4, 1, 'ENABLE_PERSONAL_ALARMS', 'TRUE', 'BOOLEAN', 'SYSTEM'),
    (4, 1, 'ENABLE_GROUP_ALARMS', 'TRUE', 'BOOLEAN', 'SYSTEM'),
    (4, 1, 'MAX_ALARM_GROUPS', '30', 'INTEGER', 'SYSTEM');