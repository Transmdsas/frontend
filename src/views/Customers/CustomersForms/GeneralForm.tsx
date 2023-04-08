import React, { useEffect } from "react";
import {
  DropdownField,
  InputField,
  CalendarField,
  CheckBoxField,
} from "../../../components/forms";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../../../store";
import {
  getCountries,
  selectAllCountries,
  selectCountry,
  getCountryDepartments,
} from "./../../../store/countries/countrySlice";
import {
  getDepartmentCities,
  selectDepartment,
} from "./../../../store/departments/departmentSlice";
import Loading from "../../../components/Loading";
import { Department } from "../../../store/departments/types";
import { City } from "../../../store/cities/types";

const selectData = [
  { description: "Si", id: "1" },
  { description: "No", id: "2" },
  { description: "No aplica", id: "3" },
];

export const GeneralForm = (props: any) => {
  const {
    formField: {
      customerName,
      documentNumber,
      documentTypeId,
      cellphone,
      email,
      address,
      countryId,
      departmentId,
      cityId
    },
  } = props;
  const dispatch = useDispatch<AppDispatch>();
  const allCountries = useSelector(selectAllCountries);
  const loading = useSelector((state: RootState) => state.countries.isLoading);
  const selectedCountry = useSelector(
    (state: RootState) => state.countries.selectedCountry
  );
  const departments: Department[] = useSelector(
    (state: RootState) => state.countries.departments
  );
  const selectedDepartment = useSelector(
    (state: RootState) => state.departments.selectedDepartment
  );
  const cities: City[] = useSelector(
    (state: RootState) => state.departments.cities
  );

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleCountryChange = (value: number) => {
    dispatch(selectCountry(value));
    dispatch(getCountryDepartments(value));
    dispatch(selectDepartment(null));
  };

  const handleDepartmentChange = (value: number) => {
    dispatch(selectDepartment(value));
    dispatch(getDepartmentCities(value));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <InputField 
      label={customerName.label} 
      name={customerName.name} 
      type={"text"} 
      />
      <DropdownField
        name={documentTypeId.name}
        label={documentTypeId.label}
        parameterid={8}
      />
      <InputField
        label={documentNumber.label}
        name={documentNumber.name}
        type={"text"}
      />
      <InputField label={cellphone.label} name={cellphone.name} type={"text"} />
      <InputField label={email.label} name={email.name} type={"text"} />
      <InputField label={address.label} name={address.name} type={"text"} />
      <DropdownField
        name={countryId.name}
        label={countryId.label}
        data={allCountries}
        onchange={handleCountryChange}
        value={selectedCountry || ""}
      />
      <DropdownField
        name={departmentId.name}
        label={departmentId.label}
        disabled={selectedCountry === null && departments.length === 0}
        data={departments}
        onchange={handleDepartmentChange}
        value={selectedDepartment || ""}
      />
      <DropdownField
        name={cityId.name}
        label={cityId.label}
        data={cities}
        disabled={selectedDepartment === null && cities.length === 0}
      />
    </React.Fragment>
  );
};
