import http from "../http-common";

export const getDrivers = async () => {
    const response = await http.get('Drivers');
    return response.data;
};