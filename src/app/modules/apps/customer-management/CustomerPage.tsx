import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {CustomerListWrapper} from './customer-list/CustomerList'

const CustomerBreadcrumbs: Array<PageLink> = [
  {
    title: 'Customer Management',
    path: '/apps/customer-management/customer',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const CustomerPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='customer'
          element={
            <>
              <PageTitle breadcrumbs={CustomerBreadcrumbs}>Customer list</PageTitle>
              <CustomerListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/customer-management/customer' />} />
    </Routes>
  )
}

export default CustomerPage
