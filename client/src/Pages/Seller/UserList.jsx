import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const UserList = () => {
  const { axios } = useAppContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/users");
      if (data.success) {
        setUsers(data.users || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, isActive) => {
    try {
      const { data } = await axios.post("/api/user/toggle-user", { id, isActive });
      if (data.success) {
        const user = users.find((u) => u._id === id);

        if (!isActive && !user?.isLoggedIn) {
          try {
            await axios.post("/api/logs/block-user", {
              userId: id,
              email: user.email,
              reason: "Blocked while not logged in",
              timestamp: new Date().toISOString(),
            });
            toast.success("Blocked user is not logged in – action logged");
          } catch {
            console.error("Failed to log block action");
          }
        }

        fetchUsers();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const chartData = [{ status: "Active", count: users.filter((u) => u.isActive).length }, { status: "Blocked", count: users.filter((u) => !u.isActive).length }];

  return (
    <Box sx={{ flex: 1, p: 3, bgcolor: "grey.50", minHeight: "95vh", overflowY: "auto" }}>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={800}>
          Users Dashboard
        </Typography>
        <Button variant="contained" disabled={loading} onClick={fetchUsers} sx={{ textTransform: "none" }}>
          {loading ? "Refreshing..." : "Refresh Users"}
        </Button>
      </Stack>

      <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          User Status Overview
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <TableContainer>
          <Table size="small">
            <TableHead sx={{ bgcolor: "grey.100" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Joined</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4, color: "text.secondary" }}>
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user._id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Switch checked={user.isActive} onChange={() => toggleStatus(user._id, !user.isActive)} color="success" />
                        <Typography variant="body2" fontWeight={600}>
                          {user.isActive ? "Active" : "Blocked"}
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UserList;
