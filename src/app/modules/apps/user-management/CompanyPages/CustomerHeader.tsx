import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase'; // adjust this import based on your project structure
import { KTIcon, toAbsoluteUrl } from '../../../../../_metronic/helpers';
import { Dropdown1 } from '../../../../../_metronic/partials';
import {Link} from 'react-router-dom'

const CustomerHeader: React.FC = () => {
  const { userID } = useParams<{ userID: string }>();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (userID) {
        try {
          const docRef = doc(db, 'user', userID);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProfileData(docSnap.data());
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfileData();
  }, [userID]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='Metronic' />
                <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
              </div>
            </div>

            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      {profileData?.company_name} 
                    </a>
                    <a href='#'>
                      <KTIcon iconName='verify' className='fs-1 text-primary' />
                    </a>
                  </div>

                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                    >
                      <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                      {profileData?.address1}
                    </a>
                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                    >
                      <KTIcon iconName='geolocation' className='fs-4 me-1' />
                      {profileData?.city }
                    </a>
                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-500 text-hover-primary mb-2'
                    >
                      <KTIcon iconName='sms' className='fs-4 me-1' />
                      {profileData?.phone_number}
                    </a>
                  </div>
                </div>


              </div>

              <div className='d-flex flex-wrap flex-stack'>
                <div className='d-flex flex-column flex-grow-1 pe-8'>
                  <div className='d-flex flex-wrap'>
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                        <div className='fs-2 fw-bolder'>4500$</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-500'>Earnings</div>
                    </div>

                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <KTIcon iconName='arrow-down' className='fs-3 text-danger me-2' />
                        <div className='fs-2 fw-bolder'>75</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-500'>Projects</div>
                    </div>

                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                        <div className='fs-2 fw-bolder'>60%</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-500'>Success Rate</div>
                    </div>
                  </div>
                </div>

                <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                  <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                    <span className='fw-bold fs-6 text-gray-500'>Profile Compleation</span>
                    <span className='fw-bolder fs-6'>50%</span>
                  </div>
                  <div className='h-5px mx-3 w-100 bg-light mb-3'>
                    <div
                      className='bg-success rounded h-5px'
                      role='progressbar'
                      style={{ width: '50%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className='d-flex overflow-auto h-55px'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>

              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === `/user-management/details/overview/${userID}` && 'active')
                  }
                  to={`/user-management/details/overview/${userID}`}
                >
                  Overview
                </Link>
              </li>
              {/* <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === `/Company/details/Riders/${userID}` && 'active')
                  }
                  to={`/Company/details/Riders/${userID}`}
                >
                  Riders List
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === `/Company/details/Orders/${userID}` && 'active')
                  }
                  to={`/Company/details/Orders/${userID}`}
                >
                  Accepted Orders
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === `/Company/details/Cancelled/${userID}` && 'active')
                  }
                  to={`/Company/details/Cancelled/${userID}`}
                >
                  Cancelled Orders
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export { CustomerHeader };
