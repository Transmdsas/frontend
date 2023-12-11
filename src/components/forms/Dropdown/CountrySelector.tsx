import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { useFormikContext } from "formik";
import {
  getCountries,
  getCountryDepartments,
  selectAllCountries,
  selectCountry,
} from "../../../store/countries/countrySlice";
import { selectDepartment } from "../../../store/departments/departmentSlice";
import Loading from "../../Loading";
import { DropdownField } from "../index";

type CountrySelectorProps = {
  name: string;
  label: string;
  value?: number | null;
  onChange?: (value: number) => void;
};

const CountrySelector = ({
  name,
  label,
  value,
  onChange,
}: CountrySelectorProps) => {
  const allCountries = useSelector(selectAllCountries);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.countries.isLoading);
  const selectedCountry = useSelector(
    (state: RootState) => state.countries.selectedCountry
  );
  const { values } = useFormikContext<any>();

  useEffect(() => {
    if (allCountries.length <= 0) {
      dispatch(getCountries());
    }
  }, [dispatch, allCountries]);

  useEffect(() => {
    const countryId = values[name]; 
    if (countryId) {
      dispatch(selectCountry(countryId));
      dispatch(getCountryDepartments(countryId));
      dispatch(selectDepartment(null));
    }
  }, [dispatch, name, values]);

  if (loading) {
    return <Loading />;
  }

  return (
    <DropdownField
      name={name}
      label={label}
      data={allCountries}
      onchange={(newValue: string) => {
        const intValue = parseInt(newValue);
        onChange && onChange(intValue);
        dispatch(selectCountry(intValue));
        dispatch(getCountryDepartments(intValue));
        dispatch(selectDepartment(null));
      }}
      value={allCountries.length > 0 ? value ?? selectedCountry ?? "" : ""}
    />
  );
};

export default CountrySelector;
