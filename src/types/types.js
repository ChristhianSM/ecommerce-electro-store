
export const types = {
    login : '[Auth] Login',
    logout : '[Auth] Logout',
    dataUser : '[Auth] Data User',
    // Favorites Products
    favoriteProductAdd : "[Favorite Product] Add favorite Product",
    favoriteProductDelete : "[Favorite Product] Delete favorite Product",

    loadProduct : "[Product] Load Products",
    loadFeaturedProducts : "[Product] Load Featured Products",
    loadProductsForCategory : "[Product] Load Products For Category",

    // Filtros de productos
    setFilters : "[Filters] : Set Filters",
    deleteFilters : "[Filters] : Delete Filters",
    setFilteredProducts : "[Filters] : Set Filtered Products",
    setFilteredProductsForFilters : "[Filters] : Set Filtered Products for filters",
    setProductsForOrder : "[Filters] : Set Products For Order",

    // Shopping cart
    shoppingCartAddProduct : "[Shopping Cart] Add Product Shopping Cart",
    shoppingCartUpdateAmountProduct : "[Shopping Cart] Update Amount Product Shopping Cart",
    shoppingCartIncrementOrDecrementAmountProduct : "[Shopping Cart] Update Increment or Decrement amount Product Shopping Cart",
    shoppingCartRemoveProduct : "[Shopping Cart] Remove Product Shopping Cart",

    // Payment
    paymentSetDataInitial : "[Payment] Set Data Initial",
    paymentCouponDiscount : "[Payment] Apply coupon discount",
    paymentReset : "[Payment] Reset state Payment",
    paymentShippingType : "[Payment] Change Shipping type",
    paymentGetTotalWithDiscount : "[Payment] Get total with discount",
    paymentSetDataUser : "[Payment] Set data user",

    // Loading
    uiStartLoading : "[UI] Start Loading",
    uiFinishLoading : "[UI] Finish Loading",
}