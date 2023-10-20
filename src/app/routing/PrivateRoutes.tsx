import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'


import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrappe'
import UserDetailsPage from '../pages/layout-builder/UserDetailsPage';
import AddUserPage from '../pages/layout-builder/AddUserPage';

import BuilderPageWrap from '../pages/MasterRecords/BuilderPageWrappe';
import BuilderPageWra from '../pages/Reports/BuilderPageWrappe';
import BuilderPageWr from '../pages/Settings/BuilderPageWrappe';
import BuilderPageWrappe from '../pages/Accounting/BuilderPageWrappe'

import BuilderPageWrapp from '../pages/Inventory/BuilderPageWrappe';
import AddProductPage from '../pages/Inventory/AddProductPage';
import ProductDetailsPage from '../pages/Inventory/ProductDetailsPage';
import AddMultiple from '../pages/Inventory/AddMultiple';


const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='accounting' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path="/add-user"  element={<AddUserPage/>}/>
        <Route path="/user-details/:Ref_ID/:Request_risedby/:Transfer_type/:Branch/:Department/:Product/:Dated/:Uom/:Quantity" element={<UserDetailsPage />} />
        <Route path='inventory' element={<BuilderPageWrapp />} />
        <Route path="/add-product"  element={<AddProductPage/>}/>
        <Route path="/add-multiple"  element={<AddMultiple/>}/>
        <Route path="/product-details/:Prod_Id/:Prod_Name/:UoM/:Category/:Brand" element={<ProductDetailsPage />} />
        <Route path='master' element={<BuilderPageWrap/>}/>
        <Route path='reports' element={<BuilderPageWra/>}/>
        <Route path='settings' element={<BuilderPageWr/>}/>
        
        <Route
          path='accounting/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='settings/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />

      <Route
          path='master/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
       
        <Route
          path='inventory/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />

    
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}