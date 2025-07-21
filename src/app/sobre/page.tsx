import React from 'react';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-primary-700 mb-4">Sobre a Valentina Shoes</h1>
        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&h=300&fit=crop&auto=format"
          alt="Equipe Valentina Shoes"
          className="w-full h-48 object-cover rounded mb-6"
        />
        <p className="text-lg text-gray-700 mb-4">
          A <span className="font-semibold text-primary-700">Valentina Shoes</span> nasceu da paixão por moda, conforto e autenticidade. Nossa missão é oferecer calçados, bolsas e acessórios que unem qualidade, estilo e preço justo, proporcionando experiências únicas para cada cliente.
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li><span className="font-semibold text-primary-700">Missão:</span> Inspirar confiança e autoestima através de produtos que valorizam o bem-estar e a personalidade de cada pessoa.</li>
          <li><span className="font-semibold text-primary-700">Valores:</span> Ética, respeito, inovação, atendimento humanizado e compromisso com a satisfação do cliente.</li>
          <li><span className="font-semibold text-primary-700">Diferenciais:</span> Frete grátis acima de R$ 199, devolução fácil, atendimento ágil e produtos selecionados com rigor.</li>
        </ul>
        <p className="text-gray-600">
          Obrigado por fazer parte da nossa história! Conte sempre com a Valentina Shoes para caminhar ao seu lado.
        </p>
      </div>
    </div>
  );
} 