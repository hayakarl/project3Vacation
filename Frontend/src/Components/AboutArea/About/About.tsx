import './About.css';
import { ContactMail } from '@mui/icons-material';
import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';

export function About(): JSX.Element {
  return (
    <div className="About">
      <Typography variant="h3">
        צור קשר &nbsp;&nbsp;
        <ContactMail fontSize="large" />
      </Typography>

      <form>
        <TextField label="שם פרטי ושם משפחה" type="text" />
        <TextField label="אימייל" type="email" />
        <TextField label="הודעה" type="text" />
        <FormControlLabel control={<Checkbox />} label="שלח הודעה" />

        <ButtonGroup variant="contained" fullWidth>
          <Button color="primary">שלח</Button>
          <Button color="secondary" type="reset">
            נקה
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}
