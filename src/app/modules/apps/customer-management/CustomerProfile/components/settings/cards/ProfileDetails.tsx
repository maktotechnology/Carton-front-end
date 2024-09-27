<<<<<<< HEAD
import React, {useEffect, useState} from 'react';
import {toAbsoluteUrl} from '../../../../../../../../_metronic/helpers';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../../../firebase';
import { useParams } from 'react-router-dom';
=======
import React, {useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../../../_metronic/helpers'
import {IProfileDetails, profileDetailsInitValues as initialValues} from '../SettingsModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'

const profileDetailsSchema = Yup.object().shape({
  fName: Yup.string().required('First name is required'),
  lName: Yup.string().required('Last name is required'),
  contactPhone: Yup.string().required('Contact phone is required'),
  companySite: Yup.string().required('Company site is required'),
  country: Yup.string().required('Country is required'),
  language: Yup.string().required('Language is required'),
  timeZone: Yup.string().required('Time zone is required'),
  currency: Yup.string().required('Currency is required'),
})
>>>>>>> 7af00896a516255c5b4fca3789fb0d10d0737ef9

const ProfileDetails: React.FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const { userID } = useParams<{ userID: string }>();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userID) {
        console.error('UID is undefined.');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'user', userID));
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
  }, [userID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSaveChanges = async () => {
    if (!userID || !userData) {
      console.error('Invalid data to save.');
      return;
    }

    try {
      const userDocRef = doc(db, 'user', userID);
      await updateDoc(userDocRef, userData);
      alert('User details updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header border-0 cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>

      </div>

      <div className='card-body border-top p-9'>
        {/* Avatar */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
          <div className='col-lg-8'>
            <div
              className='image-input image-input-outline'
              style={{backgroundImage: `url(${toAbsoluteUrl('media/avatars/blank.png')})`}}
            >
              <div
                className='image-input-wrapper w-125px h-125px'
                style={{backgroundImage: `url(${toAbsoluteUrl(userData.avatar)})`}}
              ></div>
            </div>
          </div>
        </div>

        {/* First Name */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>First Name</label>
          <div className='col-lg-8'>
            <input
              type='text'
              name='firstname'
              className='form-control form-control-lg form-control-solid'
              value={userData.firstname}
              onChange={handleChange}

            />
          </div>
        </div>

        {/* Last Name */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Last Name</label>
          <div className='col-lg-8'>
            <input
              type='text'
              name='lastname'
              className='form-control form-control-lg form-control-solid'
              value={userData.lastname}
              onChange={handleChange}

<<<<<<< HEAD
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Phone Number</label>
          <div className='col-lg-8'>
            <input
              type='tel'
              name='phone_number'
              className='form-control form-control-lg form-control-solid'
              value={userData.phone_number}
              onChange={handleChange}

            />
          </div>
        </div>

        {/* Address 1 */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Address 1</label>
          <div className='col-lg-8'>
            <input
              type='text'
              name='address1'
              className='form-control form-control-lg form-control-solid'
              value={userData.address1}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Address 2 */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>Address 2</label>
          <div className='col-lg-8'>
            <input
              type='text'
              name='address2'
              className='form-control form-control-lg form-control-solid'
              value={userData.address2}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Address Type */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>Address Type</label>
          <div className='col-lg-8'>
            <input
              type='text'
              name='addresstype'
              className='form-control form-control-lg form-control-solid'
              value={userData.addresstype}
              onChange={handleChange}
            />
          </div>
        </div>
=======
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Contact Phone</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Phone number'
                  {...formik.getFieldProps('contactPhone')}
                />
                {formik.touched.contactPhone && formik.errors.contactPhone && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.contactPhone}</div>
                  </div>
                )}
              </div>
            </div>
{/* Address 1 and Address 2 to be modified */}
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Address 1</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Address 1'
                  {...formik.getFieldProps('companySite')}
                />
                {formik.touched.companySite && formik.errors.companySite && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.companySite}</div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Address 2</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Address 2'
                  {...formik.getFieldProps('companySite')}
                />
                {formik.touched.companySite && formik.errors.companySite && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.companySite}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>City</span>
              </label>

            <div className='col-lg-8 fv-row'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='City'
                  {...formik.getFieldProps('city')}
                />
                {formik.touched.contactPhone && formik.errors.contactPhone && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.contactPhone}</div>
                  </div>
                )}
              </div>
            </div>

>>>>>>> 7af00896a516255c5b4fca3789fb0d10d0737ef9

        {/* City */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>City</label>
          <div className='col-lg-8'>
            <input
              type='text'
              name='city'
              className='form-control form-control-lg form-control-solid'
              value={userData.city}
              onChange={handleChange}
            />
          </div>
        </div>

<<<<<<< HEAD
        {/* Country */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Country</label>
          <div className='col-lg-8'>
            <input
              type='text'
              name='country'
              className='form-control form-control-lg form-control-solid'
              value={userData.country}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Save Changes Button */}

          <div className='row'>
            <div className='col-lg-8 offset-lg-4'>
              <button 
                type='button' 
                className='btn btn-primary' 
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
=======
              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg fw-bold'
                  {...formik.getFieldProps('country')}
                >
                  <option value=''>Select a Country...</option>
                  <option value='AF'>Afghanistan</option>
                  <option value='AX'>Aland Islands</option>
                  <option value='AL'>Albania</option>
                  <option value='DZ'>Algeria</option>
                  <option value='AS'>American Samoa</option>
                  <option value='AD'>Andorra</option>
                  <option value='AO'>Angola</option>
                  <option value='AI'>Anguilla</option>
                  <option value='AQ'>Antarctica</option>
                  <option value='AG'>Antigua and Barbuda</option>
                  <option value='AR'>Argentina</option>
                  <option value='AM'>Armenia</option>
                  <option value='AW'>Aruba</option>
                  <option value='AU'>Australia</option>
                  <option value='AT'>Austria</option>
                  <option value='AZ'>Azerbaijan</option>
                  <option value='BS'>Bahamas</option>
                  <option value='BH'>Bahrain</option>
                  <option value='BD'>Bangladesh</option>
                  <option value='BB'>Barbados</option>
                  <option value='BY'>Belarus</option>
                  <option value='BE'>Belgium</option>
                  <option value='BZ'>Belize</option>
                  <option value='BJ'>Benin</option>
                  <option value='BM'>Bermuda</option>
                  <option value='BT'>Bhutan</option>
                  <option value='BO'>Bolivia, Plurinational State of</option>
                  <option value='BQ'>Bonaire, Sint Eustatius and Saba</option>
                  <option value='BA'>Bosnia and Herzegovina</option>
                  <option value='BW'>Botswana</option>
                  <option value='BV'>Bouvet Island</option>
                  <option value='BR'>Brazil</option>
                  <option value='IO'>British Indian Ocean Territory</option>
                  <option value='BN'>Brunei Darussalam</option>
                  <option value='BG'>Bulgaria</option>
                  <option value='BF'>Burkina Faso</option>
                  <option value='BI'>Burundi</option>
                  <option value='KH'>Cambodia</option>
                  <option value='CM'>Cameroon</option>
                  <option value='CA'>Canada</option>
                  <option value='CV'>Cape Verde</option>
                  <option value='KY'>Cayman Islands</option>
                  <option value='CF'>Central African Republic</option>
                  <option value='TD'>Chad</option>
                  <option value='CL'>Chile</option>
                  <option value='CN'>China</option>
                  <option value='CX'>Christmas Island</option>
                  <option value='CC'>Cocos (Keeling) Islands</option>
                  <option value='CO'>Colombia</option>
                  <option value='KM'>Comoros</option>
                  <option value='CG'>Congo</option>
                  <option value='CD'>Congo, the Democratic Republic of the</option>
                  <option value='CK'>Cook Islands</option>
                  <option value='CR'>Costa Rica</option>
                  <option value='CI'>Côte d'Ivoire</option>
                  <option value='HR'>Croatia</option>
                  <option value='CU'>Cuba</option>
                  <option value='CW'>Curaçao</option>
                  <option value='CY'>Cyprus</option>
                  <option value='CZ'>Czech Republic</option>
                  <option value='DK'>Denmark</option>
                  <option value='DJ'>Djibouti</option>
                  <option value='DM'>Dominica</option>
                  <option value='DO'>Dominican Republic</option>
                  <option value='EC'>Ecuador</option>
                  <option value='EG'>Egypt</option>
                  <option value='SV'>El Salvador</option>
                  <option value='GQ'>Equatorial Guinea</option>
                  <option value='ER'>Eritrea</option>
                  <option value='EE'>Estonia</option>
                  <option value='ET'>Ethiopia</option>
                  <option value='FK'>Falkland Islands (Malvinas)</option>
                  <option value='FO'>Faroe Islands</option>
                  <option value='FJ'>Fiji</option>
                  <option value='FI'>Finland</option>
                  <option value='FR'>France</option>
                  <option value='GF'>French Guiana</option>
                  <option value='PF'>French Polynesia</option>
                  <option value='TF'>French Southern Territories</option>
                  <option value='GA'>Gabon</option>
                  <option value='GM'>Gambia</option>
                  <option value='GE'>Georgia</option>
                  <option value='DE'>Germany</option>
                  <option value='GH'>Ghana</option>
                  <option value='GI'>Gibraltar</option>
                  <option value='GR'>Greece</option>
                  <option value='GL'>Greenland</option>
                  <option value='GD'>Grenada</option>
                  <option value='GP'>Guadeloupe</option>
                  <option value='GU'>Guam</option>
                  <option value='GT'>Guatemala</option>
                  <option value='GG'>Guernsey</option>
                  <option value='GN'>Guinea</option>
                  <option value='GW'>Guinea-Bissau</option>
                  <option value='GY'>Guyana</option>
                  <option value='HT'>Haiti</option>
                  <option value='HM'>Heard Island and McDonald Islands</option>
                  <option value='VA'>Holy See (Vatican City State)</option>
                  <option value='HN'>Honduras</option>
                  <option value='HK'>Hong Kong</option>
                  <option value='HU'>Hungary</option>
                  <option value='IS'>Iceland</option>
                  <option value='IN'>India</option>
                  <option value='ID'>Indonesia</option>
                  <option value='IR'>Iran, Islamic Republic of</option>
                  <option value='IQ'>Iraq</option>
                  <option value='IE'>Ireland</option>
                  <option value='IM'>Isle of Man</option>
                  <option value='IL'>Israel</option>
                  <option value='IT'>Italy</option>
                  <option value='JM'>Jamaica</option>
                  <option value='JP'>Japan</option>
                  <option value='JE'>Jersey</option>
                  <option value='JO'>Jordan</option>
                  <option value='KZ'>Kazakhstan</option>
                  <option value='KE'>Kenya</option>
                  <option value='KI'>Kiribati</option>
                  <option value='KP'>Korea, Democratic People's Republic of</option>
                  <option value='KW'>Kuwait</option>
                  <option value='KG'>Kyrgyzstan</option>
                  <option value='LA'>Lao People's Democratic Republic</option>
                  <option value='LV'>Latvia</option>
                  <option value='LB'>Lebanon</option>
                  <option value='LS'>Lesotho</option>
                  <option value='LR'>Liberia</option>
                  <option value='LY'>Libya</option>
                  <option value='LI'>Liechtenstein</option>
                  <option value='LT'>Lithuania</option>
                  <option value='LU'>Luxembourg</option>
                  <option value='MO'>Macao</option>
                  <option value='MK'>Macedonia, the former Yugoslav Republic of</option>
                  <option value='MG'>Madagascar</option>
                  <option value='MW'>Malawi</option>
                  <option value='MY'>Malaysia</option>
                  <option value='MV'>Maldives</option>
                  <option value='ML'>Mali</option>
                  <option value='MT'>Malta</option>
                  <option value='MH'>Marshall Islands</option>
                  <option value='MQ'>Martinique</option>
                  <option value='MR'>Mauritania</option>
                  <option value='MU'>Mauritius</option>
                  <option value='YT'>Mayotte</option>
                  <option value='MX'>Mexico</option>
                  <option value='FM'>Micronesia, Federated States of</option>
                  <option value='MD'>Moldova, Republic of</option>
                  <option value='MC'>Monaco</option>
                  <option value='MN'>Mongolia</option>
                  <option value='ME'>Montenegro</option>
                  <option value='MS'>Montserrat</option>
                  <option value='MA'>Morocco</option>
                  <option value='MZ'>Mozambique</option>
                  <option value='MM'>Myanmar</option>
                  <option value='NA'>Namibia</option>
                  <option value='NR'>Nauru</option>
                  <option value='NP'>Nepal</option>
                  <option value='NL'>Netherlands</option>
                  <option value='NC'>New Caledonia</option>
                  <option value='NZ'>New Zealand</option>
                  <option value='NI'>Nicaragua</option>
                  <option value='NE'>Niger</option>
                  <option value='NG'>Nigeria</option>
                  <option value='NU'>Niue</option>
                  <option value='NF'>Norfolk Island</option>
                  <option value='MP'>Northern Mariana Islands</option>
                  <option value='NO'>Norway</option>
                  <option value='OM'>Oman</option>
                  <option value='PK'>Pakistan</option>
                  <option value='PW'>Palau</option>
                  <option value='PS'>Palestinian Territory, Occupied</option>
                  <option value='PA'>Panama</option>
                  <option value='PG'>Papua New Guinea</option>
                  <option value='PY'>Paraguay</option>
                  <option value='PE'>Peru</option>
                  <option value='PH'>Philippines</option>
                  <option value='PN'>Pitcairn</option>
                  <option value='PL'>Poland</option>
                  <option value='PT'>Portugal</option>
                  <option value='PR'>Puerto Rico</option>
                  <option value='QA'>Qatar</option>
                  <option value='RE'>Réunion</option>
                  <option value='RO'>Romania</option>
                  <option value='RU'>Russian Federation</option>
                  <option value='RW'>Rwanda</option>
                  <option value='BL'>Saint Barthélemy</option>
                  <option value='SH'>Saint Helena, Ascension and Tristan da Cunha</option>
                  <option value='KN'>Saint Kitts and Nevis</option>
                  <option value='LC'>Saint Lucia</option>
                  <option value='MF'>Saint Martin (French part)</option>
                  <option value='PM'>Saint Pierre and Miquelon</option>
                  <option value='VC'>Saint Vincent and the Grenadines</option>
                  <option value='WS'>Samoa</option>
                  <option value='SM'>San Marino</option>
                  <option value='ST'>Sao Tome and Principe</option>
                  <option value='SA'>Saudi Arabia</option>
                  <option value='SN'>Senegal</option>
                  <option value='RS'>Serbia</option>
                  <option value='SC'>Seychelles</option>
                  <option value='SL'>Sierra Leone</option>
                  <option value='SG'>Singapore</option>
                  <option value='SX'>Sint Maarten (Dutch part)</option>
                  <option value='SK'>Slovakia</option>
                  <option value='SI'>Slovenia</option>
                  <option value='SB'>Solomon Islands</option>
                  <option value='SO'>Somalia</option>
                  <option value='ZA'>South Africa</option>
                  <option value='GS'>South Georgia and the South Sandwich Islands</option>
                  <option value='KR'>South Korea</option>
                  <option value='SS'>South Sudan</option>
                  <option value='ES'>Spain</option>
                  <option value='LK'>Sri Lanka</option>
                  <option value='SD'>Sudan</option>
                  <option value='SR'>Suriname</option>
                  <option value='SJ'>Svalbard and Jan Mayen</option>
                  <option value='SZ'>Swaziland</option>
                  <option value='SE'>Sweden</option>
                  <option value='CH'>Switzerland</option>
                  <option value='SY'>Syrian Arab Republic</option>
                  <option value='TW'>Taiwan, Province of China</option>
                  <option value='TJ'>Tajikistan</option>
                  <option value='TZ'>Tanzania, United Republic of</option>
                  <option value='TH'>Thailand</option>
                  <option value='TL'>Timor-Leste</option>
                  <option value='TG'>Togo</option>
                  <option value='TK'>Tokelau</option>
                  <option value='TO'>Tonga</option>
                  <option value='TT'>Trinidad and Tobago</option>
                  <option value='TN'>Tunisia</option>
                  <option value='TR'>Turkey</option>
                  <option value='TM'>Turkmenistan</option>
                  <option value='TC'>Turks and Caicos Islands</option>
                  <option value='TV'>Tuvalu</option>
                  <option value='UG'>Uganda</option>
                  <option value='UA'>Ukraine</option>
                  <option value='AE'>United Arab Emirates</option>
                  <option value='GB'>United Kingdom</option>
                  <option value='US'>United States</option>
                  <option value='UY'>Uruguay</option>
                  <option value='UZ'>Uzbekistan</option>
                  <option value='VU'>Vanuatu</option>
                  <option value='VE'>Venezuela, Bolivarian Republic of</option>
                  <option value='VN'>Vietnam</option>
                  <option value='VI'>Virgin Islands</option>
                  <option value='WF'>Wallis and Futuna</option>
                  <option value='EH'>Western Sahara</option>
                  <option value='YE'>Yemen</option>
                  <option value='ZM'>Zambia</option>
                  <option value='ZW'>Zimbabwe</option>
                </select>
                {formik.touched.country && formik.errors.country && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.country}</div>
                  </div>
                )}
              </div>
>>>>>>> 7af00896a516255c5b4fca3789fb0d10d0737ef9
            </div>
          </div>

      </div>
    </div>
  );
};

export {ProfileDetails};
