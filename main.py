import sqlite3

# In Memory Database
# :memory: 를 이용하여 connection을 하면 메모리에 데이터베이스를 불러와서 Redis처럼 사용할 수 있게 됨
conn = sqlite3.connect("movies.db")

cur = conn.cursor()

res = cur.execute("SELECT movie_id, title FROM movies;")

# # Cursor는 fetch를 하면 어디까지 fetch했는지를 기억해 놓음. 위치를 기억하기 때문에 커서라고 함.
# first_thousand = res.fetchmany(1000)  # 1000번째 row까지 fetch했음을 기억
# next_thousand = res.fetchmany(10000)  # 11000번째 row까지 fetch했음을 기억
# last_movies = res.fetchall()  # 11001번째 row부터 끝까지 가져옴

# print(
#     res.fetchone(),
#     res.fetchone(),
#     res.fetchone(),
#     res.fetchone(),
# )

for movie in res:
    print(movie)

conn.commit()
conn.close()
