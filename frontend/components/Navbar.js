import Link from 'next/link';
import { MdOutlineDashboard, MdHistory, MdSettings, MdMenu } from 'react-icons/md';

const NavItem = ({ href, icon: Icon, label }) => (
  <Link href={href} className="flex items-center space-x-2 p-2 hover:bg-slate-700 rounded-lg transition duration-200">
    <Icon className="w-5 h-5 text-indigo-400" />
    <span className="hidden md:inline text-sm font-medium">{label}</span>
  </Link>
);

export default function Navbar() {
  return (
    <nav className="card-bg shadow-lg backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
                AI Canvas
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <NavItem href="/" icon={MdOutlineDashboard} label="Dashboard" />
              <NavItem href="/categories" icon={MdMenu} label="Categories" />
              <NavItem href="/history" icon={MdHistory} label="Post History" />
              <NavItem href="/settings" icon={MdSettings} label="Settings" />
            </div>
          </div>
          
          {/* Mobile Menu Button (Optional) */}
          <div className="-mr-2 flex sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
                <MdMenu className="block h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Items would go here */}
    </nav>
  );
}