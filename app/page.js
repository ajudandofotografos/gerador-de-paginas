'use client';
import React, { useState, useEffect } from 'react';
import { Sparkles, Palette, UserCircle, Image as ImageIcon, GalleryVertical, Contact, UploadCloud, PlusCircle, BrainCircuit, Wand2 } from 'lucide-react';

// --- STYLES (can be moved to a separate CSS file) ---
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    body {
      font-family: 'Poppins', sans-serif;
      scroll-behavior: smooth;
      background-color: #161616;
      color: #ffffff;
    }
    .image-preview-item {
      position: relative;
      overflow: hidden;
      border-radius: 0.75rem;
    }
    .image-preview-item .overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.6);
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.3s ease;
    }
    .image-preview-item:hover .overlay {
      opacity: 1;
    }
    .image-preview-item .overlay button {
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.5);
      padding: 4px 8px;
      border-radius: 5px;
      font-size: 12px;
      cursor: pointer;
      margin-top: 5px;
      transition: all 0.2s ease;
    }
    .image-preview-item .overlay button:hover {
      background: rgba(255,255,255,0.9);
      color: black;
    }
    .main-cover-indicator {
      position: absolute;
      top: 8px;
      right: 8px;
      background-color: #f59e0b;
      color: white;
      padding: 4px;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .form-section {
      scroll-margin-top: 120px;
    }
    .focus\\:ring-custom:focus {
      --tw-ring-color: #bb9978;
    }
    #custom-modal .transform {
        transition: transform 0.3s ease-out, opacity 0.3s ease-out;
    }
    #custom-modal.hidden .transform {
        transform: scale(0.95);
        opacity: 0;
    }
  `}}/>
);

// --- HELPER FUNCTIONS & MOCK DATA ---
const niches = [
  "Casamentos", "Ensaios (Gestante, Família)", "Newborn (Recém-nascido)", "Eventos Sociais (Aniversários)",
  "Retratos", "Moda", "Fotografia de Produto", "Gastronomia", "Arquitetura e Interiores",
  "Pets", "Esportes", "Viagens e Paisagens", "Drones / Aérea", "Corporativo"
];

const generateLandingPageHTML = (data) => {
    // This function remains largely the same, generating the final HTML string.
    // In a real Next.js app, this would be a separate React component with dynamic routing.
    const mainCoverUrl = data.coverPhotos[data.mainCoverIndex]?.src || 'https://placehold.co/1920x1080/e2e8f0/334155?text=Capa+Principal';
    const aboutPhotoUrl = data.galleryPhotos[0]?.src || 'https://placehold.co/600x800/e2e8f0/334155?text=Foto+Sobre';

    const testimonialsHTML = data.testimonials.map(t => `
        <div class="bg-white/90 backdrop-blur-sm p-8 ${data.borderStyle} shadow-lg text-center text-gray-800">
            <p class="italic">"${t.text}"</p>
            <p class="mt-4 font-bold" style="color: #663b22;">- ${t.name}</p>
        </div>
    `).join('') || '<p class="text-center col-span-full text-white">Ainda não há depoimentos.</p>';

    const workflowHTML = data.workflow.split('\n').map(line => line.trim()).filter(line => line).map(line => `<p class="mb-2">${line}</p>`).join('');
    
    const galleryHTML = data.galleryPhotos.map(p => `
        <div class="w-full ${data.borderStyle} overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
            <img src="${p.src}" alt="Foto da galeria" class="w-full h-full object-cover">
        </div>
    `).join('');
    
    const socialLinksHTML = `
        ${data.instagram ? `<a href="https://instagram.com/${data.instagram}" target="_blank" class="text-gray-400 hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a>` : ''}
        ${data.facebook ? `<a href="${data.facebook}" target="_blank" class="text-gray-400 hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>` : ''}
        ${data.whatsapp ? `<a href="https://wa.me/55${data.whatsapp.replace(/\D/g, '')}" target="_blank" class="text-gray-400 hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></a>` : ''}
    `;

    // Note: The script tags are escaped to be part of the string.
    return `
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${data.name}</title><script src="https://cdn.tailwindcss.com"><\/script><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"><script src="https://unpkg.com/scrollreveal"><\/script><style>body{font-family:'Poppins',sans-serif;scroll-behavior:smooth;background-color:#f8fafc;color:#1f2937;}.font-serif{font-family:'Playfair Display',serif;}.hero{background-image:linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url('${mainCoverUrl}');}.cta-button{background-color:${data.primaryColor};box-shadow:0 4px 14px 0 rgba(0,0,0,0.25);color:white;}.cta-button:hover{filter:brightness(1.1);transform:translateY(-2px);}.section-title{position:relative;padding-bottom:0.5rem;display:inline-block;}.section-title::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:80px;height:3px;background-color:${data.primaryColor};}<\/style></head><body><section class="hero h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white text-center p-4">${data.logo ? `<img src="${data.logo}" alt="Logo" class="max-h-24 mb-6 reveal-up">` : `<h1 class="text-4xl md:text-6xl font-serif font-bold reveal-up">${data.name}</h1>`}<h2 class="text-xl md:text-3xl mt-4 font-light max-w-3xl reveal-up" style="animation-delay:200ms;">${data.slogan}</h2><a href="#contact" class="cta-button font-bold py-4 px-10 text-lg ${data.borderStyle} mt-10 transition-all duration-300 reveal-up" style="animation-delay:400ms;">Peça seu Orçamento</a></section><main class="container mx-auto px-6 py-16 md:py-24 space-y-24"><section id="about" class="grid md:grid-cols-2 gap-12 items-center"><div class="reveal-left"><img src="${aboutPhotoUrl}" alt="Foto de ${data.name}" class="w-full h-auto object-cover ${data.borderStyle} shadow-2xl"></div><div class="reveal-right"><h2 class="text-3xl md:text-4xl font-serif font-bold mb-6">Sobre Mim</h2><div class="text-lg text-gray-600 space-y-4">${data.about.split('\n').map(p => `<p>${p}</p>`).join('')}</div></div></section><section id="workflow" class="text-center reveal-up"><h2 class="text-3xl md:text-4xl font-serif font-bold mb-12 section-title">Como Funciona</h2><div class="max-w-3xl mx-auto text-lg text-gray-600">${workflowHTML}</div></section><section id="testimonials" class="py-16 bg-fixed bg-cover bg-center" style="background-image:url('${data.coverPhotos[1]?.src || mainCoverUrl}');"><div class="bg-gray-800/50 backdrop-blur-sm py-16"><div class="container mx-auto px-6"><h2 class="text-3xl md:text-4xl font-serif font-bold mb-12 text-center text-white section-title" style="text-shadow:1px 1px 3px rgba(0,0,0,0.5);">O que dizem meus clientes</h2><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-fade">${testimonialsHTML}</div></div></div></section><section id="gallery" class="reveal-up"><h2 class="text-3xl md:text-4xl font-serif font-bold mb-12 text-center section-title">Galeria</h2><div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">${galleryHTML}</div></section></main><section id="contact" class="bg-[#202020] text-white py-20 text-center"><div class="container mx-auto px-6 reveal-up"><h2 class="text-3xl md:text-4xl font-serif font-bold mb-4">Pronto para criar memórias incríveis?</h2><p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Entre em contato e vamos conversar sobre como posso transformar seus momentos em arte.</p><a href="https://wa.me/55${data.whatsapp.replace(/\D/g, '')}?text=Olá! Vi seu site e gostaria de um orçamento." target="_blank" class="cta-button font-bold py-4 px-10 text-lg ${data.borderStyle} transition-all duration-300 inline-block">Fale Comigo no WhatsApp</a></div></section><footer class="bg-black text-gray-400 py-8"><div class="container mx-auto px-6 text-center"><div class="flex justify-center items-center space-x-6 mb-4">${socialLinksHTML}</div><p>&copy; ${new Date().getFullYear()} ${data.name}. Todos os direitos reservados.</p><p class="text-xs mt-2 opacity-50">Página gerada por Fotógrafo Pro Page</p></div></footer><script>const sr = ScrollReveal({distance:'60px',duration:2000,delay:100,reset:false,});sr.reveal('.reveal-up',{origin:'bottom'});sr.reveal('.reveal-left',{origin:'left'});sr.reveal('.reveal-right',{origin:'right'});sr.reveal('.reveal-fade',{origin:'bottom',opacity:0,distance:'0px'});<\/script></body></html>`;
};

// --- COMPONENTS ---
const Header = () => (
  <header className="bg-[#202020] shadow-lg sticky top-0 z-40">
    <div className="container mx-auto px-4 py-6 flex justify-center items-center">
      <img src="https://static.wixstatic.com/media/c0ce7e_e18be92cf79744e59649b4f76cda50ec~mv2.png" alt="Logotipo do Projeto" className="h-20" />
    </div>
  </header>
);

const Sidebar = () => {
    const sections = [
        { id: 'section-1', name: 'Estilo e Nicho', icon: <Sparkles className="mr-3 w-5 h-5" /> },
        { id: 'section-2', name: 'Identidade Visual', icon: <Palette className="mr-3 w-5 h-5" /> },
        { id: 'section-3', name: 'Conteúdo Principal', icon: <UserCircle className="mr-3 w-5 h-5" /> },
        { id: 'section-4', name: 'Fotos para Capa', icon: <ImageIcon className="mr-3 w-5 h-5" /> },
        { id: 'section-5', name: 'Fotos da Galeria', icon: <GalleryVertical className="mr-3 w-5 h-5" /> },
        { id: 'section-6', name: 'Contato e Redes', icon: <Contact className="mr-3 w-5 h-5" /> },
    ];
    return(
        <aside className="lg:col-span-1">
            <div className="bg-[#202020] p-4 rounded-xl shadow-lg sticky top-36">
                <h3 className="font-bold mb-4 text-lg text-white">Seções</h3>
                <nav>
                    <ul className="space-y-2">
                        {sections.map(section =>(
                             <li key={section.id}><a href={`#${section.id}`} className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">{section.icon}{section.name}</a></li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

const FormSection = ({ id, title, icon, children }) => (
    <section id={id} className="bg-[#202020] p-8 rounded-xl shadow-lg form-section">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
          <span style={{color: '#bb9978'}} className="mr-3">{icon}</span>
          {title}
        </h2>
        {children}
    </section>
);

const Input = ({ id, label, placeholder, value, onChange, type = 'text' }) => (
    <div>
        <label htmlFor={id} className="font-semibold block mb-1 text-gray-300">{label}</label>
        <input type={type} id={id} name={id} placeholder={placeholder} value={value} onChange={onChange} className="w-full p-3 bg-[#282828] border border-[#b19f8e] rounded-lg text-white focus:ring-2 focus:ring-custom placeholder-gray-500" />
    </div>
);

const Select = ({ id, label, value, onChange, children }) => (
    <div>
        <label htmlFor={id} className="font-semibold block mb-1 text-gray-300">{label}</label>
        <select id={id} name={id} value={value} onChange={onChange} className="w-full p-3 bg-[#282828] border border-[#b19f8e] rounded-lg text-white focus:ring-2 focus:ring-custom">
            {children}
        </select>
    </div>
);

const Textarea = ({ id, label, placeholder, value, onChange, rows=5 }) => (
     <div>
        <label htmlFor={id} className="font-semibold block mb-1 text-gray-300">{label}</label>
        <textarea id={id} name={id} rows={rows} placeholder={placeholder} value={value} onChange={onChange} className="w-full p-3 bg-[#282828] border border-[#b19f8e] rounded-lg text-white focus:ring-2 focus:ring-custom placeholder-gray-500"></textarea>
    </div>
);

const ImageUploader = ({ onFileSelect, id, children }) => (
    <label className="w-full h-40 border-2 border-dashed border-[#b19f8e] rounded-lg flex items-center justify-center bg-[#282828] text-gray-500 cursor-pointer hover:bg-gray-700 transition">
        <div className="text-center">{children}</div>
        <input type="file" id={id} accept="image/png, image/jpeg, image/svg+xml" className="hidden" onChange={onFileSelect} />
    </label>
);

const CustomModal = ({ isOpen, message, isConfirm, onOk, onCancel }) => {
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
             <div className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-sm w-full text-center border border-gray-700">
                <p className="text-lg mb-6 text-white">{message}</p>
                <div className="flex justify-center space-x-4">
                    {isConfirm && <button onClick={onCancel} className="bg-gray-600 text-gray-200 font-bold py-2 px-6 rounded-lg hover:bg-gray-500 transition">Cancelar</button>}
                    <button onClick={onOk} className="bg-[#bb9978] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#a1866a] transition">OK</button>
                </div>
            </div>
        </div>
    );
}

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    niche: 'Casamentos',
    style: '',
    primaryColor: '#bb9978',
    borderStyle: 'rounded-xl',
    slogan: '',
    about: '',
    workflow: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
  });
  
  const [logo, setLogo] = useState(null);
  const [coverPhotos, setCoverPhotos] = useState([]);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [mainCoverIndex, setMainCoverIndex] = useState(0);

  const [modal, setModal] = useState({ isOpen: false, message: '', isConfirm: false, onOk: () => {}, onCancel: () => {} });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setter(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleFiles = (e, currentFiles, setter) => {
      const files = Array.from(e.target.files);
      files.forEach(file => {
          const reader = new FileReader();
          reader.onload = (event) => {
              const newPhoto = { id: Date.now() + Math.random(), src: event.target.result };
              setter(prev => [...prev, newPhoto]);
          };
          reader.readAsDataURL(file);
      });
  };

  const addTestimonial = () => {
      setTestimonials(prev => [...prev, {id: Date.now(), name: '', text: ''}]);
  };

  const updateTestimonial = (index, field, value) => {
      setTestimonials(prev => {
          const newTestimonials = [...prev];
          newTestimonials[index][field] = value;
          return newTestimonials;
      });
  };

  const removeTestimonial = (id) => {
      setTestimonials(prev => prev.filter(t => t.id !== id));
  };
  
  const removePhoto = (id, from) => {
      if (from === 'cover') {
          setCoverPhotos(prev => prev.filter(p => p.id !== id));
          // Reset main cover if it was the deleted one
          if(mainCoverIndex >= coverPhotos.length -1) setMainCoverIndex(0);

      } else {
          setGalleryPhotos(prev => prev.filter(p => p.id !== id));
      }
  };

  const generateWithAI = () => {
      setFormData(prev => ({
          ...prev,
          slogan: `Eternizando a arte dos seus momentos mais ${prev.style || 'emocionantes'}.`,
          about: `Olá! Sou especialista em fotografia de ${prev.niche} e apaixonado(a) por contar histórias através de imagens. Meu estilo ${prev.style || 'emocionante'} busca capturar a verdadeira emoção e a beleza única de cada instante, transformando memórias em tesouros para toda a vida.`,
          workflow: `1. Bate-papo inicial: Vamos conversar sobre suas ideias e expectativas.\n2. O ensaio: Um dia leve e divertido para criar imagens incríveis.\n3. Galeria online: Você receberá um link para sua galeria privada com as fotos tratadas em alta resolução.`
      }));
  };
  
  const handleGeneratePage = () => {
    if (!formData.name || coverPhotos.length === 0 || galleryPhotos.length < 5) {
        setModal({ isOpen: true, message: 'Por favor, preencha seu nome e envie pelo menos 1 foto de capa e 5 fotos para a galeria.', isConfirm: false, onOk: () => setModal({isOpen: false}) });
        return;
    }
    
    const finalData = { ...formData, logo, coverPhotos, galleryPhotos, testimonials, mainCoverIndex };
    const html = generateLandingPageHTML(finalData);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const onOk = () => {
        window.open(url, '_blank');
        setModal({isOpen: false});
    };
    const onCancel = () => {
        const a = document.createElement('a');
        a.href = url;
        a.download = 'minha-landing-page.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setModal({isOpen: false});
    };

    setModal({ isOpen: true, message: "Página gerada! Clique em 'OK' para visualizar, ou 'Cancelar' para baixar o arquivo HTML.", isConfirm: true, onOk, onCancel });
  };
  
  return (
    <>
      <GlobalStyles />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <p className="text-center mb-8 text-lg text-gray-400">Preencha os campos abaixo para criar sua landing page personalizada.</p>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Sidebar/>
            <div className="lg:col-span-3 space-y-8">
              {/* --- FORM SECTIONS --- */}
              <FormSection id="section-1" title="1. Estilo e Nicho" icon={<Sparkles />}>
                  <div className="space-y-4">
                    <Input id="name" name="name" label="Seu Nome ou Nome do Estúdio" placeholder="Ex: João Silva Fotografia" value={formData.name} onChange={handleChange} />
                    <Select id="niche" name="niche" label="Qual seu principal nicho de fotografia?" value={formData.niche} onChange={handleChange}>
                        {niches.map(n => <option key={n}>{n}</option>)}
                    </Select>
                    <Input id="style" name="style" label="Descreva seu estilo em poucas palavras:" placeholder="Ex: Artístico, Clássico, Vibrante, Minimalista" value={formData.style} onChange={handleChange} />
                  </div>
              </FormSection>
              
              <FormSection id="section-2" title="2. Identidade Visual" icon={<Palette />}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                           <label className="font-semibold block mb-2 text-gray-300">Seu Logotipo</label>
                            <label className="w-full h-40 border-2 border-dashed border-[#b19f8e] rounded-lg flex items-center justify-center bg-[#282828] text-gray-500 relative cursor-pointer hover:bg-gray-700">
                               {logo ? <img src={logo} alt="Prévia do Logo" className="max-w-full max-h-full object-contain p-2"/> : 
                                <div className="text-center">
                                    <UploadCloud className="mx-auto w-10 h-10"/>
                                    <p>Clique para enviar</p>
                                </div>
                               }
                                <input type="file" className="hidden" onChange={e => handleFileChange(e, setLogo)} />
                           </label>
                        </div>
                         <div className="space-y-4">
                           <Input type="color" id="primaryColor" name="primaryColor" label="Cor Principal" value={formData.primaryColor} onChange={handleChange} />
                           <Select id="borderStyle" name="borderStyle" label="Estilo dos Elementos" value={formData.borderStyle} onChange={handleChange}>
                               <option value="rounded-xl">Arredondado</option>
                               <option value="rounded-none">Reto</option>
                           </Select>
                        </div>
                    </div>
              </FormSection>

              <FormSection id="section-3" title="3. Conteúdo Principal" icon={<UserCircle/>}>
                    <div className="flex justify-end mb-6">
                        <button onClick={generateWithAI} className="bg-[#bb9978] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#a1866a] transition duration-300 text-sm flex items-center">
                            <BrainCircuit className="w-4 h-4 mr-2" />Gerar com IA
                        </button>
                    </div>
                    <div className="space-y-6">
                       <Input id="slogan" name="slogan" label="Frase de Impacto (para a capa)" placeholder="Ex: Capturando a essência..." value={formData.slogan} onChange={handleChange} />
                       <Textarea id="about" name="about" label="Apresentação (Sobre você)" placeholder="Conte sua história..." value={formData.about} onChange={handleChange} />
                       <Textarea id="workflow" name="workflow" label="Como funciona seu trabalho (passo a passo)" placeholder="Descreva seu processo..." value={formData.workflow} onChange={handleChange} />
                       <div>
                            <h3 className="font-semibold mb-2 text-gray-300">Depoimentos de Clientes</h3>
                            <div id="testimonials-container" className="space-y-4">
                               {testimonials.map((t, index) => (
                                    <div key={t.id} className="p-3 border border-[#b19f8e] rounded-lg bg-[#282828] space-y-2">
                                        <input type="text" placeholder="Nome do Cliente" value={t.name} onChange={e => updateTestimonial(index, 'name', e.target.value)} className="w-full p-2 bg-gray-700 border border-[#b19f8e] rounded-md text-white placeholder-gray-500" />
                                        <textarea placeholder="Depoimento do cliente..." value={t.text} onChange={e => updateTestimonial(index, 'text', e.target.value)} rows="3" className="w-full p-2 bg-gray-700 border border-[#b19f8e] rounded-md text-white placeholder-gray-500"></textarea>
                                        <button onClick={() => removeTestimonial(t.id)} className="text-red-500 text-sm hover:text-red-400">Remover</button>
                                    </div>
                               ))}
                            </div>
                            <button onClick={addTestimonial} className="mt-2 bg-gray-700 text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition text-sm">Adicionar Depoimento</button>
                       </div>
                    </div>
              </FormSection>

              <FormSection id="section-4" title="4. Fotos para Capa e Fundos" icon={<ImageIcon />}>
                  <p className="mb-4 text-gray-400">Envie de 1 a 5 fotos. Clique em uma foto para selecioná-la como capa.</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {coverPhotos.map((photo, index) => (
                          <div key={photo.id} className="image-preview-item aspect-video">
                              <img src={photo.src} className="w-full h-full object-cover" />
                              {index === mainCoverIndex && <div className="main-cover-indicator"><Sparkles size={16} /></div>}
                              <div className="overlay">
                                <button onClick={() => setMainCoverIndex(index)}>Definir Capa</button>
                                <button onClick={() => removePhoto(photo.id, 'cover')}>Excluir</button>
                              </div>
                          </div>
                      ))}
                      <label className="w-full h-40 border-2 border-dashed border-[#b19f8e] rounded-lg flex items-center justify-center bg-[#282828] text-gray-500 cursor-pointer hover:bg-gray-700 transition">
                          <div className="text-center"><PlusCircle className="mx-auto w-10 h-10" /><p>Adicionar fotos</p></div>
                          <input type="file" className="hidden" multiple onChange={e => handleMultipleFiles(e, coverPhotos, setCoverPhotos)}/>
                      </label>
                  </div>
              </FormSection>
              
              <FormSection id="section-5" title="5. Fotos da Galeria" icon={<GalleryVertical />}>
                    <p className="mb-4 text-gray-400">Envie entre 10 e 40 fotos. Elas podem ser horizontais ou verticais.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                         {galleryPhotos.map(photo => (
                          <div key={photo.id} className="image-preview-item aspect-square">
                              <img src={photo.src} className="w-full h-full object-cover" />
                              <div className="overlay">
                                <button onClick={() => removePhoto(photo.id, 'gallery')}>Excluir</button>
                              </div>
                          </div>
                        ))}
                        <label className="w-full h-32 border-2 border-dashed border-[#b19f8e] rounded-lg flex items-center justify-center bg-[#282828] text-gray-500 cursor-pointer hover:bg-gray-700 transition">
                             <div className="text-center"><PlusCircle className="mx-auto w-8 h-8" /><p className="text-sm">Adicionar fotos</p></div>
                             <input type="file" className="hidden" multiple onChange={e => handleMultipleFiles(e, galleryPhotos, setGalleryPhotos)} />
                        </label>
                    </div>
              </FormSection>

              <FormSection id="section-6" title="6. Contato e Redes Sociais" icon={<Contact />}>
                   <div className="space-y-4">
                       <Input id="whatsapp" name="whatsapp" label="Nº de WhatsApp com DDD" placeholder="Ex: 11912345678" value={formData.whatsapp} onChange={handleChange} />
                       <Input id="instagram" name="instagram" label="Usuário do Instagram (sem @)" placeholder="Ex: joaosilvafotografia" value={formData.instagram} onChange={handleChange} />
                       <Input id="facebook" name="facebook" label="Link da sua página no Facebook (opcional)" placeholder="https://facebook.com/seu.estudio" value={formData.facebook} onChange={handleChange} />
                   </div>
              </FormSection>

              <div className="flex justify-center pt-8">
                  <button onClick={handleGeneratePage} className="bg-[#bb9978] text-white font-bold py-4 px-10 rounded-lg hover:bg-[#a1866a] transition duration-300 flex items-center text-xl shadow-lg transform hover:scale-105">
                      <Wand2 className="inline-block mr-3 w-6 h-6" />
                      Gerar Minha Página
                  </button>
              </div>
            </div>
        </div>
      </main>
      <CustomModal 
        isOpen={modal.isOpen} 
        message={modal.message} 
        isConfirm={modal.isConfirm} 
        onOk={modal.onOk}
        onCancel={modal.onCancel}
      />
    </>
  );
}
