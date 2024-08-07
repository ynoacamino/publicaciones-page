import ButtonLink from './ButtonLink';

export default function PreviewBody({
  imgSrc, title, seccion, preview,
}) {
  return (
    <header className="w-full flex relative overflow-hidden justify-center">
      <img
        src={imgSrc}
        alt={title}
        className="absolute w-full top-50 object-cover h-full brightness-50"
      />
      <div className="z-10 flex flex-col gap-4 items-start justify-end w-full mt-28 lg:w-4/6 text-white p-10 lg:m-10 lg:mt-40">
        <ButtonLink color="danger" path={`/publicaciones/${seccion}/page/1`}>
          <strong>{seccion.substring(0, 1).toUpperCase() + seccion.substring(1)}</strong>
        </ButtonLink>
        <h1 className="text-3xl font-bold">
          {title}
        </h1>
        <summary>
          {preview}
        </summary>
      </div>
    </header>
  );
}
