import Button from '@mui/material/Button'

const CommonButton = ({children, ...props}) => {
    return (
        <Button {...props}>
            {children}
        </Button>
    )
}

export default CommonButton