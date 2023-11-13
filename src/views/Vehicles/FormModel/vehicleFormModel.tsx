const vehicleFormModel = {
  formId: 'vehicleForm',
  formField: {
    carPlate: {
      name: 'carPlate',
      label: 'Placa*',
      requiredErrorMsg: 'Debe ingresar una placa'
    },
    brandId: {
      name: 'brandId',
      label: 'Marca*',
      requiredErrorMsg: 'Debe ingresar al menos una marca'
    },
    vehicleTypeId: {
      name: 'vehicleTypeId',
      label: 'Tipo de Vehiculo*',
      requiredErrorMsg: 'Debe seleccionar el tipo de vehículo'
    },
    vehicleCodeId: {
      name: 'vehicleCodeId',
      label: 'Codigo de Vehiculo*',
      requiredErrorMsg: 'Debe seleccionar el tipo de vehículo'
    },
    lineId: {
      name: 'lineId',
      label: 'Línea*',
      requiredErrorMsg: 'Debe seleccionar la línea del vehículo'
    },
    bodyWorkId: {
      name: 'bodyWorkId',
      label: 'Tipo de carroceria*',
      requiredErrorMsg: 'Debe seleccionar la carroceria del vehículo'
    }, 
    color: {
      name: 'color',
      label: 'Color*',
      requiredErrorMsg: 'Debe ingresar el color vehículo'
    },      
    modelYear: {
      name: 'modelYear',
      label: 'Modelo(Año)*',
      requiredErrorMsg: 'Debe ingresar el año del vehículo'
    },
    serialNumber: {
      name: 'serialNumber',
      label: 'Numero de serie*',
      requiredErrorMsg: 'Debe ingresar el numero de serie del vehículo'
    },
    netWeight: {
      name: 'netWeight',
      label: 'Peso neto vehicular (kg)*',
      requiredErrorMsg: 'Debe ingresar el peso neto del vehículo'
    },    
    emptyWeight: {
      name: 'emptyWeight',
      label: 'Peso vacio (kg)*',
      requiredErrorMsg: 'Debe ingresar el peso vacio del vehículo'
    },
    repoweredTo: {
      name: 'repoweredTo',
      label: 'Repotenciado',
      requiredErrorMsg: 'Debe ingresar el año de repotenciación'
    },
    axles: {
      name: 'axles',
      label: 'Ejes*',
      requiredErrorMsg: 'Debe ingresar la cantidad de ejes del vehículo'
    },
    propertyCard: {
      name: 'propertyCard',
      label: 'N° Tarjeta de propiedad*',
      requiredErrorMsg: 'Debe ingresar el número de la tarjeta de propiedad del vehículo'
    },
    fuelTypeId: {
      name: 'fuelTypeId',
      label: 'Tipo de combustible*',
      requiredErrorMsg: 'Debe escoger el tipo de combustible del vehículo'
    },
    countryId: {
      name: 'countryId',
      label: 'País*',
      requiredErrorMsg: 'Debe seleccionar el país de circulación'
    },
    frontPhoto: {
      name: 'frontPhoto',
      label: 'Foto Frontal del Vehículo*',
      requiredErrorMsg: 'Debe cargar la foto del vehículo'
    },
    backPhoto: {
      name: 'backPhoto',
      label: 'Foto trasera del Vehículo',
      requiredErrorMsg: 'Debe cargar la foto del vehículo'
    },
    rightPhoto: {
      name: 'rightPhoto',
      label: 'Foto derecha del Vehículo',
      requiredErrorMsg: 'Debe cargar la foto del vehículo'
    },
    leftPhoto: {
      name: 'leftPhoto',
      label: 'Foto izquierda del Vehículo',
      requiredErrorMsg: 'Debe cargar la foto del vehículo'
    },
    destinations: {
      name: 'destinations',
      label: 'Destinos',
      requiredErrorMsg: 'Debe ingresar al menos un destino para el vehículo'
    }
  }
};

export default vehicleFormModel;

