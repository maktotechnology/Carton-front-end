import {useIntl} from 'react-intl'
import {PageTitle} from '../../../../../../../../_metronic/layout/core'
import {CustomerListWrapper} from './customer-list/CustomerList'



const Orders = () => {
  const intl = useIntl()


  return (
    <>
      <PageTitle breadcrumbs={[]}>Orders</PageTitle>
      <CustomerListWrapper/>
    </>
  )
}



export {Orders}
