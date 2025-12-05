import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, deleteExpense, updateExpense } from "../store/store";
import type { RootState } from "../store/store";

import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UpdateIcon from "@mui/icons-material/Update";
import { toast } from "react-toastify";

const Expenses = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const dispatch = useDispatch();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!title || !amount) return;

    if (editIndex !== null) {
      dispatch(
        updateExpense({
          id: editIndex,
          updatedExpense: {
            title,
            amount: Number(amount),
          },
        })
      );
      toast.success("Expense updated successfully!");
      setEditIndex(null);
    } else {
      dispatch(
        addExpense({
          title,
          amount: Number(amount),
        })
      );
      toast.success("Expense added successfully!");
    }
    setTitle("");
    setAmount("");
  };

  const handleEdit = (idx: number) => {
    const exp = expenses[idx];
    setTitle(exp.title);
    setAmount(String(exp.amount));
    setEditIndex(idx);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, mb: 5 }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          color="primary"
        >
          Expense Tracker
        </Typography>

        {/* Input Form Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <form onSubmit={handleFormSubmit}>
            <Stack spacing={2}>
              <Typography variant="h6">
                {editIndex !== null ? "Edit Expense" : "New Expense"}
              </Typography>

              <TextField
                label="Expense Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="small"
              />

              <TextField
                label="Amount"
                variant="outlined"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: <span style={{ marginRight: 8 }}>₹</span>,
                }}
              />

              <Button
                variant="contained"
                color={editIndex !== null ? "secondary" : "primary"}
                type="submit"
                startIcon={
                  editIndex !== null ? <UpdateIcon /> : <AddCircleIcon />
                }
                fullWidth
              >
                {editIndex !== null ? "Update Expense" : "Add Expense"}
              </Button>
            </Stack>
          </form>
        </Paper>

        {/* List Section */}
        <Paper elevation={2}>
          <List>
            {expenses.length === 0 ? (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body1" color="textSecondary">
                  No expenses added yet.
                </Typography>
              </Box>
            ) : (
              expenses.map((elem, idx) => (
                <div key={idx}>
                  <ListItem
                    secondaryAction={
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          color="primary"
                          onClick={() => handleEdit(idx)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          color="error"
                          onClick={() => {
                            dispatch(deleteExpense(idx));
                            toast.error("Expense deleted!");
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    }
                  >
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          {elem.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          ₹{elem.amount}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {/* Add divider only if it's not the last item */}
                  {idx < expenses.length - 1 && <Divider />}
                </div>
              ))
            )}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Expenses;
