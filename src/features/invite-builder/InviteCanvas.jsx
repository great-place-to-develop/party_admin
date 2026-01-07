import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
} from '@mui/material';
import {
  Delete,
  DragIndicator,
} from '@mui/icons-material';

/**
 * InviteCanvas Component
 *
 * This is a simplified version of the drag-and-drop canvas.
 * For a production-ready version, you would:
 * 1. Implement full drag-and-drop with @dnd-kit
 * 2. Add resize handles for components
 * 3. Add rotation and layering
 * 4. Implement undo/redo functionality
 * 5. Add image upload and cropping
 */

export const InviteCanvas = ({
  design,
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponents,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDeleteComponent = (componentId) => {
    const updatedComponents = components.filter((c) => c.id !== componentId);
    onUpdateComponents(updatedComponents);
    if (selectedComponent?.id === componentId) {
      onSelectComponent(null);
    }
  };

  const handleUpdateContent = (componentId, newContent) => {
    const updatedComponents = components.map((c) =>
      c.id === componentId ? { ...c, content: newContent } : c
    );
    onUpdateComponents(updatedComponents);
  };

  const renderComponent = (component) => {
    const isSelected = selectedComponent?.id === component.id;

    const commonStyles = {
      position: 'absolute',
      left: component.position.x,
      top: component.position.y,
      width: component.size.width,
      minHeight: component.size.height,
      padding: 2,
      border: isSelected ? '2px solid' : '1px dashed',
      borderColor: isSelected ? 'primary.main' : 'transparent',
      cursor: 'move',
      backgroundColor: isSelected ? 'action.hover' : 'transparent',
      '&:hover': {
        borderColor: 'grey.400',
      },
    };

    const handleClick = (e) => {
      e.stopPropagation();
      onSelectComponent(component);
    };

    switch (component.type) {
      case 'title':
        return (
          <Box key={component.id} sx={commonStyles} onClick={handleClick}>
            <TextField
              fullWidth
              variant="standard"
              value={component.content}
              onChange={(e) => handleUpdateContent(component.id, e.target.value)}
              InputProps={{
                style: {
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: design.textColor,
                  fontFamily: design.fontFamily,
                },
              }}
            />
            {isSelected && (
              <IconButton
                size="small"
                sx={{ position: 'absolute', top: 0, right: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteComponent(component.id);
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
        );

      case 'text':
        return (
          <Box key={component.id} sx={commonStyles} onClick={handleClick}>
            <TextField
              fullWidth
              multiline
              variant="standard"
              value={component.content}
              onChange={(e) => handleUpdateContent(component.id, e.target.value)}
              InputProps={{
                style: {
                  color: design.textColor,
                  fontFamily: design.fontFamily,
                },
              }}
            />
            {isSelected && (
              <IconButton
                size="small"
                sx={{ position: 'absolute', top: 0, right: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteComponent(component.id);
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
        );

      case 'image':
        return (
          <Box key={component.id} sx={commonStyles} onClick={handleClick}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: 'grey.200',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Image Placeholder
              </Typography>
            </Box>
            {isSelected && (
              <IconButton
                size="small"
                sx={{ position: 'absolute', top: 0, right: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteComponent(component.id);
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
        );

      default:
        return (
          <Box key={component.id} sx={commonStyles} onClick={handleClick}>
            <Typography sx={{ color: design.textColor, fontFamily: design.fontFamily }}>
              {component.content}
            </Typography>
            {isSelected && (
              <IconButton
                size="small"
                sx={{ position: 'absolute', top: 0, right: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteComponent(component.id);
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
        );
    }
  };

  return (
    <Paper
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: 500,
        backgroundColor: design.backgroundColor,
        overflow: 'hidden',
      }}
      onClick={() => onSelectComponent(null)}
    >
      {components.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 500,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Add components from the left panel to start designing
          </Typography>
        </Box>
      ) : (
        components.map((component) => renderComponent(component))
      )}
    </Paper>
  );
};
