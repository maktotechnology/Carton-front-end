
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

 

    </>
  )
}
