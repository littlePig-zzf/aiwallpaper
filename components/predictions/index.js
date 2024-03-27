import { useState } from "react";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  // const [prediction, setPrediction] = useState(null);
  const [videoPrediction, setVideoPrediction] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // 检查文件大小
      if (file.size > 1 * 1024 * 1024) {
        alert("File size exceeds 1MB limit.");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.imageUrl);
        } else {
          console.error("Error uploading image:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading image:", error.message);
      }
    }
  };

  const handleVideo = async () => {
    if (!imageUrl) return;
    const response = await fetch("/api/video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: imageUrl,
      }),
    });

    let res = await response.json();

    if (response.status !== 201) {
      setError(res.detail);
      return;
    }
    setVideoPrediction(res);

    while (res.status !== "succeeded" && res.status !== "failed") {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + res.id);
      res = await response.json();
      if (response.status !== 200) {
        setError(res.detail);
        return;
      }
      setVideoPrediction(res);
    }
  };
  const downloadVideo = async () => {
    // 替换成你的 MP4 视频 URL
    const videoUrl = videoPrediction.output;

    try {
      const response = await fetch(videoUrl);
      const videoBlob = await response.blob();

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(videoBlob);
      downloadLink.download = "video.mp4";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <Head>
        <title>Replicate + Next.js</title>
        <meta
          title="Stable video diffusion"
          description="Stable video diffusion"
        ></meta>
      </Head>

      <p>
        Dream something with{" "}
        <a href="https://stable-vidoe-diffusion.site/">SDXL</a>:
      </p>

      <div className="flex w-full flex-col gap-3 sm:flex-row mb-4">
        <Input
          name="prompt"
          placeholder="Upload an image"
          type="file"
          id="imageInput"
          accept="image/*"
          enctype="multipart/form-data"
          onChange={handleFileChange}
        />
        <Button onClick={handleVideo}>Go!</Button>
      </div>

      {error && <div>{error}</div>}
      {(imageUrl || videoPrediction) && (
        <>
          <div className="flex justify-center">
            {/* <div className="image-wrapper mt-5">
              <Image fill src={imageUrl} alt="output" sizes="100vw" />
            </div> */}
            {videoPrediction?.output && (
              <div className="image-wrapper mt-5 ml-1">
                <video
                  src={videoPrediction?.output}
                  preload="auto"
                  autoPlay
                  controls
                  loop
                  className=" w-[100%] "
                ></video>
                <button className="download" onClick={downloadVideo}>
                  download ↓
                </button>
              </div>
            )}
          </div>
          {videoPrediction?.status !== "succeeded" && (
            <p className="py-3 text-sm opacity-50">
              status: {videoPrediction?.status}
            </p>
          )}
        </>
      )}
    </div>
  );
}
