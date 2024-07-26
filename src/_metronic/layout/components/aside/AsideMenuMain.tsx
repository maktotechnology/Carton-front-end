
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
      <AsideMenuItem to='/apps/customer-management/customer' icon='shield-tick' title='Customer management' />
      <AsideMenuItem to='Orders' title='Orders' icon='book-square' />
      <AsideMenuItem to='Cancellation' title='Cancellation' icon='lock-3' />



      <div className='menu-item'>
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
      <AsideMenuItem to='StoreOrder' title='Store Orders' hasBullet={true} />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Delivery Management</span>
        </div>
      </div>
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
