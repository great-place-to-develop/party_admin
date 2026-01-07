import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  Card,
  CardContent,
  IconButton,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Save,
  Preview,
  ArrowBack,
  Add,
  Image as ImageIcon,
  Title,
  Subject,
  CalendarMonth,
  LocationOn,
} from '@mui/icons-material';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { InviteCanvas } from '../features/invite-builder/InviteCanvas';
import { ComponentsPalette } from '../features/invite-builder/ComponentsPalette';
import { DesignPanel } from '../features/invite-builder/DesignPanel';
import invitesService from '../services/invites.service';
import templatesService from '../services/templates.service';

export const InviteBuilder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [inviteData, setInviteData] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    location: '',
    description: '',
    maxSeats: 100,
    design: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      primaryColor: '#6366f1',
      fontFamily: 'Inter',
      components: [],
    },
  });
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    if (id) {
      loadInvite();
    }
  }, [id]);

  const loadInvite = async () => {
    try {
      // TODO: Replace with actual API call
      // const data = await invitesService.getInvite(id);
      // setInviteData(data.invite);
    } catch (error) {
      console.error('Error loading invite:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (id) {
        // TODO: Replace with actual API call
        // await invitesService.updateInvite(id, inviteData);
      } else {
        // TODO: Replace with actual API call
        // const result = await invitesService.createInvite(inviteData);
        // navigate(`/invites/${result.invite.id}`);
      }
      console.log('Saving invite:', inviteData);
      alert('Invite saved successfully! (Backend integration pending)');
    } catch (error) {
      console.error('Error saving invite:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setInviteData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDesignChange = (field, value) => {
    setInviteData((prev) => ({
      ...prev,
      design: {
        ...prev.design,
        [field]: value,
      },
    }));
  };

  const handleAddComponent = (componentType) => {
    const newComponent = {
      id: Date.now().toString(),
      type: componentType,
      position: { x: 50, y: 50 },
      size: { width: 300, height: 100 },
      content: getDefaultContent(componentType),
      style: {},
    };

    setInviteData((prev) => ({
      ...prev,
      design: {
        ...prev.design,
        components: [...prev.design.components, newComponent],
      },
    }));
  };

  const getDefaultContent = (type) => {
    const defaults = {
      text: 'Your text here',
      title: 'Event Title',
      image: '',
      date: inviteData.eventDate,
      location: inviteData.location,
    };
    return defaults[type] || '';
  };

  return (
    <DashboardLayout>
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <IconButton onClick={() => navigate('/invites')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" fontWeight={700}>
            {id ? 'Edit Invite' : 'Create New Invite'}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            startIcon={<Preview />}
            onClick={() => console.log('Preview')}
          >
            Preview
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Left Panel - Components & Design */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Tabs
              value={activeTab}
              onChange={(e, val) => setActiveTab(val)}
              variant="fullWidth"
            >
              <Tab label="Components" />
              <Tab label="Design" />
            </Tabs>

            <Box sx={{ mt: 2 }}>
              {activeTab === 0 && (
                <ComponentsPalette onAddComponent={handleAddComponent} />
              )}
              {activeTab === 1 && (
                <DesignPanel
                  design={inviteData.design}
                  onChange={handleDesignChange}
                />
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Center - Canvas */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, minHeight: '600px', backgroundColor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom>
              Invite Preview
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <InviteCanvas
              design={inviteData.design}
              components={inviteData.design.components}
              selectedComponent={selectedComponent}
              onSelectComponent={setSelectedComponent}
              onUpdateComponents={(components) => handleDesignChange('components', components)}
            />
          </Paper>
        </Grid>

        {/* Right Panel - Event Details */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Event Details
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={2}>
              <TextField
                label="Event Name"
                fullWidth
                value={inviteData.eventName}
                onChange={(e) => handleInputChange('eventName', e.target.value)}
                required
              />

              <TextField
                label="Event Date"
                type="date"
                fullWidth
                value={inviteData.eventDate}
                onChange={(e) => handleInputChange('eventDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />

              <TextField
                label="Event Time"
                type="time"
                fullWidth
                value={inviteData.eventTime}
                onChange={(e) => handleInputChange('eventTime', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="Location"
                fullWidth
                value={inviteData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                multiline
                rows={2}
              />

              <TextField
                label="Description"
                fullWidth
                value={inviteData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                multiline
                rows={3}
              />

              <TextField
                label="Max Seats"
                type="number"
                fullWidth
                value={inviteData.maxSeats}
                onChange={(e) => handleInputChange('maxSeats', parseInt(e.target.value))}
                inputProps={{ min: 1 }}
              />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
