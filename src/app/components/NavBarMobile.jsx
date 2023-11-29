import { useState } from 'react';
import MoreOptionsIcon from './MoreOptionsIcon.jsx';
import ButtonNavBar from './ButtonNavBar.jsx';
import ExitButton from './ExitButton.jsx';

export default function NavBarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button type="button" aria-label="más opciones" className="w-7 lg:hidden z-30" onClick={handleClick}>
        <MoreOptionsIcon />
      </button>
      <nav className={`flex flex-col items-center justify-center gap-4 fixed h-screen
        w-screen bg-gray-100 top-0 left-0 ${isOpen || 'left-[-100vh] opacity-0'} lg:hidden transition-all`}
      >
        <ButtonNavBar href="/sobre-nosotros">Sobre nosotros</ButtonNavBar>
        <ButtonNavBar href="/publicaciones">Publicaciones</ButtonNavBar>
        <ButtonNavBar href="/sobre-nosotros">Sobre nosotros</ButtonNavBar>
        <ButtonNavBar href="/publicaciones">Publicaciones</ButtonNavBar>
        <button type="button" aria-label="salir" className="w-9 mt-20" onClick={handleClick}>
          <ExitButton />
        </button>
      </nav>
    </>
  );
}
