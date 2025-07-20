const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Storage configuration for documents (PDFs, DOCX, TXT)
const documentStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'JD-resume',
        allowedFormats: ['pdf', 'docx', 'txt'],
        resource_type: 'raw', // For non-image files
    }
});

// Storage configuration for images
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile-images',
        allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        resource_type: 'image',
        transformation: [
            {
                width: 400,
                height: 400,
                crop: 'fill',
                gravity: 'face', // Focus on face if detected
                quality: 'auto:good'
            }
        ]
    }
});

// Helper function to upload image from buffer/base64
const uploadImage = async (file, options = {}) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: options.folder || 'profile-images',
            transformation: [
                {
                    width: options.width || 400,
                    height: options.height || 400,
                    crop: 'fill',
                    gravity: 'face',
                    quality: 'auto:good'
                }
            ],
            ...options
        });
        return result;
    } catch (error) {
        throw new Error(`Image upload failed: ${error.message}`);
    }
};

// Helper function to delete image
const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error(`Image deletion failed: ${error.message}`);
    }
};

module.exports = {
    cloudinary,
    documentStorage,
    imageStorage,
    uploadImage,
    deleteImage
};