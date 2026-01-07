import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  QrCode,
  Send,
  Visibility,
} from '@mui/icons-material';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import invitesService from '../services/invites.service';

export const InvitesList = () => {
  const navigate = useNavigate();
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedInvite, setSelectedInvite] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    loadInvites();
  }, []);

  const loadInvites = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call when backend is ready
      // const data = await invitesService.getInvites();
      // setInvites(data.invites);
      setInvites([]);
    } catch (error) {
      console.error('Error loading invites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event, invite) => {
    setMenuAnchor(event.currentTarget);
    setSelectedInvite(invite);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedInvite(null);
  };

  const handleDelete = async () => {
    try {
      // TODO: Replace with actual API call
      // await invitesService.deleteInvite(selectedInvite.id);
      setDeleteDialogOpen(false);
      handleMenuClose();
      loadInvites();
    } catch (error) {
      console.error('Error deleting invite:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: 'default',
      active: 'success',
      completed: 'info',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner message="Loading invites..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          spacing={2}
        >
          <Typography variant="h4" fontWeight={700}>
            My Invites
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/create-invite')}
            size="large"
          >
            Create New Invite
          </Button>
        </Stack>
      </Box>

      {invites.length === 0 ? (
        <Card>
          <CardContent>
            <Box textAlign="center" py={6}>
              <Send sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No invites yet
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Create your first invite to get started
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/create-invite')}
              >
                Create Your First Invite
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {invites.map((invite) => (
            <Grid item xs={12} sm={6} md={4} key={invite.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                    <Typography variant="h6" fontWeight={600}>
                      {invite.eventName}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, invite)}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {new Date(invite.eventDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {invite.location}
                  </Typography>

                  <Box mt={2} mb={1}>
                    <Chip
                      label={invite.status}
                      color={getStatusColor(invite.status)}
                      size="small"
                    />
                  </Box>

                  <Stack direction="row" spacing={2} mt={2}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Confirmed
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {invite.confirmedSeats} / {invite.maxSeats}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Pending
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {invite.pendingSeats}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => navigate(`/invites/${invite.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => navigate(`/invites/${invite.id}/edit`)}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          navigate(`/invites/${selectedInvite?.id}`);
          handleMenuClose();
        }}>
          <Visibility sx={{ mr: 1 }} /> View Details
        </MenuItem>
        <MenuItem onClick={() => {
          navigate(`/invites/${selectedInvite?.id}/edit`);
          handleMenuClose();
        }}>
          <Edit sx={{ mr: 1 }} /> Edit Invite
        </MenuItem>
        <MenuItem onClick={() => {
          navigate(`/invites/${selectedInvite?.id}/qr`);
          handleMenuClose();
        }}>
          <QrCode sx={{ mr: 1 }} /> Generate QR Code
        </MenuItem>
        <MenuItem onClick={() => {
          navigate(`/invites/${selectedInvite?.id}/send`);
          handleMenuClose();
        }}>
          <Send sx={{ mr: 1 }} /> Send Invites
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteDialogOpen(true);
            handleMenuClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Invite</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{selectedInvite?.eventName}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};
