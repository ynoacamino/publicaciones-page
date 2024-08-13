import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import NextAuth from '@/components/providers/NextAuth';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { cn } from '@/lib/utils';
import ProgressBarProvider from '@/components/providers/ProgressBarProvider';

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
    images: ['https://res.cloudinary.com/dazt6g3o1/image/upload/v1723512351/nau2wsii0ljzyc23ykds.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn('bg-background')}>
        <NextAuth>
          <ProgressBarProvider>
            <div className="w-full flex flex-col justify-between h-full bg-background min-h-screen relative">
              <NavBar />
              <main className="w-full flex flex-col justify-start items-start flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ProgressBarProvider>
        </NextAuth>
      </body>
    </html>
  );
}
