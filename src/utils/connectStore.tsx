import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDataInRedux } from "../actions/Actions";
import { ApiGate } from "../ApiGate/ApiGate";

export const ConnectStore = (): void => {
  const dispatch: any = useDispatch();
  useEffect(() => {
    ApiGate().then((res) => {
      dispatch(
        getDataInRedux(
          res.VehiclesResponse,
          res.parametersResponse,
          res.parametersResponseBrandId,
          res.parametersResponseVehicleTypeId,
          res.parametersResponseLineId,
          res.driversResponse,
          res.parametersIds,
          res.countries,
          res.countriesIds
        )
      );
    });
  }, [dispatch]);
};
