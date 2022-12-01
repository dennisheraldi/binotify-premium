import { createRef } from 'preact';
import { forwardRef } from 'preact/compat';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useValue } from '../../../context/ContextProvider';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ref = createRef();
const BasicSnackbar = () => {
    const {
        state: { alert },
        dispatch,
      } = useValue();
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        dispatch({ type: 'UPDATE_ALERT', payload: { ...alert, open: false } });
      };
    return (
    <>
        <Snackbar
            open={alert.open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert 
                ref={ref}
                onClose={handleClose}
                severity={alert.severity}
            >
                {alert.message}
            </Alert>
        </Snackbar>
    </>
  );
};

export default BasicSnackbar;
