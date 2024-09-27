import {useIntl} from 'react-intl'

import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../../../_metronic/layout/core'
import {Deliveryperson} from './users-list/UsersList'



const DeliveryPerson = () => {
  const intl = useIntl()


  return (
    <>
      <Deliveryperson />
    </>
  )
}



export {DeliveryPerson}




// const usersBreadcrumbs: Array<PageLink> = [
//   {
//     title: 'Company Details',
//     path: '/apps/company-details/list',
//     isSeparator: false,
//     isActive: false,
//   },
//   {
//     title: '',
//     path: '',
//     isSeparator: true,
//     isActive: false,
//   },
// ]

// const UsersPage = () => {
//   return (
//     <Routes>
//       <Route element={<Outlet />}>
//         <Route
//           path='list'
//           element={
//             <>
//               <PageTitle breadcrumbs={usersBreadcrumbs}>Company Details</PageTitle>
//               <UsersListWrapper />
//             </>
//           }
//         />
//       </Route>
//       <Route index element={<Navigate to='/apps/company-details/list' />} />
//     </Routes>
//   )
// }

// export default UsersPage
