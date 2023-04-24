import React from 'react'
import Swal from 'sweetalert2';

const ConfirmDeleteModal = (onConfirm: any) => {
  return (
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'primary',
        cancelButtonColor: 'secondary',
        confirmButtonText: 'Si, Borrar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
          //deleteDoc(currentRow.documentConfigId, currentRow.id);
          Swal.fire(
            'Borrado!',
            'Se ha borrado el registro',
            'success'
          )
        }
      })
  )
}

export default ConfirmDeleteModal