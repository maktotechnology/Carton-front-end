import clsx from 'clsx';
import { FC, useEffect } from 'react';
import { Link,Route } from 'react-router-dom';
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
      <div className='d-flex flex-column'>
        <Link to={`/Orders/${user.id}`} className='text-gray-800 text-hover-primary mb-1'>
          {user.order_id} {/* Updated from user.name to user.firstname */}
        </Link>
      </div>
    </div>
  );
};

export { CustomerInfoCell };