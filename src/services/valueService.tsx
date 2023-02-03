import http from "../http-common";

export interface iValue {
  id?: number;
  parameterId?: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const getAll = async () => {
  const response = await http.get('values');
  return response.data;
};

// export const getById = async (id: number) => {
//   const value = await axios.get(`${baseUrl}/${id}`);
//   return value.data;
// };

// export const create = async (newValues: iValue[]) => {
//   const response = await axios.post(baseUrl, newValues);
//   return response.data;
// };

// export const update = async (id: number, updatedValue: iValue) => {
//   const response = await axios.put(`${baseUrl}/${id}`, updatedValue);
//   return response.data;
// };

// export const remove = async(id: number) => {
//     const response = await axios.delete(`${baseUrl}/${id}`);
//     return response.data;
//   }
