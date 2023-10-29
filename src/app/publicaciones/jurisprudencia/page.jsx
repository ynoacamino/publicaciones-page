import PreviewBody from '@/app/components/PreviewBody';
import ArticleBox from '@/app/components/Publicaciones/ArticleBox';

export default function Jurisprudencia() {
  return (
    <>
      <PreviewBody />
      <div className="bg-gray-200 w-full flex flex-col justify-center items-center py-20 gap-10">
        <h1 className=" md:text-3xl w-9/12 text-center font-bold">
          Nuestras publicaciones de jurisprudencia
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 justify-around">
          <ArticleBox />
          <ArticleBox />
          <ArticleBox />
          <ArticleBox />
          <ArticleBox />
          <ArticleBox />
        </div>
      </div>
    </>
  );
}
