import './About.css';
import { Button, Typography } from '@mui/material';
import React from 'react';

export function About(): JSX.Element {

     const phoneNumber = '972546305928'; // Replace with your WhatsApp number
     const message = 'Hello, I would like to know more about the vacation packages.'; // Pre-filled message

     const handleWhatsAppClick = () => {
       const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
       window.open(url, '_blank');
     };
    
  return (
    <div className="About">
      <Typography variant="h3" gutterBottom>
        פרויקט סיכום : קורס Fullstack 2024 &nbsp;&nbsp;
      </Typography>

      <Typography variant="h4">נהנית מהאתר?</Typography>
      <Typography variant="h5">אם אהבת, נשמח ללייק ב-LinkedIn ושתף את החוויה עם חברים!</Typography>

      <Typography variant="h4" className="infinity-symbols">
        ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
      </Typography>

      <Typography variant="h5">רוצה לשמוע עוד? נשמח לשוחח!</Typography>

      {/* WhatsApp Contact Button */}
      <Button variant="contained" color="success" onClick={handleWhatsAppClick} style={{ marginTop: '20px' }}>
        צור קשר ב-WhatsApp
      </Button>
    </div>
  );
}
