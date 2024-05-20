import multer from "multer";
import { v4 as uuid } from "uuid";
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    const id = uuid();
    const extName = file.originalname.split(".").pop();

    callBack(null, `${id}.${extName}`);
  },
});
export const singleUpload = multer({ storage }).single("photo");
