import PreviewBody from './PreviewBody';
import ArticleBody from './ArticleBody';
import ArticleAside from './ArticleAside';

export default function ArticleContent({
  imgSrc,
  title,
  seccion,
  preview,
  link,
  titleBody,
  body,
  pdfs,
  videoUrl,
  autorName,
  autorImg,
  autorPosition,
  autorFacebook,
  path,
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <PreviewBody
        imgSrc={imgSrc}
        title={title}
        seccion={seccion}
        preview={preview}
      />
      {
        (link && link.startsWith('https://www.youtube.com')) && (
          <aside className="w-11/12 md:w-7/12 grid grid-cols-4 gap-8 py-20 items-start">
            <iframe
              className="w-[300px] sm:w-[400px] md:w-[600px] xl:w-[1000px] aspect-video"
              src={link}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </aside>
        )
      }
      {
        videoUrl && (
          <video width="640" height="640" controls className="w-full max-w-7xl mx-10 my-10 h-auto border-2 border-zinc-300 shadow-lg">
            <source src={videoUrl} type="video/mp4" />
            <track kind="captions" src="captions.vtt" label="Espanish" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        )
      }
      <div className="w-full max-w-7xl grid lg:grid-cols-3 gap-10 px-6 my-20">
        <ArticleBody
          autorFacebook={autorFacebook}
          autorImg={autorImg}
          autorName={autorName}
          autorPosition={autorPosition}
          body={body}
          pdfs={pdfs}
          path={path}
          seccion={seccion}
          titleBody={titleBody}
        />
        <ArticleAside />
      </div>
    </div>
  );
}
