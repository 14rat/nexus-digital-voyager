
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="font-rajdhani text-2xl font-bold">
              <span className="text-gradient">NEXUS</span>
            </div>
            <p className="text-gray-400">
              Explorando o futuro da tecnologia e as inovações que estão moldando o universo digital.
            </p>
          </div>
          
          {/* Links */}
          <div className="md:ml-auto md:mr-auto">
            <h3 className="font-bold mb-4 text-nexus-cyan">Navegação</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-nexus-cyan transition-colors">Início</a></li>
              <li><a href="#" className="text-gray-400 hover:text-nexus-cyan transition-colors">Tecnologias</a></li>
              <li><a href="#" className="text-gray-400 hover:text-nexus-cyan transition-colors">Linha do Tempo</a></li>
              <li><a href="#" className="text-gray-400 hover:text-nexus-cyan transition-colors">Inovações</a></li>
              <li><a href="#" className="text-gray-400 hover:text-nexus-cyan transition-colors">Contato</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-nexus-magenta">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="inline-block w-5 mr-2">📧</span> 
                contato@nexus.tech
              </li>
              <li className="text-gray-400">
                <span className="inline-block w-5 mr-2">📱</span>
                +55 (11) 9999-8888
              </li>
              <li className="text-gray-400">
                <span className="inline-block w-5 mr-2">🌎</span>
                São Paulo, Brasil
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Nexus. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
