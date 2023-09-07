/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTIcon} from '../../../_metronic/helpers'

type Props = {
  className: string
}

const TablesWidget13: React.FC<Props> = ({className}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Add Products</span>
        </h3>

      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='w-25px'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value='1'
                      data-kt-check='true'
                      data-kt-check-target='.widget-13-check'
                    />
                  </div>
                </th>
                <th className='min-w-150px'>product</th>
       
                <th className='min-w-120px'>Date</th>
              
         
                <th className='min-w-120px'>Product Category</th>
                <th className='min-w-100px '>UOM</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-13-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                    56037-XDER
                  </a>
                </td>

                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    05/28/2020
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: Paid</span>
                </td>

               
                <td>
                  <span className='badge badge-light-success'>Eletronics</span>
                </td>
                <td className='text-end'>
                <td className='text-dark fw-bold text-hover-primary fs-6'>2KG</td>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-13-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                    05822-FXSP
                  </a>
                </td>

                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    04/18/2021
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: Paid</span>
                </td>


                <td>
                  <span className='badge badge-light-warning'>Eletronics</span>
                </td>
                <td className='text-end'>
                <td className='text-dark fw-bold text-hover-primary fs-6'>15KG</td>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-13-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                    4472-QREX
                  </a>
                </td>

                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    07/23/2019
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: Paid</span>
                </td>


                <td>
                  <span className='badge badge-light-danger'>Steel</span>
                </td>
                <td className='text-end'>
                <td className='text-dark fw-bold text-hover-primary fs-6'>10KG</td>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-13-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                    00347-BCLQ
                  </a>
                </td>

                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    12/21/2021
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: Paid</span>
                </td>


                <td>
                  <span className='badge badge-light-info'>Tables</span>
                </td>
                <td className='text-end'>
                <td className='text-dark fw-bold text-hover-primary fs-6'>5KG</td>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-13-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                    59486-XDER
                  </a>
                </td>

                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    05/28/2020
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: Paid</span>
                </td>


                <td>
                  <span className='badge badge-light-primary'>Materials</span>
                </td>
                <td className='text-end'>

                <td className='text-dark fw-bold text-hover-primary fs-6'>1KG</td>
                  

                </td>
              </tr>
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {TablesWidget13}
