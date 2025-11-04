import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login() {
  return (
    <div>
      <div>
        <form>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
          />

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            required
          />

          <Button variant="contained" type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
