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
      <Typography variant="h3">פרויקט סיכום : קורס Fullstack 2024 &nbsp;&nbsp;</Typography>

      <h1>אהבת את האתר?</h1>
      <h1>אשמח לקבל like ב LinkedIn</h1>
      
      {/* WhatsApp Contact Button */}
      <Button variant="contained" color="success" onClick={handleWhatsAppClick} style={{ marginTop: '20px' }}>
        צור קשר ב-WhatsApp
      </Button>
    </div>
  );
}
