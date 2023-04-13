import { useCallback } from 'react';

const useObjectToFormData = () => {
  const objectToFormData = useCallback((obj: Record<string, any>): FormData => {
    const formData = new FormData();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }
    return formData;
  }, []);

  return objectToFormData;
};

export default useObjectToFormData;