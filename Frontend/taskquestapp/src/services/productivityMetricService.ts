import { ProductivityMetric } from "../types/ProductivityMetrics/productivityMetric";
import { GetAuthHeaders } from "./getAuthHeaders";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const token = GetAuthHeaders();

export const GetProductivityMetricByUser = async (userId: string) => {
  if (!token) return;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/productivitymetrics/users/${userId}`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to retrieve productivity metric by user ID!");
  }
};

export const AddProductivityMetric = async (
  newProductivityMetric: ProductivityMetric
) => {
  if (!token) return;

  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/productivitymetrics`,
      newProductivityMetric,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to add new productivity metric!");
  }
};

export const UpdateProductivityMetricData = async (
  productivityMetricId: string,
  newProductivityMetricData: Partial<ProductivityMetric>
) => {
  if (!token) return;

  try {
    const response = await axios.put(
      `${API_BASE_URL}/${API_VERSION}/productivitymetrics${productivityMetricId}`,
      newProductivityMetricData,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to update productivity metric!");
  }
};
