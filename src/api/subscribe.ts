import { baseUrl } from "@/lib/utils";
import axios from "axios";

// get subsribed stats
export const getSubsribedsStats = async (uuid: any, token: string) => {
  try {
    const res = await axios.get(
      `${baseUrl}/franchise/subscribe/stats?franchise_fk=${uuid}`,
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

// get subscribe products
export const subscribeProducts = async (data: any, token: string) => {
  try {
    const res = await axios.post(
      `${baseUrl}/franchise/subscribe/product`,
      data,
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

// get subscribe products
export const subscribeSeeds = async (data: any, token: string) => {
  try {
    const res = await axios.post(`${baseUrl}/franchise/subscribe/seed`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get subscribe products
export const getSubscribedProduct = async (uuid: any, token: string) => {
  try {
    const res = await axios.get(
      `${baseUrl}/franchise/subscribe/product?franchise_fk=${uuid}`,
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

// get subscribe seeds
export const getSubscribedSeed = async (uuid: any, token: string) => {
  try {
    const res = await axios.get(
      `${baseUrl}/franchise/subscribe/seed?franchise_fk=${uuid}`,
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

// get unsubscribe products
export const getAllUnSubProducts = async (token: string, fk: string) => {
  try {
    const res = await axios.get(
      `${baseUrl}/franchise/subscribe/unsub-product?franchise_fk=${fk}`,
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

// get unsubscribe products
export const getAllUnSubSeeds = async (token: string, fk: string) => {
  try {
    const res = await axios.get(
      `${baseUrl}/franchise/subscribe/unsub-seed?franchise_fk=${fk}`,
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

// delete subsribed product
export const deleteSubscribedProduct = async (
  uuid: any,
  token: string,
  fk: string
) => {
  try {
    const res = await axios.delete(
      `${baseUrl}/franchise/subscribe/product?uuid=${uuid}&franchise_fk=${fk}`,
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

// delete subsribed seed
export const deleteSubscribedSeed = async (
  uuid: any,
  token: string,
  fk: string
) => {
  try {
    const res = await axios.delete(
      `${baseUrl}/franchise/subscribe/seed?uuid=${uuid}&franchise_fk=${fk}`,
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
