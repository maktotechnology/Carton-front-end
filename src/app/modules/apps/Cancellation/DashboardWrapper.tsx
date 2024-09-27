import {useIntl} from 'react-intl'
import {PageTitle} from '../../../../_metronic/layout/core'
import {CustomerListWrapper} from './cancelled-list/CustomerList'



const Cancellation = () => {
  const intl = useIntl()


  return (
    <>
      <PageTitle breadcrumbs={[]}>Cancellation</PageTitle>
      <CustomerListWrapper/>
    </>
  )
}



export {Cancellation}
