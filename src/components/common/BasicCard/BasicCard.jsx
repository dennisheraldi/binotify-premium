import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const BasicCard = ({style,header, content}) => {
    return (
        <Card
        sx = {style}>
            {header}
            <CardContent>
                {content}
            </CardContent>
        </Card>
    )
}

export default BasicCard