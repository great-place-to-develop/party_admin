import {
  Box,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

const fontFamilies = [
  'Inter',
  'Roboto',
  'Playfair Display',
  'Montserrat',
  'Lato',
  'Open Sans',
];

export const DesignPanel = ({ design, onChange }) => {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Background Color
        </Typography>
        <TextField
          type="color"
          fullWidth
          value={design.backgroundColor}
          onChange={(e) => onChange('backgroundColor', e.target.value)}
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Text Color
        </Typography>
        <TextField
          type="color"
          fullWidth
          value={design.textColor}
          onChange={(e) => onChange('textColor', e.target.value)}
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Primary Color
        </Typography>
        <TextField
          type="color"
          fullWidth
          value={design.primaryColor}
          onChange={(e) => onChange('primaryColor', e.target.value)}
        />
      </Box>

      <FormControl fullWidth>
        <InputLabel>Font Family</InputLabel>
        <Select
          value={design.fontFamily}
          label="Font Family"
          onChange={(e) => onChange('fontFamily', e.target.value)}
        >
          {fontFamilies.map((font) => (
            <MenuItem key={font} value={font}>
              <span style={{ fontFamily: font }}>{font}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};
