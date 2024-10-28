export default function About() {
  return (
    <section className="w-full flex flex-col px-6 items-center justify-start font-sans py-20 gap-10 shadow-lg border-b-2 border-b-zinc-500/40">
      <h1 className="flex flex-col font-bold gap-2 items-center">
        <span className="text-2xl md:text-5xl w-full max-w-3xl text-center">
          EL DERECHO SE TRANSFORMA DÍA A DÍA,
        </span>
        <span className="text-4xl md:text-7xl ">
          PREPARÉMONOS.
        </span>
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl w-full max-w-4xl text-center">
        La finalidad de este espacio web es el estudio del derecho desde una perspectiva práctica
        teniendo como referencia el análisis de la jurisprudencia nacional
      </p>
      <img
        src="/logo.png"
        alt="logo"
        width="200"
        height="200"
      />
    </section>
  );
}
