import React, { useState } from 'react';
// 1. Importar useLocation
import { useNavigate, useLocation } from 'react-router-dom'; 
import LogoChama from '../assets/icone.svg'; 

const VerificacaoCodigo: React.FC = () => {
    const navigate = useNavigate();
    
    // 2. Receber o e-mail do state da rota
    const location = useLocation();
    const emailDaRota = location.state?.email; // Captura o valor passado em EsqueciSenha
    
    // 3. Usar o email real, com um fallback para o e-mail de exemplo caso a rota seja acessada diretamente.
    const emailParaExibir = emailDaRota || "soro.admin@gmail.com"; 

    // Estado para armazenar o código de 4 dígitos
    const [codigo, setCodigo] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState('');
  
    // Função para lidar com a mudança nos campos de input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const value = e.target.value;
    
      // Limita a entrada a um dígito por campo
      if (value.length > 1) return;

      const novoCodigo = [...codigo];
      novoCodigo[index] = value;
      setCodigo(novoCodigo);

      // Mover o foco para o próximo input se um dígito foi inserido
      if (value && index < codigo.length - 1) {
        document.getElementById(`codigo-${index + 1}`)?.focus();
      }
    
      // Assegura que e.nativeEvent seja tratado como InputEvent para acessar inputType
      const nativeEvent = e.nativeEvent as InputEvent; 
    
      // Se apagar (Backspace/Delete), move o foco para o input anterior
      if (!value && index > 0 && nativeEvent.inputType === 'deleteContentBackward') {
          document.getElementById(`codigo-${index - 1}`)?.focus();
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const codigoCompleto = codigo.join('');
    
      if (codigoCompleto.length < 4) {
        setMensagem('❌ Por favor, preencha todos os 4 dígitos do código.');
        return;
      }
    
      setLoading(true);
      setMensagem('');
    
      // Lógica de verificação de código REAL virá aqui (chamar o backend)
      setTimeout(() => {
          setLoading(false);
          if (codigoCompleto === '1234') { // Simulação de código correto
              setMensagem('✅ Código verificado com sucesso! Redirecionando para Nova Senha...');
              // Próximo passo real: navigate('/nova-senha');
              alert("Código Correto! Próxima Tela: Nova Senha.");
          } else {
              setMensagem('❌ Código inválido. Tente novamente.');
          }
      }, 2000);
    };

    return (
      <div className="flex h-screen bg-white">
      
        {/* 1. Coluna da Esquerda (Layout Lateral) */}
        <div className="hidden lg:flex flex-col justify-center items-center w-full lg:w-1/2 p-8 
                      bg-[#CCD8FF] rounded-tr-[100px]"> 
          {/* Conteúdo S.O.R.O. */}
          <div className="text-center">
                <div className="mx-auto flex items-center justify-center">
                    <img 
                        src={LogoChama} 
                        alt="Logo S.O.R.O" 
                        className="h-28 w-28 mb-4" 
                    />
                </div>
              <h1 className="text-6xl font-extrabold text-[#1a2b5e] mt-4 tracking-tight">S.O.R.O</h1>
              <hr className="w-20 h-0.5 mx-auto bg-gray-400 border-0 rounded my-4" />
              <p className="text-xl text-[#1a2b5e] font-normal max-w-sm mx-auto">
                  Sistema Organizacional para Registros de Ocorrências
              </p>
          </div>
        </div>

        {/* 2. Coluna da Direita (Formulário de Verificação) */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-white">
          <div className="w-full max-w-sm mx-auto"> 
            
              {/* Ícone do Envelope: SVG DO FIGMA SUBSTITUÍDO */}
              <div className="mx-auto w-fit text-center mb-4">
                  <svg width="65" height="50" viewBox="0 0 65 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-16 text-gray-900">
                      <path d="M62.5 0H2.5C1.83696 0 1.20107 0.263393 0.732233 0.732234C0.263392 1.20107 0 1.83696 0 2.5V45C0 46.3261 0.526784 47.5979 1.46447 48.5355C2.40215 49.4732 3.67392 50 5 50H60C61.3261 50 62.5979 49.4732 63.5355 48.5355C64.4732 47.5979 65 46.3261 65 45V2.5C65 1.83696 64.7366 1.20107 64.2678 0.732234C63.7989 0.263393 63.163 0 62.5 0ZM56.0719 5L32.5 26.6094L8.92813 5H56.0719ZM60 45H5V8.18438L30.8094 31.8437C31.2706 32.2671 31.8739 32.5021 32.5 32.5021C33.1261 32.5021 33.7294 32.2671 34.1906 31.8437L60 8.18438V45Z" fill="currentColor"/> 
                  </svg>
              </div>

            <h2 className="text-xl font-semibold text-gray-900 text-center">
              Confira sua caixa de mensagens
            </h2>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Por favor abra o link e verifique o código de verificação
              <br />
              enviado para o email
            </p>
          
            {/* Email a ser verificado - Usando a nova variável */}
            <p className="mt-2 text-sm font-semibold text-center text-gray-900">
              {emailParaExibir} 
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            
              {/* Campos de Código (OTP) */}
              <div className="flex justify-center space-x-4">
                {codigo.map((digit, index) => (
                  <input
                    key={index}
                    id={`codigo-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50]"
                    required
                  />
                ))}
              </div>

              {/* Mensagem de sucesso/erro */}
              {mensagem && (
                  <p className={`text-sm pt-2 ${mensagem.startsWith('✅') ? 'text-green-600' : 'text-red-600'} text-center`}>
                      {mensagem}
                  </p>
              )}
            
              {/* Link para reenvio */}
              <div className="text-sm text-center">
                  <a href="#" className="font-medium text-gray-500 hover:text-[#1a2b5e]">
                      Reenviar código (60s)
                  </a>
              </div>

              {/* Botão de Recuperar senha */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                           bg-[#4CAF50] hover:bg-[#43a047] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50] disabled:opacity-50"
                >
                  {loading ? 'Verificando...' : 'Recuperar senha'}
                </button>
              </div>
            </form>

            {/* Rodapé e Informações de Versão */}
            <div className="mt-10 pt-6 border-t border-gray-200 text-center">
               <p className="text-sm text-[#4CAF50] font-semibold flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-[#4CAF50] mr-2"></span>
                  Conexão segura e criptografada
              </p>
              <p className="mt-3 text-xs text-gray-500">
                  © 2025 S.O.R.O - Sistema Organizacional de Registros de Ocorrências
              </p>
              <p className="text-xs text-gray-500">
                  Versão 2.0.0 - Todos os Direitos Reservados
              </p>
            </div>

          </div>
        </div>
      </div>
    );
};

export default VerificacaoCodigo;