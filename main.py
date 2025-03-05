from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

# DB 연결
database = client.get_database("movies")

# Collection 연결
movies = database.get_collection("movies")

new_movie = {
    "title": "New movie",
    "director": "Al pachino",
}

result = movies.insert_one(new_movie)

print(result)

client.close()
