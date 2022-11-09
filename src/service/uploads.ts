import { v4 as uuidv4 } from 'uuid';

type FileType = {
  filename: string;
  mimetype: string;
  path: string;
  originalName?: string;
};

export const uploadToFirebaseStorage = async (
  storageRef: any,
  file: FileType,
  dest: string,
) => {
  const { filename, mimetype, path, originalName } = file;

  return storageRef.upload(path, {
    public: true,
    destination: `${dest}/${filename}`,
    metadata: {
      name: originalName,
      'Content-Type': mimetype,
      public: true,
      firebaseStorageDownloadTokens: uuidv4(),
    },
  });
};
