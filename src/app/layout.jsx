import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Roboto_Slab } from 'next/font/google';
import NextAuth from './providers/NextAuth';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

export const metadata = {
  title: 'Abogado Miguel Salinas',
  description: 'Comprometido con el desarrollo del derecho en base al estudio y el ejercicio de la profesión. Compartimos nuestra página de estudio con fines exclusivamente académicos, no se ofrece ningún servicio.',
  generator: 'Next.js',
  keywords: ['Arequipa', 'Abogacia', 'Derecho', 'legal'],
  creator: 'Yenaro Joel Noa Camino',
  authors: [{ name: 'Carlos Miguel Salinas Vargas' }],
  publisher: 'Carlos Miguel Salinas Vargas',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/logo.svg',
  },
  openGraph: {
    images: ['https://cdn.discordapp.com/attachments/772232222220615710/1170355316253265920/image.png?ex=6558bd53&is=65464853&hm=b33655c138accea99a40e5e523d5cbd642cdd423e923cfc874a1e04b382e01a7&'],
  },
};

const roboto = Roboto_Slab({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NextAuth>
          <div className="w-full flex flex-col justify-between h-full bg-[#fbfafb] min-h-screen relative">
            <NavBar />
            <main className="w-full flex flex-col justify-start items-start">
              {children}
            </main>
            <Footer />
          </div>
        </NextAuth>
      </body>
    </html>
  );
}
