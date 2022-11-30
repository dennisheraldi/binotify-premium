import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'preact/hooks';
import { Check, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const UsersActions = () => {
  const [success, setSuccess] = useState(false);
  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          onClick={setSuccess(true)}
        >
          <Save />
        </Fab>
      )}
    </Box>
  );
};

export default UsersActions;