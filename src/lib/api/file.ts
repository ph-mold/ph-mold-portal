import { API } from "../constants/api";
import { fetcher } from "../fetcher";

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
  return await fetcher(API.FILE.UPLOAD_FILE, {
    method: "POST",
    body: formData,
  });
}
