const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();

const region = process.env.AWS_REGION || 'ap-south-1';
const bucketName = process.env.AWS_S3_BUCKET || 'buildmitra-mumbai-storage';

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

/**
 * Upload a Buffer to AWS S3 bucket
 * @param {Buffer} buffer 
 * @param {string} originalName 
 * @param {string} mimeType 
 * @param {string} folderPrefix ('media' | 'kyc' | 'reports' | 'cms')
 * @returns {Promise<{ s3Url: string, key: string, size: number }>}
 */
async function uploadToS3(buffer, originalName, mimeType, folderPrefix = 'media') {
  const cleanName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const key = `${folderPrefix}/${Date.now()}_${cleanName}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: mimeType
  });

  await s3Client.send(command);

  // Return public S3 URL (PublicReadGetObject policy is active on the bucket)
  const s3Url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

  return {
    s3Url,
    key,
    size: buffer.length
  };
}

/**
 * Generate Presigned Download URL for private files
 */
async function getPresignedDownloadUrl(key, expiresInSeconds = 3600) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key
  });
  return await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
}

/**
 * Delete an object from S3
 */
async function deleteFromS3(key) {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key
  });
  return await s3Client.send(command);
}

module.exports = {
  s3Client,
  bucketName,
  region,
  uploadToS3,
  getPresignedDownloadUrl,
  deleteFromS3
};
