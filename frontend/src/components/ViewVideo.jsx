// import React, { useState, useEffect } from 'react';
// import { db } from './firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import { storage, db } from './utils/firebase'; // Adjust the path based on your project structure

// const ViewVideos = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const videoSnapshot = await getDocs(collection(db, 'videos'));
//         setVideos(videoSnapshot.docs.map((doc) => doc.data()));
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       }
//     };

//     fetchVideos();
//   }, []);

//   return (
//     <div>
//       <h2>Virtual Visit Videos</h2>
//       {videos.length > 0 ? (
//         videos.map((video, index) => (
//           <div key={index}>
//             <h3>Apartment ID: {video.apartmentId}</h3>
//             <video width="400" controls>
//               <source src={video.videoUrl} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         ))
//       ) : (
//         <p>No videos uploaded yet.</p>
//       )}
//     </div>
//   );
// };

// export default ViewVideos;
