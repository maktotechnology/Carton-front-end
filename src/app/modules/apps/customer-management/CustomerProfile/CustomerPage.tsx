import React from 'react'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'
import {Profile} from './components/Profile'
import {Settings} from './components/settings/Settings'
import {CustomerHeader} from './CustomerHeader'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profile',
    path: '/customer-management/user/overview',
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

const AccountPage: React.FC = () => {
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
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Profile</PageTitle>
              <Profile />
            </>
          }
        />
        <Route
          path='settings'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle>
              <Settings />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default AccountPage
