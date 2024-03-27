"use client";

import { useContext, useEffect, useState } from "react";

import Hero from "@/components/hero";
import Input from "@/components/input";
import Predictions from "@/components/predictions";
import { Wallpaper } from "@/types/wallpaper";
import Wallpapers from "@/components/wallpapers";
import { toast } from "sonner";
import { AppContext } from "@/contexts/AppContext";

export default function () {
  const { user } = useContext(AppContext);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWallpapers = async function (page: number) {
    try {
      const uri = "/api/get-wallpapers";
      const params = {
        page: page,
        limit: 50,
      };

      setLoading(true);
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });
      setLoading(false);

      if (resp.ok) {
        const res = await resp.json();
        console.log("get wallpapers result: ", res);
        if (res.data) {
          setWallpapers(res.data);
          return;
        }
      }

      toast.error("get wallpapers failed");
    } catch (e) {
      console.log("get wallpapers failed: ", e);
      toast.error("get wallpapers failed");
    }
  };

  useEffect(() => {
    fetchWallpapers(1);
  }, []);

  return (
    <div className="md:mt-16">
      <div className="max-w-3xl mx-auto">
        {/* <Hero /> */}
        <div className="my-4 md:my-6">
          {/* <Producthunt /> */}
        </div>
        {/* <div className="mx-auto my-4 flex max-w-lg justify-center">
          <Input wallpapers={wallpapers} setWallpapers={setWallpapers} />
        </div> */}
      </div>

      <div className="pt-0">
        {/* <Wallpapers wallpapers={wallpapers} loading={loading} /> */}
        <section className="relative">
          <Predictions />
          <div className="mb-8 justify-items-center gap-6 sm:justify-items-stretch md:mb-12 md:gap-8 lg:mb-16">
            <div className="relative mb-4 flex flex-col place-items-center justify-between gap-6 rounded-2xl dark:bg-slate-800 shadow-md  border-slate-200 border border-solid  bg-white px-12 pb-8 pt-16 max-[767px]:mt-4 md:mb-8  md:pb-8 md:pt-16 lg:mb-4">
              <div className="mb-4 flex flex-col items-center">
                <h6 className="font-semibold text-2xl">How to use</h6>
              </div>
              <p>
                To use Stable Video Diffusion for transforming your text into images
                and your images into videos, follow these simple steps:
              </p>
              <p className="text-left">
                <span className="text-base font-semibold">
                  Step 1: Upload Your Photo
                </span>
                - Choose and upload the photo you want to transform into a video.
                Ensure the photo is in a supported format and meets any size
                requirements.
              </p>
              <p>
                <span className="text-base font-semibold">
                  Step 2: Wait for the Video to Generate
                </span>
                - After uploading the photo, the model will process it to generate a
                video. This process may take some time depending on the complexity
                and length of the video.
              </p>
              <p>
                <span className="text-base font-semibold">
                  Step 3: Download Your Video
                </span>
                - Once the video is generated, you will be able to download it.
                Check the quality and, if necessary, you can make adjustments or
                regenerate the video.
              </p>
              <p>
                Note: Stable Video Diffusion is in a research preview phase and is
                mainly intended for educational or creative purposes. Please ensure
                that your usage adheres to the terms and guidelines provided by
                Stability AI.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
