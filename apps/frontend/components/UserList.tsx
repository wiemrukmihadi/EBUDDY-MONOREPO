"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EventIcon from "@mui/icons-material/Event";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { fetchRankedUsers, fetchUser } from "@/apis/userApi";

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [lastUserId, setLastUserId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const newUsers = await fetchUser();
    // const newUsers = await fetchRankedUsers(10, lastUserId);
    setUsers((prev) => [...prev, ...newUsers]);
    setLastUserId(newUsers.length > 0 ? newUsers[newUsers.length - 1].id : undefined);
    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, marginTop: 3 }}>
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 2 }}>
          🏆 Top Ranked Users
        </Typography>
        <List>
          {users.map((user, index) => (
            <div key={`${user.id}-${index}`}>
              <ListItem>
                <Avatar sx={{ bgcolor: "primary.main", marginRight: 2 }}>
                  {(index+1).toString().toUpperCase()}
                </Avatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {user.name.toUpperCase()}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2">
                        <StarIcon sx={{ fontSize: 16, color: "gold" }} /> Rating:{" "}
                        <strong>{user.totalAverageWeightRatings}</strong>
                      </Typography>
                      <Typography variant="body2">
                        <LocalActivityIcon sx={{ fontSize: 16, color: "blue" }} /> Rents:{" "}
                        <strong>{user.numberOfRents}</strong>
                      </Typography>
                      <Typography variant="body2">
                        <EventIcon sx={{ fontSize: 16, color: "green" }} /> Last Active:{" "}
                        <strong>{new Date(user.recentlyActive * 1000).toLocaleString()}</strong>
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
        <Button
          onClick={loadUsers}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Load More"}
        </Button>
      </Paper>
    </Container>
  );
}
