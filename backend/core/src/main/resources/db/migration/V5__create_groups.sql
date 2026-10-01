CREATE TYPE group_status AS ENUM (
	'ACTIVE',			-- 활성화
	'INACTIVE',			-- 비활성화
	'PAST_DUE',			-- 결제 지연으로 인한 비활성화
	'PENDING_DELETE',	-- 삭제 예정
	'DELETED'			-- 삭제
); 

CREATE TABLE groups (
	group_id 				BIGSERIAL NOT NULL PRIMARY KEY,
	group_status			group_status NOT NULL DEFAULT 'ACTIVE',
	group_full_name			VARCHAR(100) NOT NULL,
	group_short_name		VARCHAR(50) NOT NULL,
	group_emblem_type		VARCHAR(10) NOT NULL CHECK(group_emblem_type IN('NORMAL', 'CUSTOM')),
	group_emblem_id			VARCHAR(255) NOT NULL,
	member_limit_count		INT NOT NULL,
	assistant_limit_count	INT NOT NULL,
    created_at          	TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          	TIMESTAMPTZ NULL
);

CREATE TABLE group_history (
	seq						BIGSERIAL NOT NULL,
	group_id 				BIGINT NOT NULL,
	group_status			group_status NOT NULL,
	group_full_name			VARCHAR(100) NOT NULL,
	group_short_name		VARCHAR(50) NOT NULL,
	group_emblem_type		VARCHAR(10) NOT NULL,
	group_emblem_id			VARCHAR(255) NOT NULL,
	member_limit_count		INT NOT NULL,
	assistant_limit_count	INT NOT NULL,
    created_at      		TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_group_history_groups
		FOREIGN KEY(group_id) REFERENCES groups(group_id)
);

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
