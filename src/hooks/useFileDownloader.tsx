import { useCallback } from "react";
import config from "../config";

export const useFileDownloader = () => {
  const downloadFile = useCallback((filePath:string) => {
    const url = `${config.server_url}${filePath}`;
    window.open(url, '_blank');
  }, []);

  return downloadFile;
};
