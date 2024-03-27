import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};
const OSS = require("ali-oss");
const path = require("path");

const client = new OSS({
  // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: "oss-cn-beijing",
  // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  // 填写Bucket名称。
  bucket: "bucket-zhifen",
  secure: true,
});

// 自定义请求头
const headers = {
  // 指定Object的存储类型。
  "x-oss-storage-class": "Standard",
  // 指定Object的访问权限。
  "x-oss-object-acl": "public-read",
  // 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.txt。
  "Content-Disposition": "inline",
  // 设置Object的标签，可同时设置多个标签。
  "x-oss-tagging": "Tag1=1&Tag2=2",
  // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
  "x-oss-forbid-overwrite": "false",
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("=========================");
    const form = formidable({});

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const image = files.file[0];
      try {
        // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
        // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
        const result = await client.put(
          image.originalFilename,
          path.normalize(image.filepath),
          // 自定义headers
          { headers }
        );
        res.status(200).json({ imageUrl: result?.url });
        console.log(result);
      } catch (e) {
        console.log(e);
        res.status(500).json({ error: e });
      }
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

// async function uploadToImgBB(filePath) {
//   const fs = require("fs");
//   const data = fs.readFileSync(filePath);

//   try {
//     const response = await fetch(
//       "https://api.imgbb.com/1/upload?key=bcdda197234ed4e4931c7be5cea5107e",
//       {
//         method: "POST",
//         body: data,
//       }
//     );

//     if (response.ok) {
//       const responseData = await response.json();
//       return responseData.data.url;
//     } else {
//       console.error("Error uploading image:", response.statusText);
//       return null;
//     }
//   } catch (error) {
//     console.error("Error uploading image:", error.message);
//     return null;
//   }
// }
