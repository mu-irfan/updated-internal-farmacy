import { baseUrl } from "@/lib/utils";
import axios from "axios";

// get companies stats
export const getCompaniesStats = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/company/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get companies list
export const getAllCompaniesList = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/company/global-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// create company to global list
export const createCompany = async (data: any, token: any) => {
  try {
    const res = await axios.post(`${baseUrl}/company/global-list`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// update company
export const updateCompany = async (data: any, token: string) => {
  try {
    const res = await axios.put(`${baseUrl}/company/global-list`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

// delete coompany
export const deleteCompany = async (name: any, token: string) => {
  try {
    const res = await axios.delete(
      `${baseUrl}/company/global-list?company=${name}`,
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
