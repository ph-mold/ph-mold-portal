import { axiosInstance } from "../axiosInstance";
import { API } from "../constants/api";
import {
  LABEL_TYPES,
  LabelSticker,
  LabelStickerListParams,
  LabelType,
} from "../types/label-sticker";

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

// 라벨 타입에 따라 PDF 생성 함수 선택
export const getPDFGenerateFunction = (labelType: LabelType) => {
  switch (labelType) {
    case LABEL_TYPES.LS_3509:
      return postLS3509PDF;
    case LABEL_TYPES.LS_3510:
      return postLS3510PDF;
    default:
      throw new Error(`Unknown label type: ${labelType}`);
  }
};

// 라벨 타입에 따라 PDF 재생성 함수 선택
export const getPDFRegenerateFunction = (labelType: LabelType) => {
  switch (labelType) {
    case LABEL_TYPES.LS_3509:
      return postLS3509PDFRegenerate;
    case LABEL_TYPES.LS_3510:
      return postLS3510PDFRegenerate;
    default:
      throw new Error(`Unknown label type: ${labelType}`);
  }
};

// 라벨 스티커 이력 조회
export const GET_LABEL_STICKER_HISTORIES = "getLabelStickerHistories";
export const getLabelStickerHistories = async (
  params: LabelStickerListParams
) => {
  const response = await axiosInstance.get(API.LABEL_STICKER.GET_HISTORIES, {
    params,
  });
  return response.data;
};

export const DELETE_LABEL_STICKER_HISTORY = "deleteLabelStickerHistory";
export const deleteLabelStickerHistory = async (id: string) => {
  const response = await axiosInstance.delete(
    API.LABEL_STICKER.DELETE_HISTORIES(id)
  );
  return response.data;
};
