import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Hotel,
  Restaurant,
  Attractions,
  DirectionsBus,
  Info,
} from '@mui/icons-material';
import thingsToKnowService from '../../services/thingsToKnow.service';

const categories = [
  { value: 'hotels', label: 'Hotels', icon: <Hotel /> },
  { value: 'restaurants', label: 'Restaurants', icon: <Restaurant /> },
  { value: 'attractions', label: 'Attractions', icon: <Attractions /> },
  { value: 'transportation', label: 'Transportation', icon: <DirectionsBus /> },
  { value: 'other', label: 'Other', icon: <Info /> },
];

export const ThingsToKnowManager = ({ inviteId }) => {
  const [items, setItems] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    category: 'hotels',
    title: '',
    description: '',
    address: '',
    website: '',
    phone: '',
  });

  useEffect(() => {
    loadItems();
  }, [inviteId]);

  const loadItems = async () => {
    try {
      // TODO: Replace with actual API call
      // const data = await thingsToKnowService.getItems(inviteId);
      // setItems(data.items);
      setItems([]);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        category: 'hotels',
        title: '',
        description: '',
        address: '',
        website: '',
        phone: '',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingItem(null);
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        // TODO: Replace with actual API call
        // await thingsToKnowService.updateItem(inviteId, editingItem.id, formData);
      } else {
        // TODO: Replace with actual API call
        // await thingsToKnowService.createItem(inviteId, formData);
      }
      console.log('Saving item:', formData);
      handleCloseDialog();
      loadItems();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleDelete = async (itemId) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      // TODO: Replace with actual API call
      // await thingsToKnowService.deleteItem(inviteId, itemId);
      loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat?.icon || <Info />;
  };

  const getCategoryLabel = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat?.label || category;
  };

  const groupedItems = categories.reduce((acc, cat) => {
    acc[cat.value] = items.filter((item) => item.category === cat.value);
    return acc;
  }, {});

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight={600}>
          Things to Know
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Item
        </Button>
      </Stack>

      {items.length === 0 ? (
        <Card>
          <CardContent>
            <Box textAlign="center" py={4}>
              <Info sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="body1" color="text.secondary" mb={2}>
                No information added yet
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Help your guests by adding hotels, restaurants, and other useful information
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
              >
                Add First Item
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={3}>
          {categories.map((category) => {
            const categoryItems = groupedItems[category.value];
            if (categoryItems.length === 0) return null;

            return (
              <Box key={category.value}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {category.icon}
                  {category.label}
                </Typography>
                <Grid container spacing={2}>
                  {categoryItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {item.description}
                          </Typography>
                          {item.address && (
                            <Typography variant="caption" display="block" gutterBottom>
                              {item.address}
                            </Typography>
                          )}
                          {item.phone && (
                            <Typography variant="caption" display="block" gutterBottom>
                              {item.phone}
                            </Typography>
                          )}
                          {item.website && (
                            <Typography variant="caption" display="block">
                              <a href={item.website} target="_blank" rel="noopener noreferrer">
                                Visit Website
                              </a>
                            </Typography>
                          )}
                        </CardContent>
                        <CardActions>
                          <Button size="small" startIcon={<Edit />} onClick={() => handleOpenDialog(item)}>
                            Edit
                          </Button>
                          <Button size="small" color="error" startIcon={<Delete />} onClick={() => handleDelete(item.id)}>
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            );
          })}
        </Stack>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.value} value={cat.value}>
                    <Box display="flex" alignItems="center" gap={1}>
                      {cat.icon}
                      {cat.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Title"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <TextField
              label="Address"
              fullWidth
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />

            <TextField
              label="Phone"
              fullWidth
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <TextField
              label="Website"
              fullWidth
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://..."
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
