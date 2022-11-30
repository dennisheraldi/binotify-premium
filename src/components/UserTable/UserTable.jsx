import { useEffect, useMemo, useState } from 'preact/hooks'
import DataTable from '../common/DataTable/DataTable';
import UserActions from './UserActions';

const userTableStyles = {
    height: '650px',
    width: '100%',
    margin: 'auto',
    
};

const UserTable = ({ onError }) => {
    const [users, setUsers] = useState([]);
    const [rowId, setRowId] = useState(null);

const columns = useMemo(
    () => [
    {field:'creator_id', headerName:'creatorID', width: 200},
    {field:'subscriber_id', headerName:'subscriberId', width: 200},
    {field:'status', headerName:'Status', width: 200},
    {field:'accept', headerName:'Accept', width: 100, type: 'singleSelect', valueOptions: ['yes', 'no'], editable: true},
    {field:'action', headerName:'Action', width: 100,   type:'actions', renderCell: (params) => <UserActions/>},
], []);

const subscriber = [{
    creator_id: '1',
    subscriber_id: '2',
    status: 'PENDING',

  },
  {
    creator_id: '2',
    subscriber_id: '3',
    status: 'PENDING',
  }
    ];

    useEffect(() => {
        setUsers(subscriber);
        console.log(users);
        }, [] );

    return (
        <DataTable
            rows={subscriber}
            columns={columns}
            loading={!users.length}
            sx={userTableStyles}
            rowId={(row) => row.creator_id}
        />
    );
};

export default UserTable