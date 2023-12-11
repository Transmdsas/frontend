import { useCallback } from 'react';
import Swal, { SweetAlertResult } from 'sweetalert2';

type ConfirmAction = () => void | Promise<void>;

const useAlerts = () => {
  const showConfirmation = useCallback(async (onConfirm: ConfirmAction) => {
    const result: SweetAlertResult = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      await onConfirm();
    }
  }, []);

  const showSuccess = (message: string) => {
    Swal.fire('Éxito!', message, 'success');
  };

  const showError = useCallback((message: string) => {
    Swal.fire('Error!', message, 'error');
  }, []);

  const errorMessage = useCallback((message: string) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 3000,
    });
  }, []);

  const successMessage = useCallback((message: string) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 3000,
    });
  }, []);

  return {showConfirmation, showSuccess, showError, errorMessage, successMessage };
};

export default useAlerts;