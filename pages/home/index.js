import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import s from "./home.module.scss";


const WebGLComponent = dynamic(() => import("../../components/webgl"), {
  ssr: false,
});
const TypewriterGSAP = dynamic(
  () =>
    import("../../components/TypewriterGSAP").then((mod) => mod.TypewriterGSAP),
  { ssr: false }
);
const AppearText = dynamic(
  () => import("../../components/appearText").then((mod) => mod.AppearText),
  { ssr: false }
);
const MarqueeImg = dynamic(
  () => import("../../components/MarqueeImg").then((mod) => mod.MarqueeImg),
  { ssr: false }
);
const VideoScroll = dynamic(
  () => import("../../components/VideoScroll").then((mod) => mod.VideoScroll),
  { ssr: false }
);


export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const section5 = document.getElementById("section5");
      const rect = section5.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isVisible) {
        document.body.style.transition = "background-color 1s";
        document.body.style.backgroundColor = "blue";
      } else {
        document.body.style.transition = "background-color 1s";
        document.body.style.backgroundColor = "";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      <div className={s.canvas}>
        <WebGLComponent />
      </div>
      <section
        id="section1"
        style={{ backgroundColor: "#f8b400", minHeight: "100vh" }}
      >
        <h1>¡Bienvenido a Next.js con pnpmbbb d!</h1>
        <p>Esta es una sección adicional en la página de inicio.</p>
        <p>Next.js es un framework poderoso para aplicaciones React.</p>
      </section>
      <section
        id="section2"
        className={s.text4}
        style={{ backgroundColor: "#4caf50", minHeight: "100vh" }}
      >
        <TypewriterGSAP text="¡Bienvenido a nuestra app de residencias de ancianos, donde el cuidado y el bienestar son nuestra prioridad!" />
      </section>

      <section
        id="section2"
        className={s.text4}
        style={{ backgroundColor: "#cccccc", minHeight: "100vh" }}
      >
        <AppearText text="¡Bienvenido a nuestra app de residencias de ancianos, donde el cuidado y el bienestar son nuestra prioridad!¡Bienvenido a nuestra app de residencias de ancianos, donde el cuidado y el bienestar son nuestra prioridad!" />
      </section>

      <section
        id="section3"
        className={s.section}
        style={{ backgroundColor: "#2196f3", minHeight: "100vh" }}
      >

        <MarqueeImg>
          <div className={s.isFlex} style={{ gap: "10px" }}>
            <div className={s.aspectRatio} data-param="200">
              sdfsdffdssdd
            </div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
          </div>
        </MarqueeImg>
        <MarqueeImg>
          <div className={s.isFlex} style={{ gap: "10px" }}>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
          </div>
        </MarqueeImg>
        <MarqueeImg>
          <div className={s.isFlex} style={{ gap: "10px" }}>
            <div className={s.aspectRatio} data-param="400">
              sdfsdffdssdd
            </div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
          </div>
        </MarqueeImg>
        <MarqueeImg>
          <div className={s.isFlex} style={{ gap: "10px" }}>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
            <div className={s.aspectRatio}>sdfsdffdssdd</div>
          </div>
        </MarqueeImg>
      </section>
      <section
        id="section4"
        className={s.section}
        style={{ backgroundColor: "#ff5722", minHeight: "100vh" }}
      >
        <p>Esta es una sección adicional en la página de inicio.</p>
        <p>Next.js es un framework poderoso para aplicaciones React.</p>

        <VideoScroll videoUrl="https://files.doclify.net/outloud-web-2023/media/826f6895-b935-4660-bdef-a6e1356418d4.mp4" />
      </section>
      <section
        id="section5"
        className={s.section}
        style={{ minHeight: "100vh" }}
      >
        <p>Esta es una sección adicional en la página de inicio.</p>
        <p>Next.js es un framework poderoso para aplicaciones React.</p>
      </section>
    </main>
  );
}
