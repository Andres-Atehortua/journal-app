import { fileUpload } from '../../helpers/fileUpload';

import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'klygor',
  api_key: '898633946583146',
  api_secret: 'aY6CxXWV8TH2cTMWgAXNzbAaI2A',
});

describe('Testing fileUpload function', () => {
  test('should upload a file and return an url', async () => {
    const resp = await fetch(
      'https://conceptodefinicion.de/wp-content/uploads/2013/12/paraiso.jpg'
    );

    const blob = await resp.blob();

    const file = new File([blob], 'file.jpg');

    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    // Delete imag by id
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');

    cloudinary.v2.api.delete_resources(
      `journal-app/${imageId}`,
      (error, result) => {
        // console.log(error, result);
      }
    );
  });

  test('should return an error', async () => {
    const file = new File([], 'file.jpg');

    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
