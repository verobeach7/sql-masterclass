import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { comments, users } from "./schema";
import { eq } from "drizzle-orm";

const sqlite = new Database("users.db");

// logger: true 옵션을 주면 백그라운드에서 무슨 일이 벌어지고 있는지 로그를 보여줌
const db = drizzle(sqlite, { logger: true });

// TypeScript의 자동완성 기능을 이용해 편리하게 쿼리를 완성할 수 있음
// returning은 쿼리 결과를 받아볼 수 있게 해줌
// const result = await db.insert(users).values({ username: "nico" }).returning();

// const result = await db
//   .insert(comments)
//   .values({ payload: "hello drizzle", userId: 1 })
//   .returning();

// SQL Injection 문제로부터 자유로움. 해킹 방지!
// const result = await db.select().from(comments).where(eq(comments.userId, 1));

// sqlite 경우에는 leftjoin과 rightjoin밖에 없지만 다른 데이터베이스에서 지원하는 join도 자동완성에 보여주기는 함
const result = await db
  .select({ user: users.username, comment: comments.payload })
  .from(comments)
  .leftJoin(users, eq(comments.userId, users.userId));

console.log(result);
