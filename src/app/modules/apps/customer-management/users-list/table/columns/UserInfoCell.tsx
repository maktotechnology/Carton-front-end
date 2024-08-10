import clsx from 'clsx';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../../../../_metronic/helpers';
import { User } from '../../core/_models';

type Props = {
  user: User;
};

const UserInfoCell: FC<Props> = ({ user }) => {
  // Log the user data to the console whenever the component renders
  useEffect(() => {
    console.log('User data:', user);
  }, [user]);

  return (
    <div className='d-flex align-items-center'>
      {/* Avatar */}
      <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
        <Link to={`/Users/${user.id}`}>
          {/* Display initials if avatar is not available */}
          {user.avatar ? (
            <div className='symbol-label'>
              <img
                src={toAbsoluteUrl(`media/${user.avatar}`)}
                alt={user.firstname} // Updated from user.name to user.firstname
                className='w-100'
              />
            </div>
          ) : (
            <div
              className={clsx(
                'symbol-label fs-3',
                `bg-light-${user.initials?.state}`,
                `text-${user.initials?.state}`
              )}
            >
              {user.initials?.label}
            </div>
          )}
        </Link>
      </div>
      <div className='d-flex flex-column'>
        <Link to={`/Users/${user.id}`} className='text-gray-800 text-hover-primary mb-1'>
          {user.firstname} {/* Updated from user.name to user.firstname */}
        </Link>
      </div>
    </div>
  );
};

export { UserInfoCell };



/////////////////////////////****************************** */
// import clsx from 'clsx';
// import { FC } from 'react';
// import { Link } from 'react-router-dom';
// import { toAbsoluteUrl } from '../../../../../../../_metronic/helpers';

// type Props = {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     avatar?: string;
//     initials?: {
//       state?: string;
//       label?: string;
//     };
//   };
// };

// const UserInfoCell: FC<Props> = ({ user }) => (
//   <div className='d-flex align-items-center'>
//     {/* Avatar */}
//     <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
//       <Link to={`/user/${user.id}`}>
//         {user.avatar ? (
//           <div className='symbol-label'>
//             <img
//               src={toAbsoluteUrl(`media/${user.avatar}`)}
//               alt={user.name}
//               className='w-100'
//             />
//           </div>
//         ) : (
//           <div
//             className={clsx(
//               'symbol-label fs-3',
//               `bg-light-${user.initials?.state || 'primary'}`, // Default state
//               `text-${user.initials?.state || 'primary'}` // Default state
//             )}
//           >
//             {user.initials?.label || '?'} // Default initials
//           </div>
//         )}
//       </Link>
//     </div>
//     <div className='d-flex flex-column'>
//       <Link to={`/user/${user.id}`} className='text-gray-800 text-hover-primary mb-1'>
//         {user.name}
//       </Link>
//       <span>{user.email}</span>
//     </div>
//   </div>
// );

// export { UserInfoCell };


// import React, { useEffect, useState, FC } from 'react';
// import { Link } from 'react-router-dom';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../../../../../firebase'; // Adjust the path to your firebase config

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   avatar?: string;
//   initials?: {
//     label: string;
//     state: string;
//   };
// }

// interface Props {
//   user: User;
// }

// const UserInfoCell: FC<Props> = ({ user }) => (
//   <div className='d-flex align-items-center'>
//     {/* Avatar */}
//     <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
//       <Link to={`/user/${user.id}`}>
//         {user.avatar ? (
//           <div className='symbol-label'>
//             <img
//               src={`media/${user.avatar}`} // Assuming toAbsoluteUrl is not necessary here
//               alt={user.name}
//               className='w-100'
//             />
//           </div>
//         ) : (
//           <div
//             className={`symbol-label fs-3 bg-light-${user.initials?.state} text-${user.initials?.state}`}
//           >
//             {user.initials?.label}
//           </div>
//         )}
//       </Link>
//     </div>
//     <div className='d-flex flex-column'>
//       <Link to={`/Users/${user.id}`} className='text-gray-800 text-hover-primary mb-1'>
//         {user.name}
//       </Link>
//       <span>{user.email}</span>
//     </div>
//   </div>
// );

// const UserList: FC = () => {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const querySnapshot = await getDocs(collection(db, 'Number'));
//       const userList = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as User[];
//       setUsers(userList);
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       {users.map(user => (
//         <UserInfoCell key={user.id} user={user} />
//       ))}
//     </div>
//   );
// };

// export { UserList, UserInfoCell };
