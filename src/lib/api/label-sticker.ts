import { axiosInstance } from "../axiosInstance";
import { API } from "../constants/api";
import { LabelSticker } from "../types/label-sticker";

export const POST_LS_3510_PDF = "postLS3510PDF";
export const postLS3510PDF = async (data: LabelSticker) => {
  const response = await axiosInstance.post(API.LABEL_STICKER.LS_3510, data, {
    responseType: "blob",
    headers: {
      Accept: "application/pdf",
    },
  });
  return response.data;
};
