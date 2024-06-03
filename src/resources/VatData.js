import { auth } from "../state/utilities/authConfig";

export const VatData = {
  async validate_vat(data) {
    try {
      const response = await auth.privateRoute(`/api/vat_data`, {
        method: 'GET',
        params: data,
      });
      return response.data;
    } catch (error) {
      console.error("Error validating vat:", error);
      throw error;
    }
  },
};
