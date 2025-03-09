import * as mongoose from "mongoose";

await mongoose.connect("mongodb://localhost:27017/movies");

// Schema를 이용해 데이터가 어떻게 생겼는지 구성할 수 있음. 즉, 구조 설계
const moviesSchema = new mongoose.Schema({
  // Type으로 JavaScript의 Native Type 사용 가능
  title: { type: String, required: true },
  director: { type: String, required: true },
  rating: {
    type: Number,
    required: true,
    // [설정값, 오류 시 메시지] 형식으로 설정 가능
    min: [1, "No movie deserves less than 1"],
    max: [10, "No movie is better than 10"],
  },
});

// "Movie" 모델명으로 모델을 생성하고 모델의 타입을 moviesSchema로 설정함
// 여기서 만든 모델을 이용하여 MongoDB와 통신함!!! 즉, MongoDB가 이 구조를 지키게 됨.
const Movie = mongoose.model("Movie", moviesSchema);

// // Create Movie
// const movie = await Movie.create({
//   title: "The mongoose",
//   rating: 10,
// });

// console.log(movie);

// // Find Movies
// const movies = await Movie.find({ director: "Christopher Nolan" });
// // 반환값은 JavaScript 객체로 값이 표현됨
// movies.forEach((movie) => console.log(movie.title));

// 쿼리 연산자 이용
const movies = await Movie.find({ rating: { $gte: 8.2 } });

console.log(movies);

// 반드시 사용 완료 후에는 커넥션을 종료해야 함
await mongoose.disconnect();
