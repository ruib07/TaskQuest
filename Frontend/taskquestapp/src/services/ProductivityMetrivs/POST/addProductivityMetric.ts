import { ProductivityMetric } from "../../../types/ProductivityMetrics/productivityMetric";
import axios from "axios";
import { GetAuthHeaders } from "../../getAuthHeaders";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const AddProductivityMetric = async (
  newProductivityMetric: ProductivityMetric
) => {
  const token = GetAuthHeaders();

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
