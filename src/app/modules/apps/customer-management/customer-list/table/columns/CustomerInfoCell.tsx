import clsx from 'clsx';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../../../../_metronic/helpers';
import { User } from '../../core/_models';

type Props = {
  user: User;
};

const CustomerInfoCell: FC<Props> = ({ user }) => {
  // Log the user data to the console whenever the component renders
  useEffect(() => {
    console.log('User data:', user);
  }, [user]);

  return (
    <div className='d-flex align-items-center'>
      {/* Avatar */}
      <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
        <Link to={`/customer-management/user/overview/${user.id}`}>
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
        {/* <Link to={`/Users/${user.id}`} className='text-gray-800 text-hover-primary mb-1'>
          {user.firstname} 
        </Link> */}
        <Link to={`/customer-management/user/overview/${user.id}`} className='text-gray-800 text-hover-primary mb-1'>
          {user.firstname} {/* Updated from user.name to user.firstname */}
        </Link>
      </div>
    </div>
  );
};

export { CustomerInfoCell };