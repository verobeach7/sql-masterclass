import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite", // 데이터베이스 옵션 중에서 선택 가능
  // Drizzle의 관점에서 데이터베이스가 어떤 구조인지 알려주는 것
  schema: "./drizzle/schema.ts",
  // drizzle-kit에 의해 생섣된 모든 코드를 넣을 폴더 경로
  out: "./drizzle",
  // port, hostname, username, password 등을 여기에 작성하면 됨
  dbCredentials: {
    // SQLite의 경우에는 파일 경로만 주면 됨
    url: "./movies.db",
  },
});

// schema를 수정하는 경우 Drizzle이 실제 SQL 데이터베이스의 테이블들을 변경할 수 있는 SQL 코드를 drizzle-kit가 만들어 줌
