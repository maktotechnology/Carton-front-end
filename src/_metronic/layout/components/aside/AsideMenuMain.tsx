
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
      />

      <AsideMenuItem to='/apps/customer-management/customer' title='Customer Management' icon='profile-circle'/>
      <AsideMenuItem to='Orders' title='Orders' icon='book-square' />
      <AsideMenuItem to='Cancellation' title='Cancellation' icon='lock-3' />



      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Product Management</span>
        </div>
      </div>
      <AsideMenuItem to='/apps/product-dashboard' title='Product List' hasBullet={true} />
      <AsideMenuItem to='/apps/categories' title='Categories' hasBullet={true} />


      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Store Management</span>
        </div>
      </div>
      <AsideMenuItem to='apps/Store-Product/Catalogue' title='Store Product Catalogue' hasBullet={true} />
      <AsideMenuItem to='StoreOrder' title='Store Orders' hasBullet={true} /> */}

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Company</span>
        </div>
      </div>
      <AsideMenuItem to='/apps/company-details/list' title='Company Details' hasBullet={true} />
      <AsideMenuItem to='apps/On-Boarding/OnBoarding' title='On Boarding' hasBullet={true} />
      <AsideMenuItem to='DeliveryPerson' title='Delivery Person' hasBullet={true} />
      <AsideMenuItem to='Payout' title='Payout' hasBullet={true} />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Settings</span>
        </div>
      </div>
      <AsideMenuItem to='Wallets-Payments' title='Wallets and Payments' hasBullet={true} />
      <AsideMenuItem to='Tax-Settings' title='Tax Settings' hasBullet={true} />
      <AsideMenuItem to='Reports' title='Reports' hasBullet={true} />
      <AsideMenuItem to='/apps/user-management/users' title='User management' hasBullet={true} />
      <AsideMenuItem to='Feedbacks-Review' title='Feedbacks and Review' hasBullet={true} />
      <AsideMenuItem to='Banner-Management' title='Banner Management' hasBullet={true} />




    </>
  )
}




// import {useIntl} from 'react-intl'
// import {KTIcon} from '../../../helpers'
// import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
// import {AsideMenuItem} from './AsideMenuItem'

// export function AsideMenuMain() {
//   const intl = useIntl()

//   return (
//     <>
//       <AsideMenuItem
//         to='/dashboard'
//         icon='element-11'
//         title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
//       />
//       <AsideMenuItem to='/builder' icon='switch' title='Layout Builder' />
//       <div className='menu-item'>
//         <div className='menu-content pt-8 pb-2'>
//           <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
//         </div>
//       </div>
//       <AsideMenuItemWithSub to='/crafted/pages' title='Pages' icon='gift'>
//         <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
//           <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
//           <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
//           <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
//           <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
//           <AsideMenuItem
//             to='/crafted/pages/profile/connections'
//             title='Connections'
//             hasBullet={true}
//           />
//         </AsideMenuItemWithSub>

//         <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
//           <AsideMenuItem
//             to='/crafted/pages/wizards/horizontal'
//             title='Horizontal'
//             hasBullet={true}
//           />
//           <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
//         </AsideMenuItemWithSub>
//       </AsideMenuItemWithSub>
//       <AsideMenuItemWithSub to='/crafted/accounts' title='Accounts' icon='profile-circle'>
//         <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
//         <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
//       </AsideMenuItemWithSub>
//       <AsideMenuItemWithSub to='/error' title='Errors' icon='cross-circle'>
//         <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />
//         <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />
//       </AsideMenuItemWithSub>
//       <AsideMenuItemWithSub to='/crafted/widgets' title='Widgets' icon='element-plus'>
//         <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
//         <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
//         <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
//         <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
//         <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
//         <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
//       </AsideMenuItemWithSub>
//       <div className='menu-item'>
//         <div className='menu-content pt-8 pb-2'>
//           <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
//         </div>
//       </div>
//       <AsideMenuItemWithSub to='/apps/chat' title='Chat' icon='message-text-2'>
//         <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
//         <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
//         <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
//       </AsideMenuItemWithSub>
//       <AsideMenuItem to='/apps/user-management/users' icon='shield-tick' title='User management' />
//       <div className='menu-item'>
//         <div className='menu-content'>
//           <div className='separator mx-1 my-4'></div>
//         </div>
//       </div>
//       <div className='menu-item'>
//         <a
//           target='_blank'
//           className='menu-link'
//           href={import.meta.env.VITE_APP_PREVIEW_DOCS_URL + '/changelog'}
//         >
//           <span className='menu-icon'>
//             <KTIcon iconName='document' className='fs-2' />
//           </span>
//           <span className='menu-title'>Changelog {import.meta.env.VITE_APP_VERSION}</span>
//         </a>
//       </div>
//     </>
//   )
// }