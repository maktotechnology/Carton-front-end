import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Profile} from './components/Overview'
import {ProfileDetails} from './components/ProfileDetails'
import {Campaigns} from './components/Campaigns'
import {Documents} from './components/Documents'
import {Connections} from './components/Connections'
import {ProfileHeader} from './ProfileHeader'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profile',
    path: '/crafted/pages/profile/overview',
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

const ProfilePage = () => (
  <Routes>
    <Route
      element={
        <>
          <ProfileHeader />
          <Outlet />
        </>
      }
    >
      <Route
        path='overview/:userID'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Overview</PageTitle>
            <Profile />
          </>
        }
      />
      <Route
          path='settings/:userID'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Settings</PageTitle>
              <ProfileDetails />
            </>
          }
        />

    </Route>
  </Routes>
)

export default ProfilePage
