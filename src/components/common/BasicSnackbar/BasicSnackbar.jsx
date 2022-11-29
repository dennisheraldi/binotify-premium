import { createRef } from 'preact';
import { forwardRef } from 'preact/compact';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ref = createRef();
const BasicSnackbar = ({ open, onClose, severity, message }) => {
    return (
    <>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
        >
            <Alert 
                ref={ref}
                onClose={onClose}
                severity={severity}
            >
                {message}
            </Alert>
        </Snackbar>
    </>
  );
};

export default BasicSnackbar;
