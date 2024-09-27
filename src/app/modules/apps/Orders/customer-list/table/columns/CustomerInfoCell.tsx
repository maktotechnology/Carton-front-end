import clsx from 'clsx';
import { FC, useEffect } from 'react';
import { Link,Route } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../../../../_metronic/helpers';
import { User } from '../../core/_models';
import { PageTitle} from '../../../../../../../_metronic/layout/core'
import { Profile } from '../../../Profile';
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
        <Link to={`/Orders/${user.id}`}></Link>
      </div>
      <div className='d-flex flex-column'>
        <Link to={`/Orders/${user.id}`} className='text-gray-800 text-hover-primary mb-1'>
          {user.firstname} {/* Updated from user.name to user.firstname */}
        </Link>
      </div>
    </div>
  );
};

export { CustomerInfoCell };