CREATE TYPE group_member_types AS ENUM (
	'LEADER',		-- 그룹 장
	'ASSISTANT',	-- 그룹 부장
	'NORMAL'		-- 일반
);

CREATE TYPE group_member_status AS ENUM (
	'PENDING',		-- 그룹 장의 승인을 기다리는 상태.
	'INVITED',		-- 그룹에 초대됐으나 수락하지 않은 상태.
	'JOINED'		-- 정상적으로 활동 중인 멤버.
	'KICKED'		-- 그룹에서 강제 추방된 상태.
	'BANNED'		-- 그룹에서 영구 추방된 상태.
	'READ_ONLY'		-- 읽기만 가능한 멤버. 
	'LEFT'			-- 그룹에서 자발적으로 떠남.
);

CREATE TABLE group_members (
	group_id		BIGINT NOT NULL,
	user_id			BIGINT NOT NULL,
	member_type		group_member_types NOT NULL,
	member_status	group_member_status NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ NULL,
	CONSTRAINT fk_group_members_groups
		FOREIGN KEY(group_id) REFERENCES groups(group_id),
	CONSTRAINT fk_group_members_users
		FOREIGN KEY(user_id) REFERENCES users(user_id),
  	CONSTRAINT pk_group_members
        PRIMARY KEY(group_id, user_id)

);

CREATE TABLE group_member_history (
	seq				BIGSERIAL NOT NULL,
	group_id 		BIGINT NOT NULL,
	user_id			BIGINT NOT NULL,
	member_type		group_member_types NOT NULL,
	member_status	group_member_status NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);