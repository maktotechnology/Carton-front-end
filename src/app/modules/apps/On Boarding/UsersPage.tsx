import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../_metronic/layout/core'
import { UsersListWrapper } from './users-list/UsersList'
import { UsersListWrapperr } from '../On Boarding delivery/users-list/UsersList'
import { useState } from 'react'
import './tabs.css' // Adjust the path according to your file structure

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'On Boarding',
    path: 'apps/On-Boarding/OnBoarding',
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

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState('company')

  return (
    <>
      <PageTitle breadcrumbs={usersBreadcrumbs}>On Boarding</PageTitle>
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'company' ? 'active' : ''}`}
          onClick={() => setActiveTab('company')}
        >
          Company
        </div>
        <div
          className={`tab ${activeTab === 'delivery' ? 'active' : ''}`}
          onClick={() => setActiveTab('delivery')}
        >
          Delivery
        </div>
      </div>
      <div className="tab-content">
        {activeTab === 'company' && <UsersListWrapper />}
        {activeTab === 'delivery' && <UsersListWrapperr />}
      </div>
    </>
  )
}

export default UsersPage
