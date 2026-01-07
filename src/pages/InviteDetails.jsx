import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  Chip,
  Tabs,
  Tab,
  IconButton,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Send,
  QrCode as QrCodeIcon,
  Delete,
} from '@mui/icons-material';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ThingsToKnowManager } from '../features/things-to-know/ThingsToKnowManager';
import { QRCodeGenerator } from '../features/invites/QRCodeGenerator';
import invitesService from '../services/invites.service';

export const InviteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    loadInvite();
  }, [id]);

  const loadInvite = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const data = await invitesService.getInvite(id);
      // setInvite(data.invite);

      // Mock data
      setInvite({
        id,
        eventName: 'Summer Party 2026',
        eventDate: '2026-07-15',
        eventTime: '18:00',
        location: '123 Party Street, Fun City',
        description: 'Join us for an amazing summer celebration!',
        maxSeats: 100,
        confirmedSeats: 45,
        pendingSeats: 12,
        status: 'active',
      });
    } catch (error) {
      console.error('Error loading invite:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner message="Loading invite..." />
      </DashboardLayout>
    );
  }

  if (!invite) {
    return (
      <DashboardLayout>
        <Box textAlign="center" py={6}>
          <Typography variant="h6" gutterBottom>
            Invite not found
          </Typography>
          <Button variant="contained" onClick={() => navigate('/invites')}>
            Back to Invites
          </Button>
        </Box>
      </DashboardLayout>
    );
  }

  const inviteUrl = `${window.location.origin}/rsvp/${invite.id}`;

  return (
    <DashboardLayout>
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <IconButton onClick={() => navigate('/invites')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" fontWeight={700}>
            {invite.eventName}
          </Typography>
          <Chip label={invite.status} color="success" />
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => navigate(`/invites/${id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<Send />}
            onClick={() => navigate(`/invites/${id}/send`)}
          >
            Send Invites
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Details */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Event Details
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">
                    Date
                  </Typography>
                  <Typography variant="body1">
                    {new Date(invite.eventDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">
                    Time
                  </Typography>
                  <Typography variant="body1">{invite.eventTime}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1">{invite.location}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1">{invite.description}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} sx={{ mb: 2 }}>
            <Tab label="Things to Know" />
            <Tab label="QR Code & Link" />
          </Tabs>

          {activeTab === 0 && <ThingsToKnowManager inviteId={id} />}
          {activeTab === 1 && <QRCodeGenerator inviteId={id} inviteUrl={inviteUrl} />}
        </Grid>

        {/* Right Column - Stats */}
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  RSVP Statistics
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Stack spacing={2}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Total Seats
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        {invite.maxSeats}
                      </Typography>
                    </Stack>
                  </Box>

                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Confirmed
                      </Typography>
                      <Typography variant="h6" fontWeight={600} color="success.main">
                        {invite.confirmedSeats}
                      </Typography>
                    </Stack>
                  </Box>

                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Pending
                      </Typography>
                      <Typography variant="h6" fontWeight={600} color="warning.main">
                        {invite.pendingSeats}
                      </Typography>
                    </Stack>
                  </Box>

                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Available
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        {invite.maxSeats - invite.confirmedSeats - invite.pendingSeats}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Quick Actions
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Stack spacing={1}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => window.open(inviteUrl, '_blank')}
                  >
                    Preview Invite
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate(`/invites/${id}/rsvps`)}
                  >
                    View RSVPs
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                  >
                    Delete Invite
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
