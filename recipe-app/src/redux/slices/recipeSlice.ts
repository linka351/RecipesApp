import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async ({id }) => {
    return await fetch("https://jsonplaceholder.typicode.com/posts/" + id).then(
      (response) => response.json()
    );
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    isLoading: false,
    recipes: [],
    error: null,
  },
  reducers: {
    addRecipe: (state, action) => {
      state.push(action.payload);
    },
    setRecipes: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.recipes = [];
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.recipes = [];
      }),
});

export const { addRecipe, setRecipes } = recipeSlice.actions;
export const recipeReducer = recipeSlice.reducer;
