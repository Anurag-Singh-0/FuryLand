import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login() {
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
            type="text"
          />

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            required
            type="password"
          />

          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
