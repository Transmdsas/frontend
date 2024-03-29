import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { useFormikContext } from "formik";
import {
  getDepartmentCities,
  selectDepartment,
} from "./../../../store/departments/departmentSlice";
import Loading from "../../Loading";
import { DropdownField } from "../index";
import { Department } from "../../../store/departments/types";

type DepartmentSelectorProps = {
  name: string;
  label: string;
  disabled?: boolean;
  value?: number | null;
  onChange?: (value: number) => void;
};

const DepartmentSelector = ({
  name,
  label,
  value,
  disabled,
  onChange,
}: DepartmentSelectorProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const departments: Department[] = useSelector(
    (state: RootState) => state.countries.departments
  );
  const selectedDepartment = useSelector(
    (state: RootState) => state.departments.selectedDepartment
  );
  const loading = useSelector((state: RootState) => state.countries.isLoading);
  const { values } = useFormikContext<any>();

  useEffect(() => {
    const departmentId = values[name];
    if (departmentId) {
      dispatch(selectDepartment(departmentId));
      dispatch(getDepartmentCities(departmentId));
    }
  }, [dispatch, name, values]);

  if (loading) {
    return <Loading />;
  }

  return (
    <DropdownField
      name={name}
      label={label}
      data={departments}
      disabled={disabled || false}
      onchange={(newValue: string) => {
        const intValue = parseInt(newValue);
        onChange && onChange(intValue);
        dispatch(selectDepartment(intValue));
        dispatch(getDepartmentCities(intValue));
      }}
      value={departments.length > 0 ? value ?? selectedDepartment ?? "" : ""}
    />
  );
};

export default DepartmentSelector;
