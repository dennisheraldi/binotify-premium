import { useEffect, useState } from 'preact/hooks'
import DataTable from '../common/DataTable/DataTable';

const columns = [
    {field:'creator_id', headerName:'creatorID', width: 200},
    {field:'subscriber_id', headerName:'subscriberId', width: 200},
    {field:'status', headerName:'Status', width: 200},
];

const userTableStyles = {
    height: '650px',
};

const UserTable = ({ onError }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http:127.0.0.1:3001/api/users')
        .then((response) => {
            if(!response.ok) throw new Error(response.status);
            else return response.json();
          })
          .then((data) => {
            setUsers(data);
            console.log(data);
          })
          .catch((error) => {
            console.log('error: ' + error);
          })}, [] );

    return (
        <DataTable
            rows={users}
            columns={columns}
            loading={!users.length}
            sx={userTableStyles}
        />
    );
};

export default UserTable