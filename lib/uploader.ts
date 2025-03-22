import { PhotoType } from "@/contexts/auth-context";
import api from "./api";

interface UploadResponse {
  success: boolean;
  data?: PhotoType;
}

type UploadCallback = (data: UploadResponse["data"]) => void;

export const upload = async (
  file: File,
  data: PhotoType,
  callback: UploadCallback = () => {}
): Promise<void> => {
  if (!file) {
    throw new Error("[uploadImage.ts] File is required!");
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("id", data.id);
  formData.append("alt", data.alt);
  formData.append("caption", data.caption);
  formData.append("sort_index", data.sort_index.toString());

  const { data: res } = await api.post<UploadResponse>(
    "/v1/uploads",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (res.success && res.data) {
    callback(res.data);
  } else {
    throw new Error("[uploadImage.ts] Failed to upload photo");
  }
};
