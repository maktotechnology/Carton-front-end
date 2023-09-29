import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Overview} from './components/Overview'
import {Projects} from '../../pages/Inventory/products'
import {Campaigns} from '../../pages/Inventory/stock_reconciliation'
import {Documents} from '../../pages/Inventory/debit_note'
import {Connections} from './components/Connections'


import {Requestgt} from '../../pages/Accounting/Request_for_Quotation'
import {Purchase} from '../../pages/Accounting/Purchase_Order'
import {Sales} from '../../pages/Accounting/Sales_Order'


import {Branches} from '../../pages/MasterRecords/Branches'
import {Brands} from '../../pages/MasterRecords/Brands'
import {Divisions} from '../../pages/MasterRecords/Divisions_Departments'
import {Warehouses} from '../../pages/MasterRecords/Warehouses'
import {Productcategory} from '../../pages/MasterRecords/Product Category'
import {Uom} from '../../pages/MasterRecords/UOM'


import {Company} from '../../pages/Settings/Company_Settings'
import {Roles} from '../../pages/Settings/Roles'
import {Tax} from '../../pages/Settings/Tax'
import {Users} from '../../pages/Settings/Users'


import {ProfileHeader} from './ProfileHeader'


const profileBreadCrumbs: Array<PageLink> = [
  // {
  //   title: 'Profie',
  //   path: '/crafted/pages/profile/overview',
  //   isSeparator: false,
  //   isActive: false,
  // },
  // {
  //   title: '',
  //   path: '',
  //   isSeparator: true,
  //   isActive: false,
  // },
]

const ProfilePage = () => (
  <Routes>
    <Route
      element={
        <>
          {/* <ProfileHeader /> */}
          <Outlet />
        </>
      }
    >
      <Route
        path='overview'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Overview</PageTitle>
            <Overview />
          </>
        }
      />
      <Route
        path='projects'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Products</PageTitle>
            <Projects className="projects"/>
          </>
        }
      />
      <Route
        path='sales'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Stock Reconciliation</PageTitle>
            <Campaigns />
          </>
        }
      />
      <Route
        path='documents'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Credit / Debit Note</PageTitle>
            <Documents />
          </>
        }
      />



      <Route
        path='requests'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Request for Quotation</PageTitle>
            <Requestgt />
          </>
        }
      />
      <Route
        path='purchase'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Purchase Order</PageTitle>
            <Purchase />
          </>
        }
      />
      <Route
        path='sales'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Sales Order</PageTitle>
            <Sales />
          </>
        }
      />


      <Route
        path='branches'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Branches</PageTitle>
            <Branches />
          </>
        }
      />

    <Route
        path='Brands'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Brands</PageTitle>
            <Brands />
          </>
        }
      />

<Route
        path='Divisions'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Divisions</PageTitle>
            <Divisions />
          </>
        }
      />
<Route
        path='Warehouses'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Warehouses</PageTitle>
            <Warehouses />
          </>
        }
      />

<Route
        path='Productcategory'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Product category</PageTitle>
            <Productcategory />
          </>
        }
      />
      <Route
        path='Uom'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>UOM</PageTitle>
            <Uom />
          </>
        }
      />


<Route
        path='Company'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Company Settings</PageTitle>
            <Company />
          </>
        }
      />

<Route
        path='Roles'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Roles</PageTitle>
            <Roles />
          </>
        }
      />

<Route
        path='Tax'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Tax</PageTitle>
            <Tax />
          </>
        }
      />

<Route
        path='Users'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Users</PageTitle>
            <Users />
          </>
        }
      />




    <Route
        path='connections'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Connections</PageTitle>
            <Connections />
          </>
        }
      />
      <Route index element={<Navigate to='/crafted/pages/profile/overview' />} />
    </Route>
  </Routes>
)

export default ProfilePage
