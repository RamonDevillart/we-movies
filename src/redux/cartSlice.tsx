import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../types/Movie";

// Initial State Interface
interface CartState {
    items: Movie[];
}

// Initial State
const initialState: CartState = {
    items: JSON.parse(localStorage.getItem('cartWeMovie') || '[]'),
};

// Function to save the state in localStorage
const saveToLocalStorage = (items: Movie[]) => {
    localStorage.setItem('cartWeMovie', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const existingMovie = state.items.find(item => item.id === movie.id);

      if (existingMovie) {
        // if the movie is in the cart, increase the counter
        existingMovie.inCart += 1;
      } else {
        //instead, add inCart: 1
        state.items.push({ ...movie, inCart: 1 });
      }

      saveToLocalStorage(state.items);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      const existingMovie = state.items.find(item => item.id === movieId);

      if (existingMovie) {
        if (existingMovie.inCart > 1) {          
          // If there is more than one in InCart prop, decrease by 1
          existingMovie.inCart -= 1;
        } else {
          // If there is only one in InCart prop, remove the movie from cart
          state.items = state.items.filter(item => item.id !== movieId);
        }
      }

      saveToLocalStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
