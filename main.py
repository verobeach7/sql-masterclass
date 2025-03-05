import redis
import sqlite3

# 타입 변환에 사용
import json

r = redis.Redis(
    host="localhost",
    port=6379,
    decode_responses=True,
)

conn = sqlite3.connect("movies.db")
cur = conn.cursor()


# 쿼리하는데 비용이 많이 들어가는 상황이라고 가정
def make_expensive_query():
    redis_key = "director:movies"
    cached_results = r.get(redis_key)
    if cached_results:
        print("Cache hit")
        # Redis에는 String으로 데이터가 들어가 있으므로 Python Object로 변환해줘야 함
        # json.loads(): string을 불러와 python object로 변환
        return json.loads(cached_results)
    else:
        print("Cache miss")  # 캐시 없음
        res = cur.execute("SELECT count(*), director FROM movies GROUP BY director;")
        all_rows = res.fetchall()  # all_rows는 Python Object: Tuple 형태로 받게 됨
        # Redis에 저장하기 위해서는 String 타입으로 바꿔줘야 함. String 타입으로만 저장 가능!
        # json.dumps(): string으로 dump함
        r.set(redis_key, json.dumps(all_rows), ex=20)  # ex: 20초 간 데이터 유지
        return all_rows


v = make_expensive_query()

conn.commit()
conn.close()

r.close()
