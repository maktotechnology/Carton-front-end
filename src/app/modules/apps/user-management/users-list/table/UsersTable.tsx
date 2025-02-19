import React, { useEffect, useState, useMemo } from 'react';
import { useTable, ColumnInstance, Row } from 'react-table';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../../firebase'; // Adjust the path to your firebase.tsx
import { getAuth } from 'firebase/auth';
import { KTCardBody } from '../../../../../../_metronic/helpers';
import { usersColumns } from './columns/_columns';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { UsersListPagination } from '../components/pagination/UsersListPagination';
import { UsersListLoading } from '../components/loading/UsersListLoading';

// Define user type
type User = {
  id: string;
  firstname: string;
  phone_number: string;
  last_login?: string;
  active_inactive?: string;
  address1: string;
  status: string;
  uid: string; // Ensure UID is part of the user document
};

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchUsers = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setIsLoading(false);
        return;
      }
      
      const q = query(collection(db, 'user'), where('uid', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        firstname: doc.data().firstname,
        phone_number: doc.data().phone_number,
        address1: doc.data().address1,
        active_inactive: doc.data().active_inactive,
        status: doc.data().status, // Assuming 'status' field exists
        uid: doc.data().uid, // Ensure we get the UID field
      }));

      setUsers(usersData);
      setIsLoading(false);
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
            {isLoading ? (
              <tr>
                <td colSpan={7} className='text-center'>Loading...</td>
              </tr>
            ) : rows.length > 0 ? (
              rows.map((row: Row<User>, i) => {
                prepareRow(row);
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />;
              })
            ) : (
              <tr>
                <td colSpan={7} className='text-center'>No matching records found</td>
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
