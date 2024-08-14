import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Delivery Name' className='min-w-125px' />,
    id: 'first_name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Phone Number' className='min-w-125px' />,
    accessor: 'phone_number',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Delivery Address' className='min-w-125px' />,
  
    accessor: 'address1',
  },
]

export {usersColumns}
