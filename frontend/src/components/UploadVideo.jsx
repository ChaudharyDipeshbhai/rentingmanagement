// import React, { useState } from 'react';
// import { db, storage } from './firebase'; // Importing the correct firebase instance
// import { collection, addDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// const UploadVideo = () => {
//   const [video, setVideo] = useState(null);
//   const [videoUrl, setVideoUrl] = useState('');
//   const [apartmentId, setApartmentId] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVideo(file);
//     }
//   };

//   const handleUpload = async () => {
//     if (!video || !apartmentId) {
//       alert('Please select a video and an apartment');
//       return;
//     }

//     setLoading(true);
//     try {
//       const videoRef = ref(storage, `videos/${apartmentId}/${video.name}`);
//       await uploadBytes(videoRef, video);
//       const videoURL = await getDownloadURL(videoRef);

//       await addDoc(collection(db, 'videos'), {
//         apartmentId,
//         videoUrl: videoURL,
//         createdAt: new Date(),
//       });

//       setVideoUrl(videoURL);
//       alert('Video uploaded successfully');
//     } catch (error) {
//       console.error('Error uploading video:', error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <h2>Upload Virtual Visit Video</h2>
//       <input
//         type="text"
//         placeholder="Apartment ID"
//         value={apartmentId}
//         onChange={(e) => setApartmentId(e.target.value)}
//       />
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? 'Uploading...' : 'Upload Video'}
//       </button>
//       {videoUrl && (
//         <div>
//           <p>Video uploaded successfully!</p>
//           <video width="400" controls>
//             <source src={videoUrl} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadVideo;
