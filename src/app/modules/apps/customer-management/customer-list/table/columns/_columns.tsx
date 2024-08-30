import {Column} from 'react-table'
import {CustomerInfoCell} from './CustomerInfoCell'
import {CustomerLastLoginCell} from './CustomerLastLoginCell'
import {CustomerTwoStepsCell} from './CustomerTwoStepsCell'
import {CustomerActionsCell} from './CustomerActionsCell'
import {CustomerSelectionCell} from './CustomerSelectionCell'
import {CustomerCustomHeader} from './CustomerCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <CustomerSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomerCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <CustomerInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomerCustomHeader tableProps={props} title='Phone Number' className='min-w-125px' />,
    accessor: 'phone_number',
  },
  {
    Header: (props) => <CustomerCustomHeader tableProps={props} title='Last login' className='min-w-125px' />,
  
    accessor: 'last_login',
  },
  {
    Header: (props) => <CustomerCustomHeader tableProps={props} title='Active/Inactive' className='min-w-125px' />,
  
    accessor: 'active_inactive',
  },


  {
    Header: (props) => (
      <CustomerCustomHeader tableProps={props} title='Joined day' className='min-w-125px' />
    ),
    accessor: 'joined_day',
  },
  {
    Header: (props) => (
      <CustomerCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <CustomerActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
