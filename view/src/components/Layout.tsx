import React from 'react';
import { NavLink } from 'react-router-dom';

// Ícones simples (idealmente, use react-icons)
const IconExplore = () => <span>🌍</span>;
const IconDiary = () => <span>📖</span>;
const IconAdd = () => <span>➕</span>;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center p-2 rounded-lg ${
      isActive ? 'text-blue-500 bg-blue-100' : 'text-gray-600'
    }`;

  return (
    <div className="flex flex-col h-screen">
      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
        {children}
      </main>

      {/* Navegação Fixa (Bottom Tab Bar) */}
      <nav className="sticky bottom-0 w-full bg-white shadow-t-lg border-t border-gray-200">
        <div className="flex justify-around max-w-lg mx-auto p-2">
          <NavLink to="/" className={navLinkClass}>
            <IconExplore /> <span className="text-xs">Explorar</span>
          </NavLink>
          <NavLink to="/diary" className={navLinkClass}>
            <IconDiary /> <span className="text-xs">Meu Diário</span>
          </NavLink>
          <NavLink to="/add" className={navLinkClass}>
            <IconAdd /> <span className="text-xs">Adicionar</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Layout;