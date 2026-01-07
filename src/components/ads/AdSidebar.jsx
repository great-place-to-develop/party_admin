import { Box } from '@mui/material';
import { AdBanner } from './AdBanner';

/**
 * AdSidebar Component
 * Displays vertical ad units in sidebar layouts
 */

export const AdSidebar = ({ slot, className }) => {
  return (
    <Box
      className={className}
      sx={{
        position: 'sticky',
        top: 80,
        height: 'fit-content',
      }}
    >
      <AdBanner slot={slot} format="vertical" />
    </Box>
  );
};
