// const express = require('express');
// const { db, storage } = require('./firebaseAdmin');
// const router = express.Router();
// const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// // Create: Upload Video
// router.post('/upload-video', async (req, res) => {
//   const { apartmentId, videoFile } = req.body; // videoFile should be base64 or a direct file from frontend
//   if (!apartmentId || !videoFile) {
//     return res.status(400).send('Apartment ID and video are required');
//   }

//   try {
//     // Upload video to Firebase Storage
//     const videoRef = ref(storage, `videos/${apartmentId}/${videoFile.name}`);
//     const uploadSnapshot = await uploadBytes(videoRef, videoFile);

//     // Get the video URL after uploading
//     const videoUrl = await getDownloadURL(uploadSnapshot.ref);

//     // Save video details to Firestore
//     const docRef = await db.collection('videos').add({
//       apartmentId,
//       videoUrl,
//       createdAt: admin.firestore.Timestamp.now(),
//     });

//     res.status(201).send({ id: docRef.id, message: 'Video uploaded successfully', videoUrl });
//   } catch (error) {
//     console.error('Error uploading video:', error);
//     res.status(500).send('Error uploading video: ' + error.message);
//   }
// });

// // Read: Fetch All Videos
// router.get('/videos', async (req, res) => {
//   try {
//     const videoSnapshot = await db.collection('videos').get();
//     const videos = videoSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     res.status(200).send(videos);
//   } catch (error) {
//     console.error('Error fetching videos:', error);
//     res.status(500).send('Error fetching videos: ' + error.message);
//   }
// });

// // Update: Update Video Details
// router.put('/update-video/:id', async (req, res) => {
//   const { id } = req.params;
//   const { apartmentId, videoUrl } = req.body; // Optional parameters to update

//   if (!id || (!apartmentId && !videoUrl)) {
//     return res.status(400).send('Apartment ID or video URL is required to update');
//   }

//   try {
//     const videoRef = db.collection('videos').doc(id);
//     const videoDoc = await videoRef.get();

//     if (!videoDoc.exists) {
//       return res.status(404).send('Video not found');
//     }

//     const updateData = {};
//     if (apartmentId) updateData.apartmentId = apartmentId;
//     if (videoUrl) updateData.videoUrl = videoUrl;

//     await videoRef.update(updateData);

//     res.status(200).send({ message: 'Video updated successfully', updatedData: updateData });
//   } catch (error) {
//     console.error('Error updating video:', error);
//     res.status(500).send('Error updating video: ' + error.message);
//   }
// });

// // Delete: Delete Video
// router.delete('/delete-video/:id', async (req, res) => {
//   const { id } = req.params;
//   if (!id) {
//     return res.status(400).send('Video ID is required to delete');
//   }

//   try {
//     const videoRef = db.collection('videos').doc(id);
//     const videoDoc = await videoRef.get();

//     if (!videoDoc.exists) {
//       return res.status(404).send('Video not found');
//     }

//     // Get the video URL to delete from Firebase Storage
//     const videoUrl = videoDoc.data().videoUrl;
//     const videoFileName = videoUrl.split('/').pop(); // Assuming URL structure: "videos/{apartmentId}/{filename}"

//     // Delete video from Firebase Storage
//     const videoStorageRef = storage.file(`videos/${videoFileName}`);
//     await videoStorageRef.delete();

//     // Delete video from Firestore
//     await videoRef.delete();

//     res.status(200).send({ message: 'Video deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting video:', error);
//     res.status(500).send('Error deleting video: ' + error.message);
//   }
// });

// module.exports = router;


// export default VideoRoutes;