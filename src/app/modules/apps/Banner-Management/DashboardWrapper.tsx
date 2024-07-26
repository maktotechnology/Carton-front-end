import {useIntl} from 'react-intl'
import {PageTitle} from '../../../../_metronic/layout/core'



const Banner = () => {
  const intl = useIntl()


  return (
    <>
      <PageTitle breadcrumbs={[]}>Banner-Management</PageTitle>
    </>
  )
}



export {Banner}
