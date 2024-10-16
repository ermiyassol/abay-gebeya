// -- AUTH --
export const getLoggedInUserSession="auth/get-logged-in-user-info";
export const authenticateEndPoint = "auth/authenticate"; //? POST // for all users(customer, manager & admin)
export const registerUserEndPoint = "auth/register"; //? POST

//! -- PRODUCTS --
export const productEndpoint = "products"
// getAllProductsEndPoint = "products"; //? GET
// getProductEndPoint = "products/ - ID -"; //? GET + ID
// createProductEndPoint = "products"; //? POST
// updateProductEndPoint = "products/1"; //? PUT
// updateProductImageEndPoint = "products/- ID -/image"; //? PATCH
// deleteProductEndPoint = "products/1"; //? DELETE

//! -- INVENTORIES --
export const inventoryEndpoint = "inventories"
// getAllInventoriesEndPoint = "inventories"; //? GET
// getInventoryEndPoint = "inventories/ - ID -"; //? GET + ID
// createInventoryEndPoint = "inventories"; //? POST
// updateInventoryEndPoint = "inventories/1"; //? PUT
// deleteInventoryEndPoint = "inventories/1"; //? DELETE

//! -- ORDERS --
export const orderEndpoint = "orders"
// getAllOrdersEndPoint = "orders"; //? GET
// getOrderEndPoint = "orders/ - ID -"; //? GET + ID
// confirmOrderEndPoint = "orders/- ID -/confirm"; //? PATCH
// completeOrderEndPoint = "orders/- ID -/complete"; //? PATCH
// cancelOrderEndPoint = "orders/- ID -/cancel"; //? PATCH
// createOrderEndPoint = "orders"; //? POST
// deleteOrderEndPoint = "orders/1"; //? DELETE

//! -- USERS --
export const changePasswordEndpoint = "users/change-password" //? PATCH
export const getUserOrdersEndpoint = "users/orders" //? GET
export const userEndpoint = "users" //? GET
// getSpecificOrder = "users/- ID -/orders"; //? GET

//! -- ADMIN --
export const upgradeUserEndpoint = "admin/upgrade" //? PATCH + ID
export const downgradeUserEndpoint = "admin/downgrade" //? PATCH + ID
export const blockUserEndpoint = "admin/block" //? PATCH + ID
export const unblockUserEndpoint = "admin/unblock" //? PATCH + ID