export const fileUpload = async (file) => {
  const cloudUrl = 'https://api.cloudinary.com/v1_1/klygor/image/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);
  formData.append('folder', 'journal-app');

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });

    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
