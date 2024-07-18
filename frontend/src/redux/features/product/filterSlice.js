import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;
      const searchTerm = search.toLowerCase();

      const tempProducts = products.filter(
        (product) =>{ 
          const productName = product.name ? product.name.toLowerCase() : '';
          const productCategory = product.category ? product.category.toLowerCase() : '';

        return productName.includes(searchTerm) || productCategory.includes(searchTerm);
    });

      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredPoducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
