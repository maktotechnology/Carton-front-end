import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UsersListHeader} from './components/header/CustomerListHeader'
import {UsersTable} from './table/CustomerTable'
import {CustomerEditModal} from './Customer-edit-modal/CustomerEditModal'
import {KTCard} from '../../../../../_metronic/helpers'

const CustomerList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <UsersTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <CustomerEditModal />}
    </>
  )
}

const CustomerListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <CustomerList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {CustomerListWrapper}
