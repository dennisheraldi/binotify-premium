import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const BasicCard = ({header, content}) => {
    return (
        <Card>
            {header}
            <CardContent>
                {content}
            </CardContent>
        </Card>
    )
}

export default BasicCard