// Este ficheiro contém a lógica para gerar o HTML do novo template.

// Função para gerar o HTML de cada serviço
const createServiceHTML = (service) => `
  <div class="bg-[#282828] p-6 rounded-lg border border-transparent hover:border-[#bb9978] transition-colors duration-300 reveal-card">
    <h3 class="text-xl font-bold mb-2">${service.title}</h3>
    <p class="text-gray-400 text-sm">${service.description}</p>
  </div>
`;

// Função para gerar o HTML de cada pergunta frequente (FAQ)
const createFaqHTML = (faq, index) => `
  <div class="py-5 border-b border-gray-700 reveal-card" data-index="${index}">
    <details class="group">
      <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
        <span>${faq.question}</span>
        <span class="transition group-open:rotate-180">
          <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
        </span>
      </summary>
      <p class="text-gray-400 mt-3 group-open:animate-fadeIn">
        ${faq.answer}
      </p>
    </details>
  </div>
`;

// Função principal que gera o HTML completo da página
export const generateGerginPageHTML = (data) => {
    // Usar dados reais ou placeholders
    const heroVideoUrl = data.heroVideoUrl || "https://videos.pexels.com/video-files/8186214/8186214-hd_1280_720_25fps.mp4";
    const aboutImageUrl = data.aboutImageUrl || "https://placehold.co/600x800/282828/bb9978?text=Sua+Foto";

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name || 'Portfólio de Fotografia'}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/scrollreveal@4.0.9/dist/scrollreveal.min.js"></script>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #161616; color: #fff; }
        .font-heading { font-family: 'Sora', sans-serif; }
        .marquee-content { animation: marquee 30s linear infinite; }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .group-open\\:animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
    </style>
</head>
<body class="overflow-x-hidden">

    <!-- Hero Section -->
    <section id="home" class="h-screen w-full relative flex items-center justify-center text-center overflow-hidden">
        <div class="absolute inset-0 z-0 bg-black/60"></div>
        <video autoplay loop muted playsinline class="absolute z-[-1] w-full h-full object-cover">
            <source src="${heroVideoUrl}" type="video/mp4">
            O seu navegador não suporta o vídeo de fundo.
        </video>
        <div class="z-10 px-4">
            <h1 class="font-heading text-5xl md:text-8xl font-bold reveal-up">${data.name || 'Nome do Fotógrafo'}</h1>
            <p class="mt-4 text-lg md:text-xl text-gray-300 reveal-up" data-sr-delay="200">${data.slogan || 'Frase de impacto sobre o seu trabalho'}</p>
            <a href="#contato" class="mt-8 inline-block bg-[#bb9978] text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-300 hover:scale-105 reveal-up" data-sr-delay="400">
                Fale Comigo
            </a>
        </div>
    </section>

    <!-- Marquee Section -->
    <div class="relative flex overflow-x-hidden bg-black py-4">
        <div class="py-2 animate-marquee whitespace-nowrap flex">
            ${(data.marqueeTexts || ['ensaio fotográfico', 'casamento', 'retrato corporativo', 'eventos', 'newborn']).map(text => `
                <span class="text-xl mx-4 font-heading">${text.toUpperCase()}</span>
                <span class="text-[#bb9978] mx-4">*</span>
            `).join('')}
        </div>
        <div class="absolute top-0 py-2 animate-marquee2 whitespace-nowrap flex">
             ${(data.marqueeTexts || ['ensaio fotográfico', 'casamento', 'retrato corporativo', 'eventos', 'newborn']).map(text => `
                <span class="text-xl mx-4 font-heading">${text.toUpperCase()}</span>
                <span class="text-[#bb9978] mx-4">*</span>
            `).join('')}
        </div>
    </div>
    
    <main class="container mx-auto px-6 py-16 md:py-24 space-y-24 md:space-y-32">

        <!-- Services Section -->
        <section id="servicos">
            <div class="text-center mb-12">
                <h2 class="font-heading text-4xl md:text-5xl font-bold reveal-fade">Serviços</h2>
                <p class="text-gray-400 mt-2 reveal-fade" data-sr-delay="200">Soluções fotográficas para cada necessidade.</p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${(data.services || [
                    {title: 'Retratos', description: 'Sessões individuais, de casais ou família para capturar a sua essência.'},
                    {title: 'Casamentos', description: 'Cobertura completa do seu grande dia, dos preparativos à festa.'},
                    {title: 'Eventos', description: 'Registo profissional de eventos corporativos, festas e lançamentos.'},
                ]).map(createServiceHTML).join('')}
            </div>
        </section>

        <!-- About Section -->
        <section id="sobre" class="grid md:grid-cols-2 gap-12 items-center">
            <div class="reveal-left">
                <img src="${aboutImageUrl}" alt="Foto de ${data.name}" class="w-full h-auto object-cover rounded-lg shadow-2xl">
            </div>
            <div class="reveal-right">
                <h2 class="font-heading text-4xl md:text-5xl font-bold mb-6">Sobre Mim</h2>
                <div class="text-lg text-gray-300 space-y-4">${(data.about || 'Fale sobre a sua paixão pela fotografia, a sua história e o que o torna único.').split('\\n').map(p => `<p>${p}</p>`).join('')}</div>
            </div>
        </section>

        <!-- Gallery Section -->
        <section id="galeria">
             <div class="text-center mb-12">
                <h2 class="font-heading text-4xl md:text-5xl font-bold reveal-fade">Galeria</h2>
                <p class="text-gray-400 mt-2 reveal-fade" data-sr-delay="200">Uma amostra do meu trabalho.</p>
            </div>
            <div class="columns-2 md:columns-3 gap-4 space-y-4">
                 ${(data.galleryPhotoUrls || []).map(p => `
                    <div class="overflow-hidden rounded-lg shadow-lg reveal-card">
                        <img src="${p.url}" alt="Foto da galeria" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300">
                    </div>
                `).join('')}
            </div>
        </section>

        <!-- FAQ Section -->
        <section id="faq">
            <div class="text-center mb-12">
                <h2 class="font-heading text-4xl md:text-5xl font-bold reveal-fade">Perguntas Frequentes</h2>
            </div>
            <div class="max-w-3xl mx-auto">
                 ${(data.faqs || [
                    {question: 'Como funciona o processo de agendamento?', answer: 'O processo é simples! Primeiro, entre em contato através do formulário abaixo. Vamos conversar sobre as suas ideias e, em seguida, marcamos uma data que funcione para ambos.'},
                    {question: 'Em quanto tempo as fotos são entregues?', answer: 'O prazo de entrega padrão é de 15 dias úteis. Você receberá um link para uma galeria online privada para ver, descarregar e partilhar as suas fotos.'},
                 ]).map(createFaqHTML).join('')}
            </div>
        </section>
        
    </main>
    
    <!-- CTA Section -->
    <section id="contato" class="bg-[#202020] text-white py-20 text-center">
        <div class="container mx-auto px-6 reveal-up">
            <h2 class="text-4xl md:text-5xl font-heading font-bold mb-4">Vamos criar algo incrível juntos?</h2>
            <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Estou pronto para transformar os seus momentos em memórias inesquecíveis. Entre em contato para um orçamento.</p>
            <a href="https://wa.me/55${(data.whatsapp || '').replace(/\D/g, '')}?text=Olá! Vi o seu site e gostaria de um orçamento." target="_blank" class="bg-[#bb9978] text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform duration-300 inline-block hover:scale-105">
                Fale Comigo no WhatsApp
            </a>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black text-gray-400 py-8">
        <div class="container mx-auto px-6 text-center">
             <div class="flex justify-center items-center space-x-6 mb-4">
                ${data.instagram ? `<a href="https://instagram.com/${data.instagram}" target="_blank" class="text-gray-400 hover:text-white transition">Instagram</a>` : ''}
                ${data.facebook ? `<a href="${data.facebook}" target="_blank" class="text-gray-400 hover:text-white transition">Facebook</a>` : ''}
            </div>
            <p>&copy; ${new Date().getFullYear()} ${data.name || 'Nome do Fotógrafo'}. Todos os direitos reservados.</p>
        </div>
    </footer>

    <script>
        const sr = ScrollReveal({
            distance: '50px',
            duration: 1500,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false
        });
        sr.reveal('.reveal-up', { origin: 'bottom' });
        sr.reveal('.reveal-fade', { opacity: 0, distance: '0px' });
        sr.reveal('.reveal-left', { origin: 'left' });
        sr.reveal('.reveal-right', { origin: 'right' });
        sr.reveal('.reveal-card', { origin: 'bottom', interval: 100 });
    <\/script>
</body>
</html>`;
};
