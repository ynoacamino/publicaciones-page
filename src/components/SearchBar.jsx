'use client';

import { useMemo, useRef, useState } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import Link from 'next/link';

function AutocompleteItem({
  title, imgSrc, seccion, path,
}) {
  return (
    <Link
      href={`/publicaciones/${seccion.toLowerCase()}/${path}`}
      className="flex text-black md:flex-row flex-col gap-4 items-center justify-between hover:bg-gray-200 px-2 py-6 rounded-md"
    >
      <h3>
        {title}
      </h3>
      <img src={imgSrc} alt={title} width={150} height={150} className="aspect-video object-cover rounded-md" />
    </Link>
  );
}

export default function SearchBar() {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autocomplete = useMemo(() => createAutocomplete({
    placeholder: 'Buscar por palabra',
    onStateChange: ({ state }) => setAutocompleteState(state),
    getSources: () => [
      {
        sourceId: 'offers-next-api',
        getItems: ({ query }) => {
          if (query) return fetch(`/api/auth/article/search?q=${query}`).then((res) => res.json());
          return [];
        },
      },
    ],
  }), []);

  // const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <form
      className="flex justify-center z-20 w-full text-black flex-col"
      {...formProps}
    >
      <input
        type="text"
        className="flex-1 py-3 pl-6 rounded-2xl bg-white text-base focus:outline-none shadow-lg z-40"
        {...inputProps}
      />
      {
        autocompleteState.isOpen && (
          <div className="p-2 pt-6 pr-0 bg-white rounded-b-lg w-full max-h-[60vh]">
            <div
              className="overflow-y-scroll max-h-[55vh]"
              ref={panelRef}
              {...autocomplete.getPanelProps()}
            >
              {autocompleteState.collections.map((collection) => {
                const { items } = collection;
                return (
                  <section key={crypto.randomUUID()} className="">
                    {
                      items.length > 0 && (
                        <ul {...autocomplete.getListProps} className="flex flex-col">
                          {
                            items[0].results.map((item) => (
                              <AutocompleteItem
                                key={item.title}
                                title={item.title}
                                imgSrc={item.imgSrc}
                                seccion={item.seccion}
                                path={item.path}
                              />
                            ))
                          }
                        </ul>
                      )
                    }
                  </section>
                );
              })}
            </div>
          </div>
        )
      }
    </form>
  );
}
