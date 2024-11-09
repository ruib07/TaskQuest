import { ProductivityMetric } from "../../../types/ProductivityMetrics/productivityMetric";
import { GetAuthHeaders } from "../../getAuthHeaders";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const UpdateProductivityMetricData = async (
  productivityMetricId: string,
  newProductivityMetricData: Partial<ProductivityMetric>
) => {
  const token = GetAuthHeaders();

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
