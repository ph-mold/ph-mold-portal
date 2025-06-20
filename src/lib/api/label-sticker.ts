import { axiosInstance } from "../axiosInstance";
import { API } from "../constants/api";
import { LabelSticker, LabelStickerListParams } from "../types/label-sticker";

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

export const POST_LS_3510_PDF_REGENERATE = "postLS3510PDFRegenerate";
export const postLS3510PDFRegenerate = async (
  data: LabelSticker,
  signal?: AbortSignal
) => {
  const response = await axiosInstance.post(
    API.LABEL_STICKER.LS_3510_REGENERATE,
    data,
    {
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
      },
      signal,
    }
  );
  return response.data;
};

export const POST_LS_3509_PDF = "postLS3509PDF";
export const postLS3509PDF = async (data: LabelSticker) => {
  const response = await axiosInstance.post(API.LABEL_STICKER.LS_3509, data, {
    responseType: "blob",
    headers: {
      Accept: "application/pdf",
    },
  });
  return response.data;
};

export const POST_LS_3509_PDF_REGENERATE = "postLS3509PDFRegenerate";
export const postLS3509PDFRegenerate = async (
  data: LabelSticker,
  signal?: AbortSignal
) => {
  const response = await axiosInstance.post(
    API.LABEL_STICKER.LS_3509_REGENERATE,
    data,
    {
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
      },
      signal,
    }
  );
  return response.data;
};

export const GET_LABEL_STICKER_HISTORIES = "getLabelStickerHistories";
export const getLabelStickerHistories = async (
  params: LabelStickerListParams
) => {
  const response = await axiosInstance.get(API.LABEL_STICKER.GET_HISTORIES, {
    params,
  });
  return response.data;
};
