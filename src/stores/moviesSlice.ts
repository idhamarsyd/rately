import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

// Define a type for the slice state
interface MoviesData {
  data: Film[];
  detail: Film[];
  isLoading: boolean;
  isError: boolean;
}

// Define the initial state using that type
const initialState: MoviesData = {
  data: [],
  detail: [],
  isLoading: false,
  isError: false,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get("/movies");
  const data = await response.data;
  return data;
});

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

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id: string) => {
    // const response = await axios.delete(`/delete-movie/${id}`);
    console.log(id);
    // const msg = await response.;
    // return data;
  }
);

export const movieSlice = createSlice({
  name: "movies",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addMovies: (state, action: PayloadAction<Film[]>) => {
      state.data = action.payload;
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
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.isError = true;
    });
    // Fetch movie detail
    builder.addCase(fetchMovieDetail.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
      state.detail = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchMovieDetail.rejected, (state, action) => {
      state.isError = true;
    });
    // search movie
    builder.addCase(searchMovie.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(searchMovie.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(searchMovie.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export const { setLoading, addMovies } = movieSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMovies = (state: RootState) => state.movies.data;
export const selectMovieDetail = (state: RootState) => state.movies.detail[0];

export default movieSlice.reducer;
