import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

/**
 * Configures the Cloudinary client
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * FormDataFile type definition
 * @typedef {Object} FormDataFile
 * @property {string} name - The name of the file
 * @property {string} type - The type of the file
 * @property {function} arrayBuffer - The arrayBuffer of the file
 */
export type FormDataFile = {
  name: string;
  type: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
};

/**
 * Uploads a file to Cloudinary
 * @param file - The file to upload
 * @returns The uploaded file
 */
export async function uploadFileToCloudinary(file: FormDataFile) {
  try {
    const buffer = await file.arrayBuffer();
    const base64String = Buffer.from(buffer).toString('base64');
    const dataUrl = `data:${file.type};base64,${base64String}`;

    const type = file.name.includes('.') ? file.name.split('.').pop() : null;
    if (!type) return;

    const publicId = `${uuidv4()}_${file.name.replace(/[^a-zA-Z0-9_-]/g, '')}`;

    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: 'user_profil',
      public_id: `${publicId}.${type}`,
      resource_type: 'raw',
    });

    const downloadUrl = cloudinary.url(result.public_id, {
      resource_type: result.resource_type,
      type: 'upload',
      flags: 'attachment',
      attachment: file.name,
    });

    return {
      ...result,
      downloadUrl,
    };
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
}
