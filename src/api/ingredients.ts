import { baseUrl } from "@/lib/utils";
import axios from "axios";

// create ingredients
export const createIngredient = async (data: any, token: any) => {
  try {
    const res = await axios.post(`${baseUrl}/ingredient/global-list`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get ingredients list
export const getAllIngredientsList = async (token: string) => {
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

// update ingredient
export const updateIngredient = async (data: any, token: string) => {
  try {
    const res = await axios.put(`${baseUrl}/ingredient/global-list`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

// delete ingredient
export const deleteIngredient = async (name: any, token: string) => {
  try {
    const res = await axios.delete(
      `${baseUrl}/ingredient/global-list?ingredient=${name}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
