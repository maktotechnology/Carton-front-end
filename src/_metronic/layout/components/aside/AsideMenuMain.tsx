
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
            <AsideMenuItem to='/apps/user-management/users' icon='shield-tick' title='User management' />


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





    </>
  )
}
