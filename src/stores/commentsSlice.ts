import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios from "axios";

interface Comment {
  id: number;
  comment: string;
  movie: string;
  label: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
}

interface Classification {
  id: number;
  comment_id: number;
  comment: string;
  movie: string;
  classification: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
}

interface Metrics {
  id: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
}

interface CommentsData {
  data: Comment[];
  dataTraining: Comment[];
  classification: Classification[];
  metrics: Metrics | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: CommentsData = {
  data: [],
  dataTraining: [],
  classification: [],
  metrics: null,
  isLoading: false,
  isError: false,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await axios.get("/comments");
    const data = await response.data;
    return data;
  }
);

export const fetchDataTraining = createAsyncThunk(
  "comments/fecthDataTraining",
  async () => {
    const response = await axios.get("/select-training");
    const data = await response.data;
    return data;
  }
);

export const fetchClassifications = createAsyncThunk(
  "comments/fecthClassifications",
  async () => {
    const response = await axios.get("/select-classifications");
    const data = await response.data;
    return data;
  }
);

export const fetchMetrics = createAsyncThunk(
  "comments/fetchMetrics",
  async () => {
    const response = await axios.get("/select-metrics");
    const data = await response.data;
    return data;
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    // Fetch all comments
    builder.addCase(fetchComments.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.isError = true;
    });
    // Fetch all data training
    builder.addCase(fetchDataTraining.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDataTraining.fulfilled, (state, action) => {
      state.dataTraining = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchDataTraining.rejected, (state, action) => {
      state.isError = true;
    });
    // Fetch all classification result
    builder.addCase(fetchClassifications.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchClassifications.fulfilled, (state, action) => {
      state.classification = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchClassifications.rejected, (state, action) => {
      state.isError = true;
    });
    // Fetch all metrics
    builder.addCase(fetchMetrics.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMetrics.fulfilled, (state, action) => {
      state.metrics = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchMetrics.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export const { setLoading } = commentSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectComments = (state: RootState) => state.comments.data;
export const selectMetrics = (state: RootState) => state.comments.metrics;
export const selectClassifications = (state: RootState) =>
  state.comments.classification;
export const selectDataTraining = (state: RootState) =>
  state.comments.dataTraining;
export const selectMoviesList = (state: RootState) => state.movies.data;

export default commentSlice.reducer;
