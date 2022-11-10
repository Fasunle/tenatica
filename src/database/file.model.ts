import { firestore } from '../server';

export class FileModel {
  private _fileModel = firestore.collection('files');
  constructor() {}

  async create(item: IFile): Promise<{ data: string }> {
    try {
      await this._fileModel.add(item);
      return { data: 'Created 200 OK' };
    } catch (error) {
      console.log('An error has occured');
      console.log({ error });
    }
  }

  async getAllFiles(
    email: string,
  ): Promise<{ files: IFile[]; status: number }> {
    let files = [];

    try {
      const data = await this._fileModel.get();

      // if (data.empty) return { files: [], status: 200 };

      data.forEach( ( doc ) => {
        const userEmail = doc.data().senderEmail;
        const receiverEmail = doc.data().receiverEmail;
        if (userEmail === email || receiverEmail === email) {
          const file: IFile = {
            senderEmail: userEmail,
            receiverEmail,
            tag: doc.data().tag,
            date: doc.data().date,
            fileId: doc.data().fileId,
            fileUrl: doc.data().fileUrl,
            filename: doc.data().filename,
            contentType: doc.data().contentType,
          };

          files.push(file);
        }
      } );

      if (!files?.length) return { files: [], status: 404 };

      return { files, status: 200 };
    } catch (error) {
      console.log({ error });
      return { files: [], status: 400 };
    }
  }
}
