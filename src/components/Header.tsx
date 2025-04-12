import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from './AuthContext';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="w-full py-4 px-4 bg-black/50 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="flex items-center gap-2 hover:text-orange-400 cursor-pointer transition-all hover:scale-105 active:scale-95"
        >
          <Image
            src="/images/torch.png"
            alt="Pytch Logo"
            width={24}
            height={24}
          />
          <span className="text-2xl font-bold">Pytch</span>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            {user && (
              <Link
                href="/pricing"
                className="text-gray-300 hover:text-orange-400 transition-colors"
              >
                Pricing
              </Link>
            )}
            <Link
              href={user ? "/profile" : "/"}
              className="flex items-center space-x-2 bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 px-4 py-2 rounded-lg transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                {user ? user.email?.[0].toUpperCase() : 'S'}
              </div>
              <span>{user ? 'Profile' : 'Sign In'}</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
} 