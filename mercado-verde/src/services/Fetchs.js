const URL_BASE = "http://localhost:3000/";

//================================================================================
// Product Functions 📦
//================================================================================

/**
 * Fetches all products from the server.
 * @returns {Promise<Array>} A promise that resolves to an array of products.
 */
const GetProducts = async () => {
  try {
    const response = await fetch(`${URL_BASE}product`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Products fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Fetches a single product by its ID.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product object.
 */
const GetProductById = async (id) => {
  try {
    const response = await fetch(`${URL_BASE}product/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Product fetched successfully:", data);
    return data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

/**
 * Creates one or more new products.
 * @param {Array<Object>} productData - An array of product objects to create.
 * @returns {Promise<Array>} A promise that resolves to an array of the created products.
 */
const CreateProduct = async (productData) => {
  console.log("Creating product with data:", productData);
  try {
    const response = await fetch(`${URL_BASE}product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const createdProduct = await response.json();
    console.log("Product created successfully:", createdProduct);
    return createdProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

/**
 * Updates an existing product.
 * @param {string} id - The ID of the product to update.
 * @param {Object} updatedData - An object containing the updated fields.
 * @returns {Promise<Object>} A promise that resolves to the updated product object.
 */
const UpdateProduct = async (id, updatedData) => {
  try {
    const response = await fetch(`${URL_BASE}product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedProduct = await response.json();
    console.log("Product updated successfully:", updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a product by its ID.
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<Object>} A promise that resolves to the deletion confirmation message.
 */
const DeleteProduct = async (id) => {
  try {
    const response = await fetch(`${URL_BASE}product/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Product deleted successfully");
    return result;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};

//================================================================================
// Coupon Functions 🎟️
//================================================================================

/**
 * Fetches all coupons from the server.
 * @returns {Promise<Array>} A promise that resolves to an array of coupons.
 */
const GetCoupons = async () => {
  try {
    const response = await fetch(`${URL_BASE}coupon`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Coupons fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
};

/**
 * Fetches a single coupon by its ID.
 * @param {string} id - The ID of the coupon to fetch.
 * @returns {Promise<Object>} A promise that resolves to the coupon object.
 */
const GetCouponById = async (id) => {
  try {
    const response = await fetch(`${URL_BASE}coupon/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Coupon fetched successfully:", data);
    return data;
  } catch (error) {
    console.error(`Error fetching coupon with id ${id}:`, error);
    throw error;
  }
};

/**
 * Creates one or more new coupons.
 * @param {Array<Object>} couponData - An array of coupon objects to create.
 * @returns {Promise<Array>} A promise that resolves to an array of the created coupons.
 */
const CreateCoupon = async (couponData) => {
  try {
    const response = await fetch(`${URL_BASE}coupon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(couponData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const createdCoupon = await response.json();
    console.log("Coupon created successfully:", createdCoupon);
    return createdCoupon;
  } catch (error) {
    console.error("Error creating coupon:", error);
    throw error;
  }
};

/**
 * Updates an existing coupon.
 * @param {string} id - The ID of the coupon to update.
 * @param {Object} updatedData - An object containing the updated fields.
 * @returns {Promise<Object>} A promise that resolves to the updated coupon object.
 */
const UpdateCoupon = async (id, updatedData) => {
  try {
    const response = await fetch(`${URL_BASE}coupon/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedCoupon = await response.json();
    console.log("Coupon updated successfully:", updatedCoupon);
    return updatedCoupon;
  } catch (error) {
    console.error(`Error updating coupon with id ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a coupon by its ID.
 * @param {string} id - The ID of the coupon to delete.
 * @returns {Promise<Object>} A promise that resolves to the deletion confirmation message.
 */
const DeleteCoupon = async (id) => {
  try {
    const response = await fetch(`${URL_BASE}coupon/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Coupon deleted successfully");
    return result;
  } catch (error) {
    console.error(`Error deleting coupon with id ${id}:`, error);
    throw error;
  }
};

//================================================================================
// User Functions 👤
//================================================================================

/**
 * Fetches all users from the server.
 * @returns {Promise<Array>} A promise that resolves to an array of users.
 */
const GetUsers = async () => {
  try {
    const response = await fetch(`${URL_BASE}user`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Users fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

/**
 * Fetches a single user by their ID.
 * @param {string} id - The ID of the user to fetch.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 */
const GetUserById = async (id) => {
  try {
    const response = await fetch(`${URL_BASE}user/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("User fetched successfully:", data);
    return data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

/**
 * Creates one or more new users.
 * @param {Array<Object>} userData - An array of user objects to create.
 * @returns {Promise<Array>} A promise that resolves to an array of the created users.
 */
const CreateUser = async (userData) => {
  try {
    const response = await fetch(`${URL_BASE}user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const createdUser = await response.json();
    console.log("User created successfully:", createdUser);
    return createdUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

/**
 * Updates an existing user.
 * @param {string} id - The ID of the user to update.
 * @param {Object} updatedData - An object containing the updated fields.
 * @returns {Promise<Object>} A promise that resolves to the updated user object.
 */
const UpdateUser = async (id, updatedData) => {
  try {
    const response = await fetch(`${URL_BASE}user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedUser = await response.json();
    console.log("User updated successfully:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a user by their ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<Object>} A promise that resolves to the deletion confirmation message.
 */
const DeleteUser = async (id) => {
  try {
    const response = await fetch(`${URL_BASE}user/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("User deleted successfully");
    return result;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
};

// Exporting all functions
export {
  GetProducts,
  GetProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  GetCoupons,
  GetCouponById,
  CreateCoupon,
  UpdateCoupon,
  DeleteCoupon,
  GetUsers,
  GetUserById,
  CreateUser,
  UpdateUser,
  DeleteUser,
};
