import { useCallback, type FC } from "react";
import { useDropzone } from "react-dropzone";

export interface UploadedDoc {
  fileKey: string;
  url: string;
}

export interface DocsUploaderProps {
  onDrop?: (acceptedFiles: File[]) => void;
  onUploadBegin?: (fileName: string) => void;
  onClientUploadComplete?: (responses: UploadedDoc[]) => void;
  onUploadError?: (error: Error) => void;
}

export const DocUploader: FC<DocsUploaderProps> = ({
  onDrop,
  onUploadBegin,
  onClientUploadComplete,
  onUploadError,
}) => {
  const onDropHandler = useCallback(
    async (acceptedFiles: File[]) => {
      onDrop?.(acceptedFiles);

      try {
        acceptedFiles.forEach((file) => onUploadBegin?.(file.name));

        const results: UploadedDoc[] = acceptedFiles.map((file) => ({
          fileKey: file.name,
          url: URL.createObjectURL(file),
        }));

        onClientUploadComplete?.(results);
      } catch (err: any) {
        onUploadError?.(err);
      }
    },
    [onDrop, onUploadBegin, onClientUploadComplete, onUploadError],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropHandler,
  });

  return (
    <div
      {...getRootProps()}
      className="p-6 border-2 border-dashed rounded-lg text-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop files here…</p>
      ) : (
        <p>Drag & drop files, or click to select</p>
      )}
    </div>
  );
};
