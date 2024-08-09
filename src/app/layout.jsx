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
    images: ['https://cdn.discordapp.com/attachments/1110352472993710123/1179769630143807488/image_1.png?ex=657afd16&is=65688816&hm=3c65c0bc7198a56d172e89b585c91453f386eda299f0b3993602bff458163a59&'],
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
