import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type FormDataFile = {
  name: string;
  type: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
};

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
