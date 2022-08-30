import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDataInRedux } from "../actions/Actions";
import { ApiGate } from "../ApiGate/ApiGate";

export const ConnectStore = (): void => {
  const dispatch: any = useDispatch();
  useEffect(() => {
    ApiGate().then((res) => {
      dispatch(getDataInRedux(res.VehiclesResponse, res.parametersResponse));
    });
  }, [dispatch]);
};
