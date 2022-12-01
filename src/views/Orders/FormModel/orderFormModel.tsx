const ordersFormModel = {
  formId: 'orderForm',
  formField: {
    carPlate: {
      name: 'carPlate',
      label: 'Placa*',
      requiredErrorMsg: 'Debe ingresar una placa'
    },
    driver: {
      name: 'driver',
      label: 'Conductor*',
      requiredErrorMsg: 'Debe ingresar al menos un conductor'
    },
    chargeTime: {
      name: 'chargeTime',
      label: 'Hora Del Cargue*',
      requiredErrorMsg: 'Debe ingresar la hora del cargue'
    },    
    entryDate: {
      name: 'entryDate',
      label: 'Fecha de entrada*',
      requiredErrorMsg: 'Debe ingresar la fecha de entrada del vehiculo'
    },
    departureDate: {
      name: 'departureDate',
      label: 'Fecha De Salida*',
      requiredErrorMsg: 'Debe ingresar la fecha de entrada del vehiculo'
    },
    sender: {
      name: 'sender',
      label: 'Remitente*',
      requiredErrorMsg: 'Debe ingresar el remitente'
    },
    loadingPlace: {
      name: 'loadingPlace',
      label: 'Lugar del cargue*',
      requiredErrorMsg: 'Debe ingresar el lugar del cargue del vehiculo'
    },
    address: {
      name: 'address',
      label: 'Dirección*',
      requiredErrorMsg: 'Debe ingresar una dirección'
    },
    recipients: {
      name: 'recipients',
      label: 'Destinatarios*',
      requiredErrorMsg: 'Debe ingresar un destinario'
    },
    downloadPlace: {
      name: 'downloadPlace',
      label: 'Lugar del descargue*',
      requiredErrorMsg: 'Debe ingresar el lugar del descargue'
    },
    destinations: {
      name: 'destinations',
      label: 'Destinos*',
      requiredErrorMsg: 'Debe ingresar los destinos'
    },
  }
};

export default ordersFormModel;

