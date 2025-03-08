import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  // schema: "./drizzle/schema.ts",
  // ./drizzle/schema.ts 를 사용하지 않음.
  // 위 방식은 이미 데이터베이스가 존재하는 경우에 drizzle-kit을 이용하여 schema를 자동으로 생성하게 하기 위한 것!
  schema: "./schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "./users.db",
  },
});
