import React from 'react'
import useAlerts from '../hooks/useAlerts';

const ConfirmDeleteModal = (onConfirm: any) => {
  const {showConfirmation, showSuccess} = useAlerts();
  return (
    showConfirmation(() => {
      onConfirm();
      showSuccess('Se ha borrado el registro');
    })
  )
}

export default ConfirmDeleteModal