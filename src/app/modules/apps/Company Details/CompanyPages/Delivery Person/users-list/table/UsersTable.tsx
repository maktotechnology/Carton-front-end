import React, { useEffect, useState, useMemo } from 'react';
import { useTable, Column, ColumnInstance, Row } from 'react-table';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../../../../firebase'; // Adjust the path to your firebase.tsx
import { KTCardBody } from '../../../../../../../../_metronic/helpers'
import { usersColumns } from './columns/_columns'
import { CustomHeaderColumn } from './columns/CustomHeaderColumn'
import { CustomRow } from './columns/CustomRow'
import { UsersListPagination } from '../components/pagination/UsersListPagination'
import { UsersListLoading } from '../components/loading/UsersListLoading'
import { useParams } from 'react-router-dom';

type User = {
  id: string;
  first_name: string;
  phone_number: string;
  vehicle_number?: string;
  vehicle_type?: string;
  address1: string;
  status: string;
};

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const isLoading = false; // You can update this with a loading state if needed
  const { userID } = useParams<{ userID: string }>();
  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'delivery'));
      const usersData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          first_name: doc.data().first_name,
          phone_number: doc.data().phone_number,
          address1: doc.data().address1,
          vehicle_type: doc.data().vehicle_type,
          vehicle_number: doc.data().vehicle_number,
          status: doc.data().status, // Assuming 'status' field exists
          driver_company_id: doc.data().company_id,
        }))
        .filter((user) => user.status === 'approved' && userID === user.driver_company_id); // Filter by status

      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const data = useMemo(() => users, [users]);
  const columns = useMemo(() => usersColumns, []);
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<User>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<User>, i) => {
                prepareRow(row);
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />;
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <UsersListPagination />
      {isLoading && <UsersListLoading />}
    </KTCardBody>
  );
};

export { UsersTable };
