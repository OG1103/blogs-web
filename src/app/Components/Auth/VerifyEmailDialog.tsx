import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";

interface VerifyEmailDialogProps {
  open: boolean;
  onClose: () => void;
  email: string;
  onVerify: (code: string) => void;
}

const VerifyEmailDialog: React.FC<VerifyEmailDialogProps> = ({
  open,
  onClose,
  email,
  onVerify,
}) => {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleVerify = async () => {
    if (!code.trim()) {
      setError("Please enter a verification code.");
      return;
    }
    setError("");

    try {
      await axios.post("/api/user/verify", {
        email: email,
        verificationCode: String(code),
      });
      onVerify(code);
    } catch (err) {
      console.log(err);
      setError("Verification failed. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Verify Email: {email}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Enter the verification code sent to your email.
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleVerify} color="primary" variant="contained">
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerifyEmailDialog;
