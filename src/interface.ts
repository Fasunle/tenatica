interface IFile {
  senderEmail: string;
  receiverEmail: string;
  filename: string;
  fileUrl: string;
  contentType: string;
  fileId: string;
  date: string;
  tag: string;
}

interface IUser {
  userId: string;
  email: string;
  username: string;
}

interface ICreateUserResponse {
  message: string;
  status: number;
}
