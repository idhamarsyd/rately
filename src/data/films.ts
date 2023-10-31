export interface Film {
  ID: string
  title: string
  year: string
  genre: string
  cover: string
}

export const films: Film[] = [
  {
    ID: "1",
    title: "Talk To Me",
    year: "2023",
    genre: "Horror/Mystery",
    cover: "https://m.media-amazon.com/images/M/MV5BMmY5ZGE4NmUtZWI4OS00ZWJmLWFjMzgtOWUyZjI4NDg3Y2E5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg"
  },
  {
    ID: "2",
    title: "Elemental",
    year: "2023",
    genre: "Comedy/Fantasy",
    cover: "https://m.media-amazon.com/images/M/MV5BZjYxYWVjMDMtZGRjZS00ZDE4LTk0OWUtMjUyOTI4MmYxNjgwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg"
  },
  {
    ID: "3",
    title: "Avengers: Endgame",
    year: "2019",
    genre: "Action/Sci-fi",
    cover: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg"
  },
  {
    ID: "4",
    title: "Ratatouille",
    year: "2007",
    genre: "Family/Comedy",
    cover: "https://m.media-amazon.com/images/I/714TagaORGL.jpg"
  },
  {
    ID: "5",
    title: "Coraline",
    year: "2009",
    genre: "Drama/Family",
    cover: "https://m.media-amazon.com/images/M/MV5BMjM2NTVkYjctYTMxZi00OTVlLWEyNzMtODg4MDRkNjBhYjZhXkEyXkFqcGdeQXVyNjI4NDY5ODM@._V1_FMjpg_UX1000_.jpg"
  }
]