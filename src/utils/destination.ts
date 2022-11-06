const images = new Set(['jpeg', 'png', 'jpg']);
const documents = new Set(['txt', 'pdf']);
const audios = new Set(['mp3']);

export const destinationFolder = (name: string) => {
  const fileParam = name.split('.');
  const nameLenght = fileParam.length;
  const extension = fileParam[nameLenght - 1];

  if (images.has(extension)) return 'images';
  if (documents.has(extension)) return 'documents';
  if (audios.has(extension)) return 'audios';

  return 'general';
};
