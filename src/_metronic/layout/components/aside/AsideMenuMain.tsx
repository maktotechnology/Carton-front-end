
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
      <AsideMenuItem to='/apps/user-management/users' icon='shield-tick' title='User management' />
      <AsideMenuItem to='/apps/customer-management/customer' icon='shield-tick' title='Customer management' />
      <AsideMenuItemWithSub to='/crafted/pages' title='Product Management' icon='gift'>
          <AsideMenuItem to='/apps/product-dashboard' title='Product Dashboard' hasBullet={true} />
          <AsideMenuItem to='/Category' title='Product List' hasBullet={true} />
          <AsideMenuItem to='/apps/categories' title='Categories' hasBullet={true} />
        </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='' title='Store Management' icon='element-plus'>
        <AsideMenuItem to='Store-Details' title='Store Details' hasBullet={true} />
        <AsideMenuItem to='apps/Store-Product/Catalogue' title='Store Product Catalogue' hasBullet={true} />
        <AsideMenuItem to='StoreOrder' title='Store Orders' hasBullet={true} />
      </AsideMenuItemWithSub>
    </>
  )
}
