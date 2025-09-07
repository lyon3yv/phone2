// Utility functions for handling file uploads and conversion

export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Tipo de archivo no válido. Solo se permiten: JPEG, PNG, GIF, WebP');
  }

  if (file.size > maxSize) {
    throw new Error('El archivo es demasiado grande. Máximo 5MB permitido');
  }

  return true;
};

export const validateVideoFile = (file) => {
  const validTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm'];
  const maxSize = 50 * 1024 * 1024; // 50MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Tipo de archivo no válido. Solo se permiten: MP4, MPEG, QuickTime, WebM');
  }

  if (file.size > maxSize) {
    throw new Error('El archivo es demasiado grande. Máximo 50MB permitido');
  }

  return true;
};

export const compressImage = (file, maxWidth = 800, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };

    img.src = URL.createObjectURL(file);
  });
};
