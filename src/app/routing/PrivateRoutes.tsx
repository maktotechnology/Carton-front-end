import {FC, lazy, Suspense} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/Product List/BuilderPageWrapper'
import BuilderPageWrapper01 from '../pages/Store Details/BuilderPageWrapper'
import BuilderPageWrapper02 from '../pages/categories form/BuilderPageWrapper'

import {StoreOrder} from '../modules/apps/store-orders/DashboardWrapper'
import {Orders} from '../modules/apps/Orders/DashboardWrapper'
import {Cancellation} from '../modules/apps/Cancellation/DashboardWrapper'
import {DeliveryPerson} from '../modules/apps/Delivery Person/DashboardWrapper'
import {Payout} from '../modules/apps/Payouts/DashboardWrapper'

import {Wallets} from '../modules/apps/Wallets-Payments/DashboardWrapper'
import {Tax} from '../modules/apps/Tax-Settings/DashboardWrapper'
import {Reports} from '../modules/apps/Reports/DashboardWrapper'
import {Feedbacks} from '../modules/apps/Feedbacks-Review/DashboardWrapper'
import {Banner} from '../modules/apps/Banner-Management/DashboardWrapper'



const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const CustomerPage = lazy(() => import('../modules/apps/customer-management/UsersPage'))
  const ProductDashboard = lazy(()=> import('../modules/apps/product-dashboard/UsersPage'))
  const Categories = lazy(()=> import('../modules/apps/categories/UsersPage'))
  const Catalogue = lazy(()=> import('../modules/apps/Store Product Catalogue/UsersPage'))




  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='StoreOrder' element={<StoreOrder />} />
        <Route path='Orders' element={<Orders />} />
        <Route path='Cancellation' element={<Cancellation />} />
        <Route path='DeliveryPerson' element={<DeliveryPerson />} />
        <Route path='Payout' element={<Payout />} />

        <Route path='Wallets-Payments' element={<Wallets />} />
        <Route path='Tax-Settings' element={<Tax />} />
        <Route path='Reports' element={<Reports />} />
        <Route path='Feedbacks-Review' element={<Feedbacks />} />
        <Route path='Banner-Management' element={<Banner />} />

        <Route
          path='Category'
          element={
            <SuspensedView>
              <BuilderPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='Category-Form'
          element={
            <SuspensedView>
              <BuilderPageWrapper02 />
            </SuspensedView>
          }
        />
        <Route
          path='Store-Details'
          element={
            <SuspensedView>
              <BuilderPageWrapper01 />
            </SuspensedView>
          }
        />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
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
        <Route
          path='apps/customer-management/*'
          element={
            <SuspensedView>
              <CustomerPage />
            </SuspensedView>
          }
        />


        <Route
          path='apps/product-dashboard/*'
          element={
            <SuspensedView>
              <ProductDashboard />
            </SuspensedView>
          }
          />
          <Route
          path='apps/Store-Product/*'
          element={
            <SuspensedView>
              <Catalogue />
            </SuspensedView>
          }
          />


<Route
          path='apps/categories/*'
          element={
            <SuspensedView>
              <Categories />
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
