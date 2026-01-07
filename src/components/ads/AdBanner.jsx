import { useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';

/**
 * AdBanner Component
 *
 * This component is ready for Google AdSense integration.
 * To enable ads in production:
 * 1. Add your AdSense script to index.html
 * 2. Set VITE_ADSENSE_CLIENT_ID in .env
 * 3. Replace the placeholder with actual ad code
 *
 * Props:
 * - slot: AdSense ad slot ID
 * - format: 'horizontal' | 'vertical' | 'rectangle'
 * - className: Additional CSS classes
 */

export const AdBanner = ({ slot, format = 'horizontal', className }) => {
  const adClient = import.meta.env.VITE_ADSENSE_CLIENT_ID;
  const isDevelopment = import.meta.env.DEV;

  useEffect(() => {
    if (adClient && !isDevelopment) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, [adClient, isDevelopment]);

  // Development placeholder
  if (isDevelopment || !adClient) {
    const dimensions = {
      horizontal: { width: '100%', height: '90px' },
      vertical: { width: '160px', height: '600px' },
      rectangle: { width: '300px', height: '250px' },
    };

    return (
      <Paper
        className={className}
        sx={{
          ...dimensions[format],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'grey.100',
          border: '2px dashed',
          borderColor: 'grey.300',
          my: 2,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Ad Space ({format})
        </Typography>
      </Paper>
    );
  }

  // Production AdSense code
  return (
    <Box className={className} sx={{ my: 2, textAlign: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format === 'horizontal' ? 'horizontal' : 'auto'}
        data-full-width-responsive="true"
      />
    </Box>
  );
};
