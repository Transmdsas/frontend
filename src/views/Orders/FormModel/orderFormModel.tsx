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
      requiredErrorMsg: 'Debe seleccionar el tipo de vehiculo'
    },
    vehicleCodeId: {
      name: 'vehicleCodeId',
      label: 'Codigo de Vehiculo*',
      requiredErrorMsg: 'Debe seleccionar el tipo de vehiculo'
    },
    lineId: {
      name: 'lineId',
      label: 'Línea*',
      requiredErrorMsg: 'Debe seleccionar la línea del vehiculo'
    },
    bodyWorkId: {
      name: 'bodyWorkId',
      label: 'Tipo de carroceria*',
      requiredErrorMsg: 'Debe seleccionar la carroceria del vehiculo'
    }, 
    color: {
      name: 'color',
      label: 'Color*',
      requiredErrorMsg: 'Debe seleccionar el color vehiculo'
    },      
    modelYear: {
      name: 'modelYear',
      label: 'Modelo(Año)*',
      requiredErrorMsg: 'Debe seleccionar el año del vehiculo'
    },
    serialNumber: {
      name: 'serialNumber',
      label: 'Numero de serie*',
      requiredErrorMsg: 'Debe ingresar el numero de serie del vehiculo'
    },
    netWeight: {
      name: 'netWeight',
      label: 'Peso neto vehicular (kg)*',
      requiredErrorMsg: 'Debe ingresar el peso neto del vehiculo'
    },    
    emptyWeight: {
      name: 'emptyWeight',
      label: 'Peso vacio (kg)*',
      requiredErrorMsg: 'Debe ingresar el peso vacio del vehiculo'
    },
    repoweredTo: {
      name: 'repoweredTo',
      label: 'Repotenciado*',
      requiredErrorMsg: 'Debe seleccionar el año del vehiculo'
    },
    axles: {
      name: 'axles',
      label: 'Ejes*',
      requiredErrorMsg: 'Debe seleccionar el año del vehiculo'
    },
    destinations:{
      name: 'destinations',
      label: 'Destinos',
      requiredErrorMsg: 'Debe ingresar los destinos del vehiculo'
    },
    numberTargetPropiety: {
      name: 'numberTargetPropiety',
      label: 'N° Tarjeta de propiedad*',
      requiredErrorMsg: 'Debe ingresar el numero de la tarjeta de propiedad del vehiculo'
    },
    fuelType: {
      name: 'fuelType',
      label: 'Tipo de combustible*',
      requiredErrorMsg: 'Debe escoger el tipo de combustible del vehiculo'
    },  
  }
};

export default vehicleFormModel;

