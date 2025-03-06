import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { movies } from "./drizzle/schema";

// DB 선택
// 단지 어댑터일 뿐이며 MySQL, PostgreSQL 등 각 DB는 어댑터 설정이 다름
const sqlite = new Database("movies.db");

// 어댑터 선택
// drizzle을 입력하면 여러 가지 어댑터가 있는 것을 확인할 수 있으며, 이 중 내가 사용할 어댑터를 선택해주기만 하면 됨
const db = drizzle(sqlite);

// from()의 인자로 데이터베이스의 스키마를 넘겨줘야 함
const results = await db
  .select({
    id: movies.movieId,
    // movies 데이터베이스의 title 컬럼을 가져옴
    title: movies.title,
    overview: movies.overview,
  })
  .from(movies)
  .limit(50);

console.log(results);
