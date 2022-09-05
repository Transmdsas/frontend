export const convertToValues = ({ parameter = [] }: any) => {
  const values = parameter.map((data: any) => ({
    value: data.id,
    label: data.description,
  }));
  console.log(values);
  return values;
};
