'use client'

import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { fetchUser, updateUser } from "../apis/userApi";
import { User } from "@ebuddy/shared";

export default function UpdateButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const users = await fetchUser();
      // console.log(...users);
      await updateUser({ ...users[0], recentlyActive: Date.now() });
      setMessage("User updated successfully!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("Error updating user");
    }
    setLoading(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleUpdate} disabled={loading}>Update User</Button>
      <Typography>{message}</Typography>
    </div>
  );
}