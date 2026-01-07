import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Title,
  Subject,
  Image,
  CalendarMonth,
  LocationOn,
  TextFields,
} from '@mui/icons-material';

const components = [
  { type: 'title', label: 'Title', icon: <Title /> },
  { type: 'text', label: 'Text Block', icon: <Subject /> },
  { type: 'image', label: 'Image', icon: <Image /> },
  { type: 'date', label: 'Date', icon: <CalendarMonth /> },
  { type: 'location', label: 'Location', icon: <LocationOn /> },
];

export const ComponentsPalette = ({ onAddComponent }) => {
  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Drag or click to add components
      </Typography>
      <List>
        {components.map((component) => (
          <ListItem key={component.type} disablePadding>
            <ListItemButton onClick={() => onAddComponent(component.type)}>
              <ListItemIcon>{component.icon}</ListItemIcon>
              <ListItemText primary={component.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
