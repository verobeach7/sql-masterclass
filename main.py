from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

# DB 연결
database = client.get_database("movies")

# Collection 연결
movies = database.get_collection("movies")

# query = {"director": "Christopher Nolan"}
query = {"rating": {"$gte": 8}}

results = movies.find(query)

# mongosh에서는 fetchall, fetchone 등을 사용하지만 python에서는 이러한 것들 사용이 불가능

for movie in results:
    print(movie)
