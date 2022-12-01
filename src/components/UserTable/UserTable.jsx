import { useEffect, useMemo, useState } from 'preact/hooks'
import DataTable from '../common/DataTable/DataTable';
import UserActions from './UserActions';
import {getUsers} from '../../actions/users';
import {useValue} from '../../context/ContextProvider';

const userTableStyles = {
    height: '650px',
    width: '100%',
    margin: 'auto',
    display: 'flex',
    
};

const UserTable = () => {
    const {
        state: { users },
        dispatch,
      } = useValue();
    
    const [rowId, setRowId] = useState(null);

    useEffect(() => {
        if (users.length === 0) getUsers(dispatch);
      }, []);

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

    return (
        <DataTable
            rows={subscriber}
            columns={columns}
            loading={!subscriber.length}
            sx={userTableStyles}
            rowId={(row) => row.creator_id}
        />
    );
};

export default UserTable