import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const API = "https://crud-backend.wittybush-edcbbf0f.eastus.azurecontainerapps.io/users";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadUsers = async () => {
    const res = await fetch(API);
    setUsers(await res.json());
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const saveUser = async () => {
    if (!name || !email) return alert("Completa los campos");

    if (editingId) {
      await fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });
      setEditingId(null);
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });
    }

    setName("");
    setEmail("");
    loadUsers();
  };

  const editUser = (user) => {
    setEditingId(user._id);
    setName(user.name);
    setEmail(user.email);
  };

  const deleteUser = async (id) => {
    if (!window.confirm("¿Eliminar usuario?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadUsers();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          CRUD React + Express + MongoDB
        </Typography>

        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>

        <Button
          fullWidth
          variant="contained"
          onClick={saveUser}
        >
          {editingId ? "Actualizar" : "Crear"}
        </Button>
      </Paper>

      <Paper elevation={2} sx={{ mt: 3 }}>
        <List>
          {users.map((user) => (
            <ListItem
              key={user._id}
              secondaryAction={
                <>
                  <IconButton onClick={() => editUser(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteUser(user._id)}>
                    <Delete />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={user.name}
                secondary={user.email}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
