import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import {
  Add,
  Mail,
  People,
  CheckCircle,
  Event,
} from '@mui/icons-material';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import invitesService from '../services/invites.service';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentInvites, setRecentInvites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls when backend is ready
      // const invitesData = await invitesService.getInvites({ limit: 5 });
      // setRecentInvites(invitesData.invites);

      // Mock data for now
      setStats({
        totalInvites: 0,
        totalGuests: 0,
        confirmedGuests: 0,
        upcomingEvents: 0,
      });
      setRecentInvites([]);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner message="Loading dashboard..." />
      </DashboardLayout>
    );
  }

  const statCards = [
    {
      title: 'Total Invites',
      value: stats.totalInvites,
      icon: <Mail sx={{ fontSize: 40 }} />,
      color: 'primary.main',
    },
    {
      title: 'Total Guests',
      value: stats.totalGuests,
      icon: <People sx={{ fontSize: 40 }} />,
      color: 'secondary.main',
    },
    {
      title: 'Confirmed',
      value: stats.confirmedGuests,
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      color: 'success.main',
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: <Event sx={{ fontSize: 40 }} />,
      color: 'warning.main',
    },
  ];

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
            Dashboard
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

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary" variant="body2" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight={700}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ color: stat.color }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Invites */}
      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight={600}>
            Recent Invites
          </Typography>
          <Button onClick={() => navigate('/invites')}>
            View All
          </Button>
        </Box>

        {recentInvites.length === 0 ? (
          <Box textAlign="center" py={6}>
            <Mail sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
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
        ) : (
          <Stack spacing={2}>
            {recentInvites.map((invite) => (
              <Paper
                key={invite.id}
                variant="outlined"
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
                onClick={() => navigate(`/invites/${invite.id}`)}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6">{invite.eventName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(invite.eventDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="body2" color="text.secondary">
                      {invite.confirmedSeats} / {invite.maxSeats} confirmed
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Stack>
        )}
      </Paper>
    </DashboardLayout>
  );
};
