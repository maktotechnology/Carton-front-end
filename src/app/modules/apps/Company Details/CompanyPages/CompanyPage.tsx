import React from 'react'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'
import {Company} from './components/Company'
import {Settings} from './components/settings/Settings'
import {CustomerHeader} from './CustomerHeader'
import {BuilderPage} from './components/Order/BuilderPage'
import {CustomerListWrapper} from './components/Order/Orders/customer-list/CustomerList'
import {Cancelled} from './Cancelled/Cancelled/customer-list/CustomerList'
import {DeliveryPerson} from '../CompanyPages/Delivery Person/DashboardWrapper'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profile',
    path: '/Company/details/overview',
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

const CompanyPages: React.FC = () => {
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
              <Company />
            </>
          }
        />

        <Route
          path='Cancelled/:userID'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Cancelled</PageTitle>
              <Cancelled />
            </>
          }
        />
        <Route
          path='Orders/:userID'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Order</PageTitle>
              <CustomerListWrapper />
            </>
          }
        />
        <Route
          path='Riders/:userID'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Delivery Person</PageTitle>
              <DeliveryPerson />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default CompanyPages
