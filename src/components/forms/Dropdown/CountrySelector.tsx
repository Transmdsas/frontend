import  React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { getCountries, getCountryDepartments, selectAllCountries, selectCountry } from "../../../store/countries/countrySlice";
import { selectDepartment } from "../../../store/departments/departmentSlice";
import Loading from "../../Loading";
import { DropdownField } from "../index";

type CountrySelectorProps = {
  name: string;
  label: string;
  value?: number | null;
  onChange: (value: number) => void;
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

  useEffect(() =>{
	    dispatch(getCountries())
  }, [dispatch])

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
        onChange(intValue);
        dispatch(selectCountry(intValue));
        dispatch(getCountryDepartments(intValue));
    		dispatch(selectDepartment(null));
			}}
      value={value ?? selectedCountry ?? ""}
    />
  );
};

export default CountrySelector;
