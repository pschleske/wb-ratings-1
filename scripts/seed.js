import { Movie, Rating, User, db } from '../src/model.js';
import movieData from './data/movies.json' assert {type: 'json'};

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

db.close()