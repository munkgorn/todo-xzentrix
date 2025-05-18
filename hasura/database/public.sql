/*
 Navicat Premium Dump SQL

 Source Server         : todo
 Source Server Type    : PostgreSQL
 Source Server Version : 170004 (170004)
 Source Host           : ep-delicate-glade-a1ckokzp-pooler.ap-southeast-1.aws.neon.tech:5432
 Source Catalog        : todo-mg-xzentrix_db_540210
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170004 (170004)
 File Encoding         : 65001

 Date: 18/05/2025 23:14:47
*/


-- ----------------------------
-- Table structure for tasks
-- ----------------------------
DROP TABLE IF EXISTS "public"."tasks";
CREATE TABLE "public"."tasks" (
  "id" int4 NOT NULL DEFAULT nextval('tasks_id_seq'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "completed" bool DEFAULT false,
  "priority" varchar(20) COLLATE "pg_catalog"."default",
  "user_id" int4,
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."tasks" OWNER TO "hasura_role_2b1f6d94-fafe-444f-9ce5-815c7ebc31c3";

-- ----------------------------
-- Records of tasks
-- ----------------------------
BEGIN;
INSERT INTO "public"."tasks" ("id", "title", "description", "completed", "priority", "user_id", "created_at", "updated_at") VALUES (68, 'Go To The Store', 'Eggs, bacon, milk, frozen yogurt, sweets', 'f', 'high', 18, '2025-05-18 10:28:37.474888', '2025-05-18 10:28:37.474888');
INSERT INTO "public"."tasks" ("id", "title", "description", "completed", "priority", "user_id", "created_at", "updated_at") VALUES (69, 'Buy Presents', 'Go and get Christmas presents for Lans and Sandra', 'f', 'high', 18, '2025-05-18 10:28:57.813373', '2025-05-18 10:28:57.813373');
INSERT INTO "public"."tasks" ("id", "title", "description", "completed", "priority", "user_id", "created_at", "updated_at") VALUES (70, 'Go For A Walk', 'Walk a minimum of 3km today', 'f', 'normal', 18, '2025-05-18 10:29:13.417077', '2025-05-18 10:29:13.417077');
INSERT INTO "public"."tasks" ("id", "title", "description", "completed", "priority", "user_id", "created_at", "updated_at") VALUES (71, 'Call James', 'Call James for a meeting update', 'f', 'done', 18, '2025-05-18 10:29:32.622672', '2025-05-18 10:29:32.622672');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."users" OWNER TO "hasura_role_2b1f6d94-fafe-444f-9ce5-815c7ebc31c3";

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO "public"."users" ("id", "username", "password", "created_at") VALUES (18, 'mg', 'e10adc3949ba59abbe56e057f20f883e', '2025-05-18 10:28:02.233924');
COMMIT;

-- ----------------------------
-- Primary Key structure for table tasks
-- ----------------------------
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_username_key" UNIQUE ("username");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table tasks
-- ----------------------------
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
