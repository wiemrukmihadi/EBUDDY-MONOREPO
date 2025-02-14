import axios from "axios";
import { User } from "@ebuddy/shared";

export const fetchUser = async () => (await axios.get("http://localhost:4000/api/fetch-user-data")).data;
export const updateUser = async (user: User) => await axios.post("http://localhost:4000/api/update-user-data", user);
export const fetchRankedUsers = async (pageSize = 10, lastUserId?: string) => {
    const response = await axios.get(`http://localhost:4000/api/ranked-users`, {
      params: { pageSize, lastUserId },
    });
    return response.data;
};