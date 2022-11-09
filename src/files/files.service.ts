import { storage as storageRef } from '../server';
import { destinationFolder } from '../utils/destination';
import { uploadToFirebaseStorage } from '../service/uploads';
import { FileModel } from '../database/file.model';
import { createDataResponse } from '../utils/response';
import { join } from 'path';

export const uploadFile = async (req, res) => {
  const files: any = req.files;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const imageTag = req.body.tag;
  const userEmail = req.body.userEmail;
  const receiverEmail = req.body.receiverEmail;

  // check if user have an account before proceeding

  // file create
  const fileModel = new FileModel();
  for (const file of files) {
    const filename = join(__dirname, 'temp', file.filename);
    console.log({ file });
    let destination = destinationFolder(filename);
    let newFile;
    // unsupported format
    if (destination === 'images') {
      await uploadToFirebaseStorage(storageRef, file, destination)
        // format
        .then((uploaded) => ({
          filename: uploaded[1].name,
          fileUrl: uploaded[1].mediaLink,
          date: uploaded[1].timeCreated,
          contentType: uploaded[1].contentType,
          fileId: uploaded[1].id,
        }))
        // create a new enrty
        .then((uploaded) => {
          console.log({ uploaded });
          newFile = {
            tag: imageTag,
            fileId: uploaded.fileId,
            filename: uploaded.filename,
            senderEmail: userEmail,
            receiverEmail,
            date: uploaded.date,
            fileUrl: uploaded.fileUrl,
            contentType: uploaded.contentType,
          };
          fileModel.create(newFile);
        })
        .catch((error) => console.error({ error }));
    }

    // TODO: delete all entries after uploading all
    if (!newFile) return res.status(400).end();
    res.status(201).json(newFile).end();
  }
};

export const getAllFiles = async (req, res) => {
  const userEmail = req.query.userEmail;

  if (!userEmail)
    return res.status(400).send({
      message: 'userEmail are required',
      status: 400,
    });

  const fileModel = new FileModel();
  const files = await fileModel.getAllFiles(userEmail);

  res.status(files.status).json(createDataResponse(files));
};
