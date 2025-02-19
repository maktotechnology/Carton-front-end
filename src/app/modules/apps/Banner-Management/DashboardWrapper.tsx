import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { PageTitle } from '../../../../_metronic/layout/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db, app } from '../../../firebase'; // Ensure Firebase is initialized properly
import { getStorage as getFirebaseStorage } from 'firebase/storage';

const storage = getFirebaseStorage(app);
const BANNER_COLLECTION = 'banners';

const Banner = () => {
  const intl = useIntl();
  const [banners, setBanners] = useState<Array<string | null>>(Array(6).fill(null));
  const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>(Array(6).fill(null));
  const [loading, setLoading] = useState<boolean[]>(Array(6).fill(false)); // Track loading state for each image

  useEffect(() => {
    const fetchBanners = async () => {
      const querySnapshot = await getDocs(collection(db, BANNER_COLLECTION));
      let images: Array<string | null> = Array(6).fill(null);
      querySnapshot.forEach((doc) => {
        images[doc.data().index] = doc.data().url;
      });
      setBanners(images);
    };
    fetchBanners();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const updatedFiles = [...selectedFiles];
    updatedFiles[index] = file;
    setSelectedFiles(updatedFiles);
  };

  const handleUpload = async (index: number) => {
    const file = selectedFiles[index];
    if (!file) return;

    // Set loading state for the current image upload
    setLoading((prevLoading) => {
      const updatedLoading = [...prevLoading];
      updatedLoading[index] = true;
      return updatedLoading;
    });

    const storageRef = ref(storage, `banners/banner_${index}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    
    // Set or update Firestore document
    const docRef = doc(db, BANNER_COLLECTION, `banner_${index}`);
    await setDoc(docRef, { url, index }, { merge: true });
    
    const updatedBanners = [...banners];
    updatedBanners[index] = url;
    setBanners(updatedBanners);

    // Reset file selection and loading state after upload is complete
    setSelectedFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = null;
      return newFiles;
    });

    setLoading((prevLoading) => {
      const updatedLoading = [...prevLoading];
      updatedLoading[index] = false;
      return updatedLoading;
    });
  };

  return (
    <>
      <PageTitle breadcrumbs={[]}>Banner Management</PageTitle>
      <div className="grid grid-cols-3 gap-6 p-6">
        {banners.map((banner, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg flex flex-col items-center p-4 transition-all hover:shadow-xl hover:scale-105"
          >
            <div className="w-full h-48 mb-4 flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden">
              {selectedFiles[index] ? (
                <img
                  src={URL.createObjectURL(selectedFiles[index]!)}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-contain"
                />
              ) : banner ? (
                <img src={banner} alt={`Banner ${index}`} className="w-full h-full object-contain" />
              ) : (
                <div className="text-center text-gray-500">No Image</div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, index)}
              className="mb-2 p-2 border rounded-md w-full"
            />

<button
  onClick={() => handleUpload(index)}
  className={`px-4 py-2 rounded-md transition-all ${
    loading[index]
      ? 'bg-[#FF8C00] !text-white' // When loading, use the darker color and ensure text is white
      : 'bg-[#FFA800] hover:bg-[#FF8C00] text-white' // Default color when not loading
  } disabled:bg-[#FF8C00]`} // Disabled state for the button when it's loading
  disabled={loading[index] || !selectedFiles[index]}
>
  {loading[index] ? 'Uploading...' : 'Upload'}
</button>


          </div>
        ))}
      </div>
    </>
  );
};

export { Banner };
