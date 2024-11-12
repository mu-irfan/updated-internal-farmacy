import { baseUrl } from "@/lib/utils";
import axios from "axios";

// get products stats
export const getProductStats = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/product/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// create seed
export const createProduct = async (data: any, token: string) => {
  try {
    const res = await axios.post(`${baseUrl}/product`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get all products
export const getAllProducts = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/product/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get product
export const getProduct = async (uuid: any, token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/product/?uuid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

// update product
export const updateProduct = async (data: any, uuid: any, token: string) => {
  try {
    const res = await axios.patch(`${baseUrl}/product?uuid=${uuid}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

// delete product
export const deleteProductImage = async (uuid: any, token: string) => {
  try {
    const res = await axios.delete(`${baseUrl}/product/image?imgUid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// delete product
export const deleteProduct = async (uuid: any, token: string) => {
  try {
    const res = await axios.delete(`${baseUrl}/product?uuid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get all active ingredient
export const getAlActiveIngredient = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/ingredient/global-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
