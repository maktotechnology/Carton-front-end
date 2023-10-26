import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {Projects} from '../Inventory/products'


const BuilderPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Inventory</PageTitle>
      <Projects className='mb-5 mb-xl-8' />

    </>
  )
}

export default BuilderPageWrapper