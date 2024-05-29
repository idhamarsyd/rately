import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios from "axios";

interface Comment {
  id: number;
  comment: string;
  movie: string;
  label: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  category: "TESTING" | "TRAINING";
}

interface Classification {
  id: number;
  comment_id: number;
  comment: string;
  movie: string;
  classification: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  validation: "SESUAI" | "TIDAK SESUAI";
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
  dataTesting: Comment[];
  dataClassification: Classification[];
  metrics: Metrics | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: CommentsData = {
  data: [],
  dataTraining: [],
  dataTesting: [],
  dataClassification: [],
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

export const fetchDataTesting = createAsyncThunk(
  "comments/fecthDataTesting",
  async () => {
    const response = await axios.get("/select-testing");
    const data = await response.data;
    return data;
  }
);

export const fetchDataClassifications = createAsyncThunk(
  "comments/fecthDataClassifications",
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

export const resetClassification = createAsyncThunk(
  "comments/resetClassification",
  async () => {
    const response = await axios.get("/reset-classification");
    const data = await response.data;
    return data;
  }
);

export const fetchStartClassification = createAsyncThunk(
  "comments/fetchStartClassification",
  async () => {
    const response = await axios.get("/run_sentiment");
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
    emptyClassification: (state) => {
      state.dataClassification = [];
      state.metrics = null;
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
    // Fetch all data testing
    builder.addCase(fetchDataTesting.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDataTesting.fulfilled, (state, action) => {
      state.dataTesting = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchDataTesting.rejected, (state, action) => {
      state.isError = true;
    });
    // Fetch all data classification
    builder.addCase(fetchDataClassifications.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDataClassifications.fulfilled, (state, action) => {
      state.dataClassification = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchDataClassifications.rejected, (state, action) => {
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
    // Start classification
    builder.addCase(fetchStartClassification.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStartClassification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchStartClassification.rejected, (state, action) => {
      state.isError = true;
    });
    // Reset classification
    builder.addCase(resetClassification.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(resetClassification.fulfilled, (state, action) => {
      state.metrics = null;
      state.dataClassification = [];
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(resetClassification.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export const { setLoading, emptyClassification } = commentSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectComments = (state: RootState) => state.comments.data;
export const selectMetrics = (state: RootState) => state.comments.metrics;
export const selectClassifications = (state: RootState) =>
  state.comments.dataClassification;
export const selectDataTraining = (state: RootState) =>
  state.comments.dataTraining;
export const selectDataTesting = (state: RootState) =>
  state.comments.dataTesting;
export const selectMoviesList = (state: RootState) => state.movies.data;

export default commentSlice.reducer;
