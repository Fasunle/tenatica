import multer from 'multer';
import md5 from 'md5';
import { join } from 'path';

// the set of supported format
const supported = new Set(['mp3', 'jpeg', 'jpg', 'txt', 'pdf', 'png']);

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    if (file === undefined) {
      const error = new Error('No file was selected.');
      cb(error, null);
      req.complete = true;
      return;
    }

    const fileParams = file.originalname.split('.');
    const fileLength = fileParams.length;
    const extension = fileParams[fileLength - 1];
    const rawName = fileParams
      .slice(0, fileLength - 1)
      .join('')
      .split(' ')
      .map((word) => word.trim())
      .join('-');
    const isSupported = supported.has(extension);

    const currentTime = new Date();
    const fileHash = md5(rawName + currentTime);
    const newFileName = rawName
      .concat('-')
      .concat(fileHash)
      .concat(`.${extension}`);

    isSupported && cb(null, newFileName);
    // if not supported, flag it for deletion
    !isSupported && cb(null, 'delete');
  },
  destination: join(__dirname, '../../public/temp'),
});

const localStorage = multer({ storage }).array('files');

export default localStorage;
