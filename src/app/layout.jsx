import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Roboto_Slab } from 'next/font/google';
import NextAuth from './providers/NextAuth';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

export const metadata = {
  title: 'Abogado Miguel Salinas',
  description: 'En Legalia, nuestra firma de abogados está comprometida con la excelencia jurídica. Con años de experiencia en diversas áreas del derecho, ofrecemos soluciones legales efectivas y personalizadas. Nuestro equipo de profesionales altamente calificados aborda casos con pasión y dedicación, asegurando representación legal de la más alta calidad. Desde litigios civiles hasta asesoramiento corporativo.',
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
    images: ['https://cdn.discordapp.com/attachments/772232222220615710/1169312451356000327/image.png?ex=6554f215&is=65427d15&hm=30ab9dfe935b6461ab9a5751595aa3b3fe62cb62b44579ca9e2c986d24013c41&'],
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
          <div className="w-full flex flex-col justify-between h-full bg-[#fbfafb] min-h-screen">
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
