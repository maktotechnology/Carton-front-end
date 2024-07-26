import {KTIcon} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {UsersListFilter} from './UsersListFilter'
import { useNavigate } from 'react-router-dom';

const UsersListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/Store-Details');
  };

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <UsersListFilter /> 

     <button type='button' className='btn btn-light-primary me-3'>
        <KTIcon iconName='exit-up' className='fs-2' />
        Export
      </button> 


      {/* begin::Add user */}
      <button type='button' className='btn btn-primary' onClick={handleRedirect}>
              <KTIcon iconName='plus' className='fs-2' />
              Store Add
            </button>
      {/* end::Add user */}
    </div>
  )
}

export {UsersListToolbar}
