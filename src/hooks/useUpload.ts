import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export interface UploadPayload {
  resumeUrl: string;
  jobDescUrl: string;
}

export interface UploadResponse {
  interviewId: string;
}

export function useUpload() {
  const navigate = useNavigate();

  return useMutation<UploadResponse, Error, UploadPayload>({
    mutationFn: async ({ resumeUrl, jobDescUrl }) => {
      const res = await fetch(`http://localhost:8000/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeUrl, jobDescUrl }),
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      return res.json() as Promise<UploadResponse>;
    },
    onSuccess: (data) => {
      navigate(`/interview/${data.interviewId}`);
    },
    onError: (err) => {
      console.error("Upload error:", err);
    },
  });
}
