import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const BasicCard = ({style, header, children}) => {
    return (
        <Card
        sx = {style}>
            {header}
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

export default BasicCard