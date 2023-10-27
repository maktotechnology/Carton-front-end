import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'


import {

  ChartsWidget8,
} from '../../../_metronic/partials/widgets'


const BuilderPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Reports</PageTitle>

      <div className='col-xl-6'>
          <ChartsWidget8 className='card-xl-stretch mb-5 mb-xl-8' />
        </div>

    </>
  )
}

export default BuilderPageWrapper
