import './About.css';
import { ContactMail } from '@mui/icons-material';
import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';

export function About(): JSX.Element {
  return (
    <div className="About">

      <Typography variant="h3">פרויקט סיכום : קורס Fullstack 2024 &nbsp;&nbsp;</Typography>

      <h1>אהבת את האתר?</h1>
      <h1>אשמח לקבל like ב LinkedIn</h1>
    </div>
  );
}
