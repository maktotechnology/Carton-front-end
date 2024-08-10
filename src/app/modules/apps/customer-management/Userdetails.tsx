import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase'; // Adjust the path to your firebase config

const UserDetailsPage = () => {
  const [userData, setUserData] = useState<any>(null);
  const uid = "X1urUW7ZUZgJ1Uo4cuG6rghzCCF2"; // Default UID

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'Number', uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>First Name: {userData.firstname}</p>
      <p>Last Name: {userData.lastname}</p>
      <p>Gender: {userData.gender}</p>
      <p>Phone Number: {userData.phone_number}</p>
      <p>Address 1: {userData.address1}</p>
      <p>Address 2: {userData.address2}</p>
      <p>Address Type: {userData.addresstype}</p>
      <p>City: {userData.city}</p>
      <p>Country: {userData.country}</p>
      <p>Created Time: {userData.created_time?.toDate().toString()}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default UserDetailsPage;







// import clsx from 'clsx';
// import { FC } from 'react';
// import { Link } from 'react-router-dom';
// import { toAbsoluteUrl } from '../../../../../../../_metronic/helpers';
// import { User } from '../../core/_models';

// type Props = {
//   user: User;
// };

// const UserInfoCell: FC<Props> = ({ user }) => (
//   <div className='d-flex align-items-center'>
//     {/* Avatar */}
//     <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
//       <Link to={/user/${user.id}}>
//         {user.avatar ? (
//           <div className='symbol-label'>
//             <img
//               src={toAbsoluteUrl(media/${user.avatar})}
//               alt={user.name}
//               className='w-100'
//             />
//           </div>
//         ) : (
//           <div
//             className={clsx(
//               'symbol-label fs-3',
//               bg-light-${user.initials?.state},
//               text-${user.initials?.state}
//             )}
//           >
//             {user.initials?.label}
//           </div>
//         )}
//       </Link>
//     </div>
//     <div className='d-flex flex-column'>
//       <Link to={/user/${user.id}} className='text-gray-800 text-hover-primary mb-1'>
//         {user.name}
//       </Link>
//       <span>{user.email}</span>
//     </div>
//   </div>
// );

// export { UserInfoCell };