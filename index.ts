import { createClient } from "redis";

// 아무설정 없이 비워두면 default 값으로 localhost:6379로 연결
const client = createClient();

// bun을 사용하지 않고 npm이나, node.js를 사용하는 경우 await을 최상위에서 사용하지 못할 수도 있음
// 이런 경우 await을 async 함수 안에 넣어서 처리해주면 됨
await client.connect();

await client.set("hello", "world");

const r1 = await client.get("hello");
console.log(r1);

await client.hSet("users:1", {
  username: "nico",
  password: "123",
});

const r2 = await client.hGetAll("users:1");

console.log(r2);

await client.disconnect();
