import { API_BASE_URL } from "./environment";

export const API_URLS = {
  stats: {
    getViewCount: `${API_BASE_URL}/siteInfo/{siteName}`, // GET
    increaseCount: `${API_BASE_URL}/siteInfo/{siteName}/`, // POST
  },
  home: {
    trackOrder: `${API_BASE_URL}/shipping/track`, // POST with query params trackingId and phoneNumber
  },
  product: {
    getProductList: `${API_BASE_URL}/products`,

    getAdminProducts: `${API_BASE_URL}/products/admin-get`,
    // Home page
    getFeatured: `${API_BASE_URL}/products/featured`,
    getDestination: `${API_BASE_URL}/products/destination`,
    getTodayBestDeal: `${API_BASE_URL}/products/deals`,
    getNewArrivals: `${API_BASE_URL}/products/new-arrivals`,
    getBestSeller: `${API_BASE_URL}/products/bestsellers`,
    getCategories: `${API_BASE_URL}/products/categories`,
  },
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    signin: `${API_BASE_URL}/auth/login`,
    // Get info about the user with the token. Used to get roles
    me: `${API_BASE_URL}/auth/me`,
    fetchNoti: `${API_BASE_URL}/notification/{userId}`, // GET
    readNoti: `${API_BASE_URL}/notification/`, // PATCH + id
    readAllNoti: `${API_BASE_URL}/notification/all/{userId}`, // PATCH

    getOrder: `${API_BASE_URL}/order/`, // GET
  },
  admin: {
    addProduct: `${API_BASE_URL}/products/`, // POST
    updateProduct: `${API_BASE_URL}/products/`, // PUT + id
    deleteProduct: `${API_BASE_URL}/products/`, // DELETE + id

    // Category
    addCategory: `${API_BASE_URL}/products/category`, // POST
    updateCategory: `${API_BASE_URL}/products/category`, // PUT + id
    deleteCategory: `${API_BASE_URL}/products/category`, // DELETE + id

    // Order ops
    getOrders: `${API_BASE_URL}/order/admin`, // GET
    processOrder: `${API_BASE_URL}/order/orderId/process`,
    processDelivered: `${API_BASE_URL}/order/orderId/process-delivered`,
    cancelOrder: `${API_BASE_URL}/order/orderId/cancel`,

    // User ops
    getUsers: `${API_BASE_URL}/user/search`, // GET
    deleteUser: `${API_BASE_URL}/user/`, // DELETE + id
    updateUser: `${API_BASE_URL}/user/`, // PUT + id

    // Voucher ops
    getVouchersFromAdmin: `${API_BASE_URL}/voucher/`, // GET
    addVoucher: `${API_BASE_URL}/voucher`, // POST
    activateVoucher: `${API_BASE_URL}/voucher/{voucherCode}/activate`, // PUT
    deactivateVoucher: `${API_BASE_URL}/voucher/{voucherCode}/deactivate`, // PUT
    deleteVoucher: `${API_BASE_URL}/voucher/`, // DELETE + code
  },
  cart: {
    createOrder: `${API_BASE_URL}/order`, //  POST
    getPromoCodeValue: `${API_BASE_URL}/voucher/code/discount-amount`, // GET
    canUsePromoCode: `${API_BASE_URL}/voucher/code/can-use`, // GET
  },
};
