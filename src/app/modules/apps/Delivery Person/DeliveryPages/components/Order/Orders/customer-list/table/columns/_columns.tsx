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
    Header: (props) => <CustomerCustomHeader tableProps={props} title='Order ID' className='min-w-125px' />,
    id: 'Order ID',
    Cell: ({...props}) => <CustomerInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomerCustomHeader tableProps={props} title='Date Of Order' className='min-w-125px' />,
    accessor: 'Date_Of_Order',
  },
  {
    Header: (props) => <CustomerCustomHeader tableProps={props} title='Customer Name' className='min-w-125px' />,
    accessor: 'firstname',
  },
  {
    Header: (props) => <CustomerCustomHeader tableProps={props} title='Phone Number' className='min-w-125px' />,
    accessor: 'phone_number',
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
