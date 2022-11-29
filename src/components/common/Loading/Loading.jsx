import Skeleton from '@mui/material/Skeleton';

const Loading = ({ children }) => {
  return (
      <>
        <Skeleton>{children}</Skeleton>
    </>
  )
}

export default Loading;