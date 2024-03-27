import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="relative mb-4 flex flex-col place-items-center justify-between gap-6 rounded-2xl border border-solid  dark:bg-slate-800 shadow-md  border-slate-200 bg-white px-8 pb-8 pt-10 max-[767px]:mt-4 md:mb-8 md:px-6 md:pb-8  lg:mb-4">
      <div
        id="introduction"
        className="bg-white dark:bg-slate-800 border-slate-200 p-5"
      >
        <div className="text-slate-800 dark:text-white space-y-2 mb-0">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Stable Video Diffusion {t("Introduction")}
          </h1>

          <h2 className="text-xl font-semibold my-2">
            What is Stable Video Diffusion?
          </h2>
          <p className="my-2">
            Stable Video Diffusion is a state-of-the-art generative AI video
            model that&apos;s currently available in a research preview.
            It&apos;s designed to transform images into videos, expanding the
            horizons of AI-driven content creation.
          </p>

          <h2 className="text-xl font-semibold my-2">Why It Matters</h2>
          <p className="my-2">
            This model opens up new possibilities for content creation across
            sectors like advertising, education, and entertainment. By
            automating and enhancing video production, it allows for greater
            creative expression and efficiency.
          </p>

          <h2 className="text-xl font-semibold my-2">
            Model Variants: SVD and SVD-XT
          </h2>
          <p className="my-2">
            Stable Video Diffusion comes in two variants: SVD and SVD-XT. SVD
            can transform images into 576×1024 resolution videos with 14 frames,
            while SVD-XT extends this to 24 frames. Both models can operate at
            frame rates ranging from 3 to 30 frames per second.
          </p>

          <h2 className="text-xl font-semibold my-2">Training and Data</h2>
          <p className="my-2">
            To develop Stable Video Diffusion, Stability AI curated a large
            video dataset with approximately 600 million samples. This dataset
            was pivotal in training the base model, ensuring its robustness and
            versatility.
          </p>

          <h2 className="text-xl font-semibold my-2">
            Usage in Various Sectors
          </h2>
          <p className="my-2">
            The model&apos;s flexibility makes it adaptable for various video
            applications, such as multi-view synthesis from single images. It
            has potential uses in advertising, education, and beyond, offering a
            new dimension to video content generation.
          </p>

          <h2 className="text-xl font-semibold my-2">Current Limitations</h2>
          <p className="my-2">
            Despite its capabilities, Stable Video Diffusion has certain
            limitations. It struggles with generating videos without motion,
            controlling videos via text, rendering text legibly, and
            consistently generating faces and people accurately. These are areas
            for future improvement.
          </p>

          <h2 className="text-xl font-semibold my-2">
            Open Source and Collaboration
          </h2>
          <p className="my-2">
            Stable Video Diffusion&apos;s code is available on{" "}
            <a
              href="https://github.com/Stability-AI/generative-models"
              title="Stable Video Diffusion GitHub"
            >
              GitHub
            </a>
            , and the weights needed to run the model locally can be found on{" "}
            <a
              href="https://huggingface.co/stabilityai/stable-video-diffusion-img2vid-xt"
              title="Stable Video Diffusion Hugging Face"
            >
              Hugging Face
            </a>
            . This open-source approach fosters collaboration and innovation
            within the developer community.
          </p>

          <h2 className="text-xl font-semibold my-2">Future Prospects</h2>
          <p className="my-2">
            Stability AI plans to build and extend upon these models, including
            a &quot;text-to-video&quot; interface. The ultimate goal is to
            evolve these models for broader, more commercial applications,
            expanding their impact and utility.
          </p>

          <h2 className="text-2xl font-bold my-3">Conclusion</h2>
          <p className="my-2">
            Stable Video Diffusion by Stability AI is not just a breakthrough in
            AI and video generation; it&apos;s a gateway to unlimited creative
            possibilities. As the technology matures, it promises to transform
            the landscape of video content creation, making it more accessible,
            efficient, and imaginative than ever before. For further details and
            technical insights, refer to Stability AI&apos;s{" "}
            <a
              href="https://stability.ai/research/stable-video-diffusion-scaling-latent-video-diffusion-models-to-large-datasets"
              title="Stable Video Diffusion Research Paper"
            >
              research paper
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export async function getStaticProps(context) {
  // extract the locale identifier from the URL
  const { locale } = context;

  return {
    props: {
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale)),
    },
  };
}
