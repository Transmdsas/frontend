import { useCallback } from "react";
import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";

type ConfirmAction = () => void | Promise<void>;

const useAlerts = () => {
  const showConfirmation = useCallback(
    async (
      onConfirm: ConfirmAction,
      title: string = "¿Estás seguro?",
      text: string = "¡No podrás revertir esto!",
      iconName: SweetAlertIcon = "warning"
    ) => {
      const result: SweetAlertResult = await Swal.fire({
        title: title,
        text: text,
        icon: iconName,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await onConfirm();
      }
    },
    []
  );

  const showSuccess = (message: string) => {
    Swal.fire("Éxito!", message, "success");
  };

  const showError = useCallback((message: string) => {
    Swal.fire("Error!", message, "error");
  }, []);

  const errorMessage = useCallback(
    (message: string, textError: string = "") => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: message,
        text: textError,
        showConfirmButton: false,
        timer: 3000,
      });
    },
    []
  );

  const successMessage = useCallback(
    (message: string, textSucces: string = "") => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: message,
        text: textSucces,
        showConfirmButton: false,
        timer: 3000,
      });
    },
    []
  );

  return {
    showConfirmation,
    showSuccess,
    showError,
    errorMessage,
    successMessage,
  };
};

export default useAlerts;
