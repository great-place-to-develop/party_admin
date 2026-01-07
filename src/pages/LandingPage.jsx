import { useAuth0 } from '@auth0/auth0-react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Paper,
} from '@mui/material';
import {
  Mail,
  Create,
  QrCode,
  Palette,
  Info,
  CheckCircle,
} from '@mui/icons-material';
import { AdBanner } from '../components/ads/AdBanner';

export const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const features = [
    {
      icon: <Create sx={{ fontSize: 40 }} />,
      title: 'Custom Invite Designer',
      description: 'Create stunning party invitations with our drag-and-drop designer. Customize colors, fonts, images, and layouts to match your event theme perfectly.',
    },
    {
      icon: <Mail sx={{ fontSize: 40 }} />,
      title: 'Easy Invite Management',
      description: 'Send invitations via email, track RSVPs, manage guest lists, and handle seat confirmations all in one place. Never lose track of your guests again.',
    },
    {
      icon: <QrCode sx={{ fontSize: 40 }} />,
      title: 'QR Code & URL Generation',
      description: 'Generate unique QR codes and shareable URLs for your invitations. Make it easy for guests to RSVP and request additional seats instantly.',
    },
    {
      icon: <Info sx={{ fontSize: 40 }} />,
      title: 'Event Information Hub',
      description: 'Share important details with your guests including nearby hotels, restaurants, attractions, and transportation options. Everything they need in one place.',
    },
    {
      icon: <Palette sx={{ fontSize: 40 }} />,
      title: 'Beautiful Templates',
      description: 'Choose from our collection of professionally designed templates or create your own from scratch. Save custom templates for future events.',
    },
    {
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      title: 'RSVP Tracking',
      description: 'Real-time RSVP tracking with automatic updates. Know exactly who\'s coming, who\'s pending, and how many seats are confirmed.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Party Admin',
    'description': 'Create beautiful party invitations and manage your events with ease. Free party invitation creator and event management tool.',
    'applicationCategory': 'BusinessApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
  };

  return (
    <>
      <Helmet>
        <title>Party Admin - Free Party Invitation Creator & Event Management Tool</title>
        <meta
          name="description"
          content="Create stunning party invitations online for free. Design custom invites, send via email or QR code, track RSVPs, and manage your entire event. Perfect for weddings, birthdays, corporate events, and more."
        />
        <meta
          name="keywords"
          content="party invitations, free invitation maker, event management, RSVP tracking, custom invitations, party planning, invitation designer, event invites, wedding invitations, birthday invitations, QR code invites"
        />
        <link rel="canonical" href={window.location.origin} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            color: 'white',
            pt: 12,
            pb: 8,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  Create Beautiful Party Invitations in Minutes
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.95 }}>
                  Free online party invitation maker and event management tool.
                  Design custom invites, track RSVPs, and manage everything in one place.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => loginWithRedirect()}
                    sx={{
                      backgroundColor: 'white',
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'grey.100',
                      },
                      py: 1.5,
                      px: 4,
                    }}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      py: 1.5,
                      px: 4,
                    }}
                  >
                    Learn More
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} md={5}>
                <Paper
                  elevation={10}
                  sx={{
                    p: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 4,
                  }}
                >
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    Perfect for:
                  </Typography>
                  <Stack spacing={1}>
                    {['Birthday Parties', 'Weddings', 'Corporate Events', 'Baby Showers', 'Graduations', 'Any Celebration'].map((item) => (
                      <Box key={item} display="flex" alignItems="center">
                        <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
                        <Typography color="text.primary">{item}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Ad Banner */}
        <Container maxWidth="lg">
          <AdBanner slot="landing-top" format="horizontal" />
        </Container>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 8 }} id="features">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Everything You Need to Plan Your Perfect Event
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Professional event management tools, completely free
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* How It Works Section */}
        <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
              How It Works
            </Typography>

            <Grid container spacing={4}>
              {[
                { step: 1, title: 'Sign Up', desc: 'Create your free account in seconds' },
                { step: 2, title: 'Design', desc: 'Choose a template or create from scratch' },
                { step: 3, title: 'Customize', desc: 'Add your event details, colors, and images' },
                { step: 4, title: 'Send', desc: 'Share via email, URL, or QR code' },
                { step: 5, title: 'Track', desc: 'Monitor RSVPs and manage your guest list' },
                { step: 6, title: 'Celebrate', desc: 'Enjoy your perfectly planned event!' },
              ].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.step}>
                  <Box textAlign="center">
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      {item.step}
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Ad Banner */}
        <Container maxWidth="lg">
          <AdBanner slot="landing-middle" format="horizontal" />
        </Container>

        {/* CTA Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #db2777 100%)',
            color: 'white',
            py: 8,
          }}
        >
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>
              Ready to Create Your Perfect Invitation?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
              Join thousands of happy event planners using Party Admin
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => loginWithRedirect()}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'grey.100',
                },
                py: 2,
                px: 6,
                fontSize: '1.1rem',
              }}
            >
              Start Creating for Free
            </Button>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ backgroundColor: 'grey.900', color: 'white', py: 4 }}>
          <Container maxWidth="lg">
            <Typography variant="body2" align="center">
              © 2026 Party Admin. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
};
