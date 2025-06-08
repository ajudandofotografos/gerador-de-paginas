export const generateLandingPageHTML = (data) => {
    const mainCoverUrl = data.coverPhotoUrls[data.mainCoverIndex]?.url || 'https://placehold.co/1920x1080/e2e8f0/334155?text=Capa+Principal';
    const aboutPhotoUrl = data.galleryPhotoUrls[0]?.url || 'https://placehold.co/600x800/e2e8f0/334155?text=Foto+Sobre';

    const testimonialsHTML = data.testimonials.map(t => `
        <div class="bg-white/90 backdrop-blur-sm p-8 ${data.borderStyle} shadow-lg text-center text-gray-800">
            <p class="italic">"${t.text}"</p>
            <p class="mt-4 font-bold" style="color: #663b22;">- ${t.name}</p>
        </div>
    `).join('') || '<p class="text-center col-span-full text-white">Ainda não há depoimentos.</p>';

    const workflowHTML = data.workflow.split('\n').map(line => line.trim()).filter(line => line).map(line => `<p class="mb-2">${line}</p>`).join('');
    
    const galleryHTML = data.galleryPhotoUrls.map(p => `
        <div class="w-full ${data.borderStyle} overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
            <img src="${p.url}" alt="Foto da galeria" class="w-full h-full object-cover">
        </div>
    `).join('');
    
    const socialLinksHTML = `
        ${data.instagram ? `<a href="https://instagram.com/${data.instagram}" target="_blank" class="text-gray-400 hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a>` : ''}
        ${data.facebook ? `<a href="https://facebook.com/${data.facebook}" target="_blank" class="text-gray-400 hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>` : ''}
        ${data.whatsapp ? `<a href="https://wa.me/55${data.whatsapp.replace(/\D/g, '')}" target="_blank" class="text-gray-400 hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></a>` : ''}
    `;

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name}</title>
    <script src="https://cdn.tailwindcss.com/3.4.1"><\/script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/scrollreveal@4.0.9/dist/scrollreveal.min.js"><\/script>
    <style>
        body { font-family: 'Poppins', sans-serif; scroll-behavior: smooth; background-color: #f8fafc; color: #1f2937; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .hero {
            background-image: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url('${mainCoverUrl}');
        }
        .cta-button {
            background-color: ${data.primaryColor};
            box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.25);
            color: white;
        }
        .cta-button:hover {
             filter: brightness(1.1);
             transform: translateY(-2px);
        }
        .section-title {
            position: relative;
            padding-bottom: 0.5rem;
            display: inline-block;
        }
        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 3px;
            background-color: ${data.primaryColor};
        }
    </style>
</head>
<body>
    <section class="hero h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white text-center p-4">
        ${data.logoUrl ? `<img src="${data.logoUrl}" alt="Logo" class="max-h-24 mb-6 reveal-up">` : `<h1 class="text-4xl md:text-6xl font-serif font-bold reveal-up">${data.name}</h1>`}
        <h2 class="text-xl md:text-3xl mt-4 font-light max-w-3xl reveal-up" style="animation-delay:200ms;">${data.slogan}</h2>
        <a href="#contact" class="cta-button font-bold py-4 px-10 text-lg ${data.borderStyle} mt-10 transition-all duration-300 reveal-up" style="animation-delay:400ms;">Peça seu Orçamento</a>
    </section>
    <main class="container mx-auto px-6 py-16 md:py-24 space-y-24">
        <section id="about" class="grid md:grid-cols-2 gap-12 items-center">
            <div class="reveal-left">
                <img src="${aboutPhotoUrl}" alt="Foto de ${data.name}" class="w-full h-auto object-cover ${data.borderStyle} shadow-2xl">
            </div>
            <div class="reveal-right">
                <h2 class="text-3xl md:text-4xl font-serif font-bold mb-6">Sobre Mim</h2>
                <div class="text-lg text-gray-600 space-y-4">${data.about.split('\n').map(p => `<p>${p}</p>`).join('')}</div>
            </div>
        </section>
        <section id="workflow" class="text-center reveal-up">
            <h2 class="text-3xl md:text-4xl font-serif font-bold mb-12 section-title">Como Funciona</h2>
            <div class="max-w-3xl mx-auto text-lg text-gray-600">${workflowHTML}</div>
        </section>
        <section id="testimonials" class="py-16 bg-fixed bg-cover bg-center" style="background-image:url('${data.coverPhotoUrls[1]?.url || mainCoverUrl}');">
            <div class="bg-gray-800/50 backdrop-blur-sm py-16">
                 <div class="container mx-auto px-6">
                    <h2 class="text-3xl md:text-4xl font-serif font-bold mb-12 text-center text-white section-title" style="text-shadow:1px 1px 3px rgba(0,0,0,0.5);">O que dizem meus clientes</h2>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-fade">${testimonialsHTML}</div>
                 </div>
            </div>
        </section>
        <section id="gallery" class="reveal-up">
            <h2 class="text-3xl md:text-4xl font-serif font-bold mb-12 text-center section-title">Galeria</h2>
            <div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">${galleryHTML}</div>
        </section>
    </main>
    <section id="contact" class="bg-[#202020] text-white py-20 text-center">
        <div class="container mx-auto px-6 reveal-up">
            <h2 class="text-3xl md:text-4xl font-serif font-bold mb-4">Pronto para criar memórias incríveis?</h2>
            <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Entre em contato e vamos conversar sobre como posso transformar seus momentos em arte.</p>
            <a href="https://wa.me/55${data.whatsapp.replace(/\D/g, '')}?text=Olá! Vi seu site e gostaria de um orçamento." target="_blank" class="cta-button font-bold py-4 px-10 text-lg ${data.borderStyle} transition-all duration-300 inline-block">Fale Comigo no WhatsApp</a>
        </div>
    </section>
    <footer class="bg-black text-gray-400 py-8">
        <div class="container mx-auto px-6 text-center">
            <div class="flex justify-center items-center space-x-6 mb-4">${socialLinksHTML}</div>
            <p>&copy; ${new Date().getFullYear()} ${data.name}. Todos os direitos reservados.</p>
            <p class="text-xs mt-2 opacity-50">Página gerada por Fotógrafo Pro Page</p>
        </div>
    </footer>
    <script>
        // O script do ScrollReveal será executado aqui
    <\/script>
</body>
</html>`;
};
