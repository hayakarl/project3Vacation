 import "./About.css";
import {  ContactMail } from '@mui/icons-material';
import {  Button,  ButtonGroup,  Checkbox,  FormControlLabel,  TextField,  Typography} from '@mui/material';


export function About(): JSX.Element {
    return (
      <div className="About">
        <Typography variant="h3">
          Contact Us &nbsp;&nbsp;
          <ContactMail fontSize="large" />
        </Typography>

        <form>
          <TextField label="Name" type="text" />
          <TextField label="Email" type="email" />
          <TextField label="Message" type="text" />
          <FormControlLabel
            control={<Checkbox />}
            label="Send me promotional emails"
          />

          <ButtonGroup variant="contained" fullWidth>
            <Button color="primary">Send</Button>
            <Button color="secondary" type="reset">
              Clear
            </Button>
          </ButtonGroup>
        </form>
      </div>
    );
}
