import {useIntl} from 'react-intl'
import {PageTitle} from '../../../../../../../_metronic/layout/core'
import {Cancelled} from './customer-list/CustomerList'



const Orders = () => {
  const intl = useIntl()


  return (
    <>
      <PageTitle breadcrumbs={[]}>Orders</PageTitle>
      <Cancelled/>
    </>
  )
}



export {Orders}
