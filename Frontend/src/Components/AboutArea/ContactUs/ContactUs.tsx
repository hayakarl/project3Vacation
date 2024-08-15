import { Clear, ContactMail, Send } from '@mui/icons-material';
import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import './ContactUs.css';

function ContactUs(): JSX.Element {
  return (
    <div className="ContactUs Box">
      <form>
        <Typography variant="h3" className="Headline">
          <ContactMail fontSize="large" />
          &nbsp;&nbsp; Contact Us
        </Typography>

        <TextField label="Name" variant="outlined" className="TextBox" />

        <TextField label="Email" variant="outlined" className="TextBox" />

        <TextField label="Message" variant="outlined" className="TextBox" />

        <FormControlLabel label="Send me promotional emails" control={<Checkbox />} />

        <ButtonGroup variant="contained" fullWidth>
          <Button color="primary" startIcon={<Send />}>
            Send
          </Button>
          <Button color="secondary" startIcon={<Clear />} type="reset">
            Clear
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default ContactUs;
