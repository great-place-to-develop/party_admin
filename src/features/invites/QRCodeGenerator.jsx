import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import {
  Download,
  Share,
  ContentCopy,
} from '@mui/icons-material';

export const QRCodeGenerator = ({ inviteId, inviteUrl }) => {
  const [copied, setCopied] = useState(false);
  const [qrSize, setQrSize] = useState(256);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById('qr-code-canvas');
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `invite-qr-${inviteId}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Party Invitation',
          text: 'You\'re invited! RSVP using this link:',
          url: inviteUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopyUrl();
    }
  };

  return (
    <Box>
      <Stack spacing={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              QR Code
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              py={3}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: 'inline-block',
                  backgroundColor: 'white',
                }}
              >
                <QRCode
                  id="qr-code-canvas"
                  value={inviteUrl}
                  size={qrSize}
                  level="H"
                  includeMargin
                />
              </Paper>

              <Stack direction="row" spacing={2} mt={3}>
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  onClick={handleDownloadQR}
                >
                  Download QR
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  onClick={handleShare}
                >
                  Share
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Invitation Link
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Share this link with your guests so they can RSVP
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                value={inviteUrl}
                InputProps={{
                  readOnly: true,
                }}
                size="small"
              />
              <Button
                variant="contained"
                startIcon={<ContentCopy />}
                onClick={handleCopyUrl}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              How to Use
            </Typography>
            <Stack spacing={1} component="ol" sx={{ pl: 2 }}>
              <Typography component="li" variant="body2">
                Download the QR code and include it in your printed invitations
              </Typography>
              <Typography component="li" variant="body2">
                Share the invitation link via email, text, or social media
              </Typography>
              <Typography component="li" variant="body2">
                Guests can scan the QR code or click the link to RSVP instantly
              </Typography>
              <Typography component="li" variant="body2">
                Track responses in real-time from your dashboard
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};
