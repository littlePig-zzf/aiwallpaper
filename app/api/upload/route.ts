import { respData, respErr } from "@/lib/resp";

import { handleImg } from "@/models/video";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request, res: Response) {
  try {
    const formData = await req.formData();
    // const file = formData.get("file") as File;

    console.log(formData, "formData===================");

    const wallpapers = await handleImg(formData);

    return respData(wallpapers);
  } catch (e) {
    console.log("get wallpapers failed: ", e);
    return respErr("get wallpapers failed");
  }
}
