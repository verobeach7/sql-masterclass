// 존재하지 않는 데이터베이스를 생성하여 사용하고자 할 때 직접 schema를 짜줘야 함
// Drizzle은 데이터베이스에서 지원하는 여러 데이터 타입을 함수로 제공함
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  // mode를 사용하면 편리. sqlite는 boolean을 사용하기 위해서 0, 1만 사용하는데 'boolean'으로 모드를 지정하면 알아서 처리해줌
  // userId: Camelcase 네이밍 규칙 사용
  userId: integer("user_id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  username: text("username").notNull(),
  isAdmin: integer("is_admin").notNull().default(0),
});

export const comments = sqliteTable("comments", {
  commnetId: integer("comment_id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  payload: text("payload").notNull(),
  // 외래키 설정
  // references 인자로 함수를 넘겨질 수 있음
  // 그 함수에서 어떤 필드를 참조할 것인지 알려주면 됨
  userId: integer("user_id")
    .notNull()
    // Constraints(제약조건) 설정
    .references(() => users.userId, { onDelete: "cascade" }),
});
