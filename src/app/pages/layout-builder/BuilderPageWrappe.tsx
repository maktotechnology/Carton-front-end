import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {BuilderPage} from './BuilderPage'
import { TablesWidget13, } from './TablesWidget13'

const BuilderPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Material Requisition</PageTitle>
      <TablesWidget13 className='mb-5 mb-xl-8' />
    </>
  )
}

export default BuilderPageWrapper
