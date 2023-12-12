import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios from "axios";

interface Film {
  cover: string;
  description: string;
  genre: string;
  id: string;
  title: string;
  trailer: string;
  year: number;
}

interface Comment {
  id: number;
  comment: string;
  comment_id: number;
  movie: number;
  classification: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
}

interface ClassifiedFilm {
  cover: string;
  description: string;
  genre: string;
  id: string;
  title: string;
  trailer: string;
  year: number;
  comments: Comment[];
}

// Define a type for the slice state
interface MoviesData {
  data: Film[];
  classified_data: ClassifiedFilm[];
  detail: ClassifiedFilm | null;
  isLoading: boolean;
  isError: boolean;
}

// Define the initial state using that type
const initialState: MoviesData = {
  data: [],
  classified_data: [],
  detail: null,
  isLoading: false,
  isError: false,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get("/movies-data");
  const data = await response.data;
  return data;
});

export const fetchClassifiedMovies = createAsyncThunk(
  "movies/fetchClassifiedMovies",
  async () => {
    const response = await axios.get("/movies-classified");
    const data = await response.data;
    return data;
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (id: string) => {
    const response = await axios.get(`/movie/${id}`);
    const data = await response.data;
    return data;
  }
);

export const searchMovie = createAsyncThunk(
  "movies/searchMovie",
  async (param: string) => {
    const response = await axios.get(`/search/${param}`);
    const data = await response.data;
    return data;
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    // Fetch all movies
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchMovies.rejected, (state) => {
      state.isError = true;
    });
    // Fetch classified movies
    builder.addCase(fetchClassifiedMovies.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchClassifiedMovies.fulfilled, (state, action) => {
      state.classified_data = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchClassifiedMovies.rejected, (state) => {
      state.isError = true;
    });
    // Fetch movie detail
    builder.addCase(fetchMovieDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
      state.detail = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchMovieDetail.rejected, (state) => {
      state.isError = true;
    });
    // search movie
    builder.addCase(searchMovie.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchMovie.fulfilled, (state, action) => {
      state.classified_data = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(searchMovie.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const { setLoading } = movieSlice.actions;

export const selectMovies = (state: RootState) => state.movies.data;
export const selectClassifiedMovies = (state: RootState) =>
  state.movies.classified_data;
export const selectMovieDetail = (state: RootState) => state.movies.detail;
// export const selectPositiveComments = (comments: Comment[]) => {
//   return comments.filter((comment) => comment.label === "POSITIVE");
// };
// export const selectMoviesWithCommentCounts = createSelector(
//   [selectClassifiedMovies],
//   (movies: ClassifiedFilm[]) => {
//     return movies.map((movie) => {
//       const positiveComments = selectPositiveComments(movie.comments).length;

//       return {
//         ...movie,
//         positiveComments,
//       };
//     });
//   }
// );

export default movieSlice.reducer;
