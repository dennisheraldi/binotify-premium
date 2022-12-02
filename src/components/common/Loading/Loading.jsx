import { Backdrop, CircularProgress } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';

const Loading = () => {
  const {
    state: { loading },
  } = useValue();
  return (
    <Backdrop open={loading}>
      <CircularProgress sx={{ color: 'blue' }} />
    </Backdrop>
  );
};

export default Loading;