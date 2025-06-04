import { API } from "../constants/api";
import { axiosInstance } from "../axiosInstance";

export const UPLOAD_FILE = "uploadFile";

export async function uploadFile(
  file: File
): Promise<{ path: string } | undefined> {
  if (file.type !== "image/png") {
    console.error("PNG 파일만 업로드 가능합니다.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axiosInstance.post<{ path: string }>(
      API.FILE.UPLOAD_FILE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("파일 업로드 실패:", error);
    if (error instanceof Error) {
      console.error("에러 상세:", error.message);
    }
    return;
  }
}
