import ButtonLink from './components/ButtonLink';

export default function NotFound() {
  return (
    <div className="w-full flex justify-center items-center py-32">
      <div className="text-3xl p-4 rounded-md bg-gray-200">
        <h2>Pagina no encontrada</h2>
        <p>Porfavor regresa a la pagina principal</p>
        <ButtonLink path="/">Retornar</ButtonLink>
      </div>
    </div>
  );
}
