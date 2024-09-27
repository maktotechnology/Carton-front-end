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
      <div className='d-flex flex-column'>
        <Link to={`/Driver/${user.id}`}>
          {/* Display initials if avatar is not available */}

            <div
              className={clsx(
                'symbol-label fs-3',
                `bg-light-${user.initials?.state}`,
                `text-${user.initials?.state}`
              )}
            >
              {user.initials?.label}
            </div>
        </Link>
      </div>
      <div className='d-flex flex-column'>
        <Link to={`/Driver/${user.id}`} className='text-gray-800 text-hover-primary mb-1'>
          {user.first_name} {/* Updated from user.name to user.firstname */}
        </Link>
      </div>
    </div>
  );
};

export { UserInfoCell };


