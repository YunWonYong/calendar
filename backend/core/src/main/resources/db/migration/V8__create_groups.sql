CREATE TYPE group_status AS ENUM (
	'ACTIVE',			-- 활성화
	'INACTIVE',			-- 비활성화
	'PAST_DUE',			-- 결제 지연으로 인한 비활성화
	'PENDING_DELETE',	-- 삭제 예정
	'DELETED',			-- 삭제'
	'CHANGED_DATA',		-- history 테이블에만 저장되는 status고 group의 데이터가 수정될 때 사용됨.
	'CHANGED_LEADER_ID' -- history 테이블에만 저장되는 status고 group의 leader를 수정할 때 사용됨.
); 

CREATE TABLE groups (
	group_id 				BIGSERIAL NOT NULL,
	group_leader_id			BIGINT NOT NULL,				
	group_status			group_status NOT NULL DEFAULT 'ACTIVE',
	group_full_name			VARCHAR(100) NOT NULL,
	group_short_name		VARCHAR(50) NOT NULL,
	group_emblem_type		VARCHAR(10) NOT NULL CHECK(group_emblem_type IN('NORMAL', 'CUSTOM')),
	group_emblem_id			VARCHAR(255) NOT NULL,
	member_limit_count		INT NOT NULL,
	assistant_limit_count	INT NOT NULL,
    created_at          	TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          	TIMESTAMPTZ NULL,
	CONSTRAINT pk_groups
		PRIMARY KEY(group_id),
	CONSTRAINT fk_groups_group_leader_id
		FOREIGN KEY(group_leader_id) REFERENCES users(user_id)
);

CREATE TABLE group_history (
	seq						BIGSERIAL NOT NULL,
	group_id 				BIGINT NOT NULL,
	group_leader_id			BIGINT NOT NULL,	
	group_status			group_status NOT NULL,
	group_full_name			VARCHAR(100) NOT NULL,
	group_short_name		VARCHAR(50) NOT NULL,
	group_emblem_type		VARCHAR(10) NOT NULL,
	group_emblem_id			VARCHAR(255) NOT NULL,
	member_limit_count		INT NOT NULL,
	assistant_limit_count	INT NOT NULL,
    created_at      		TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
