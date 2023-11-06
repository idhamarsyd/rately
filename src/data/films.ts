import axios from "axios";

export interface Film {
  cover: string;
  description: string;
  genre: string;
  id: string;
  title: string;
  trailer: string;
  year: number;
}

export async function getMovies() {
  try {
    const response = await axios.get("/movies");
    const moviesData: Film[] = await response.data;
    films.push(...moviesData);
    console.log(films);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export const films: Film[] = [];
