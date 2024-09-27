import React from 'react'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'
import {Delivery} from './components/Delivery'
import {Settings} from './components/settings/Settings'
import {CustomerHeader} from './DeliveryHeader'
import {BuilderPage} from './components/Order/BuilderPage'
import {CustomerListWrapper} from './components/Order/Orders/customer-list/CustomerList'


const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profile',
    path: '/Delivery/details/overview',
    isSeparator: false,
    isActive: false,
  },
  // /customer-management/user/overview

  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const DeliveryPages: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <CustomerHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='overview/:userID'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Company</PageTitle>
              <Delivery />
            </>
          }
        />
        <Route
          path='settings/:userID'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle>
              <Settings />
            </>
          }
        />
        <Route
          path='Order/:userID'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Order</PageTitle>
              <CustomerListWrapper />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default DeliveryPages
