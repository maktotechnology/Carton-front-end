import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {UsersListWrapper} from './users-list/UsersList'

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
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='OnBoarding'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>On Boarding</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='apps/On-Boarding/OnBoarding' />} />
    </Routes>
  )
}

export default UsersPage
