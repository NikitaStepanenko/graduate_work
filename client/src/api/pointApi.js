import { $authHost, $host } from "./baseApi";

export const getPoints = async (city) => {
  const response = await $authHost.get("/points/" + city);
  return response;
};

export const getUserCurrentPoint = async () => {
  const response = await $authHost.get("/points/user");
  return response;
};

export const createPoint = async (address, coords, date, city) => {
  const response = await $authHost.post("/points/add", {
    address,
    coords,
    date,
    city,
  });
  return response;
};

export const declineMeeting = async (pointId) => {
  try {
    const response = await $authHost.post("/points/decline/" + pointId);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const acceptMeeting = async (pointId) => {
  try {
    const response = await $authHost.post("/points/accept/" + pointId);
    return response;
  } catch (err) {
    console.error(err);
  }
};
