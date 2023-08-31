import { Movie, Rating, User, db } from '../src/model.js';
import movieData from './data/movies.json' assert {type: 'json'};
import userData from './data/users.json' assert {type: 'json'};
import lodash from 'lodash';

console.log('Syncing database...');

await db.sync({ force: true })

console.log('Seeding database...')

// console.log(movieData[0])

const moviesInDB = movieData.map(async (movie) => {
    return await Movie.create({
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.posterPath,
        releaseDate: new Date(Date.parse(movie.releaseDate))
    })
})

await Promise.all(moviesInDB)
// console.log(moviesInDB)

const usersInDB = userData.map(async (user) => {
    return await User.create({
        email: user.email,
        password: user.password
    })
});

await Promise.all(usersInDB)

// const ratingsInDB = await Promise.all(
//     usersInDB.flatMap(async (user) => {
//         const randomMovies = lodash.sampleSize(moviesInDB, 10);

//         const movieRatings = await Promise.all(randomMovies.map(async (movie) => {
//             return Rating.create({
//                 score: lodash.random(1, 5),
//                 userId: user.userId,
//                 movieId: movie.movieId
//             });
//         }));
//         return movieRatings;
//     }),
// );

// console.log(ratingsInDB);

const ratingsInDB = await Promise.all(
    usersInDB.flatMap(async (user) => {
        const randomMovies = lodash.sampleSize(moviesInDB, 10);

        const movieRatings = await Promise.all(randomMovies.map(async (movie) => {
            const ratingData = {
                score: lodash.random(1, 5),
                userId: user.userId,
                movieId: movie.movieId
            };

            console.log("Creating rating with data:", ratingData);

            const createdRating = await Rating.create(ratingData);
            return createdRating;
        }));
        return movieRatings;
    }),
);

// console.log("Created ratings:", ratingsInDB);

// console.log(usersInDB)

await db.close()