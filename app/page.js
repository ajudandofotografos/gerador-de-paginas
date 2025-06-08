'use client';
import React, { useState } from 'react';
import { Sparkles, Palette, UserCircle, Image as ImageIcon, GalleryVertical, Contact, UploadCloud, PlusCircle, BrainCircuit, Wand2, LoaderCircle } from 'lucide-react';

// --- STYLES ---
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

// --- HELPER DATA ---
const niches = [
  "Casamentos", "Ensaios (Gestante, Família)", "Newborn (Recém-nascido)", "Eventos Sociais (Aniversários)",
  "Retratos", "Moda", "Fotografia de Produto", "Gastronomia", "Arquitetura e Interiores",
  "Pets", "Esportes", "Viagens e Paisagens", "Drones / Aérea", "Corporativo"
];

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

const Input = ({ id, label, placeholder, value, onChange, type = 'text', ...props }) => (
    <div>
        <label htmlFor={id} className="font-semibold block mb-1 text-gray-300">{label}</label>
        <input type={type} id={id} name={id} placeholder={placeholder} value={value} onChange={onChange} className="w-full p-3 bg-[#282828] border border-[#b19f8e] rounded-lg text-white focus:ring-2 focus:ring-custom placeholder-gray-500" {...props} />
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

const CustomModal = ({ isOpen, message, onOk}) => {
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
             <div className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-sm w-full text-center border border-gray-700">
                <p className="text-lg mb-6 text-white" dangerouslySetInnerHTML={{ __html: message }}></p>
                <div className="flex justify-center space-x-4">
                    <button onClick={onOk} className="bg-[#bb9978] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#a1866a] transition">OK</button>
                </div>
            </div>
        </div>
    );
}

export default function Page() {
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
  
  const [logoUrl, setLogoUrl] = useState('');
  const [coverPhotoUrls, setCoverPhotoUrls] = useState([]);
  const [galleryPhotoUrls, setGalleryPhotoUrls] = useState([]);
  
  const [testimonials, setTestimonials] = useState([]);
  const [mainCoverIndex, setMainCoverIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, message: ''});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const uploadFile = async (file) => {
    const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${file.name.replace(/\s+/g, '-')}`;
    
    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(uniqueFilename)}`, {
        method: 'POST',
        body: file,
      });
      const newBlob = await response.json();
      if (!response.ok) {
        throw new Error(newBlob.error || 'Falha no upload');
      }
      return newBlob;
    } catch (error) {
      console.error('Erro no upload:', error);
      setModal({ isOpen: true, message: `Falha no upload da imagem: ${error.message}`});
      throw error;
    }
  };

  const handleSingleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    try {
      const blob = await uploadFile(file);
      setLogoUrl(blob.url);
    } catch (error) {
      // O modal de erro já é mostrado dentro de uploadFile
    } finally {
      setIsLoading(false);
    }
  };

  const handleMultipleUpload = async (e, setter) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsLoading(true);
    try {
      await Promise.all(files.map(async (file) => {
        const blob = await uploadFile(file);
        setter(prev => [...prev, { id: blob.url, url: blob.url }]);
      }));
    } catch (error) {
       // O modal de erro já é mostrado dentro de uploadFile
    } finally {
      setIsLoading(false);
    }
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
          setCoverPhotoUrls(prev => prev.filter(p => p.id !== id));
          if(mainCoverIndex >= coverPhotoUrls.length -1) setMainCoverIndex(0);
      } else {
          setGalleryPhotoUrls(prev => prev.filter(p => p.id !== id));
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
  
  const handleGeneratePage = async () => {
    if (!formData.name) {
        setModal({ isOpen: true, message: 'O campo "Nome do Estúdio" é obrigatório para criar o link.'});
        return;
    }
     if (coverPhotoUrls.length === 0 || galleryPhotoUrls.length < 5) {
        setModal({ isOpen: true, message: 'Por favor, envie pelo menos 1 foto de capa e 5 fotos para a galeria.'});
        return;
    }
    
    setIsLoading(true);

    const slug = formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const finalData = { ...formData, logoUrl, coverPhotoUrls, galleryPhotoUrls, testimonials, mainCoverIndex };

    try {
        const response = await fetch('/api/pages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pageData: finalData, slug }),
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.error || 'Falha ao criar a página. Tente novamente.');
        }

        const result = await response.json();
        
        // CORREÇÃO: Constrói a URL do subdomínio
        const rootDomain = "propostalab.app"; // O seu domínio principal
        const pageUrl = `https://${result.slug}.${rootDomain}`;
        const successMessage = `Página guardada com sucesso! <br><br> <a href="${pageUrl}" target="_blank" class="text-[#bb9978] font-bold hover:underline">Visite a sua página em ${pageUrl}</a>`;
        setModal({ isOpen: true, message: successMessage });

    } catch (error) {
        setModal({ isOpen: true, message: error.message });
    } finally {
        setIsLoading(false);
    }
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
                               {logoUrl ? <img src={logoUrl} alt="Prévia do Logo" className="max-w-full max-h-full object-contain p-2"/> : 
                                <div className="text-center">
                                    <UploadCloud className="mx-auto w-10 h-10"/>
                                    <p>Clique para enviar</p>
                                </div>
                               }
                                <input type="file" className="hidden" onChange={handleSingleUpload} />
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
                      {coverPhotoUrls.map((photo, index) => (
                          <div key={photo.id} className="image-preview-item aspect-video">
                              <img src={photo.url} className="w-full h-full object-cover" />
                              {index === mainCoverIndex && <div className="main-cover-indicator"><Sparkles size={16} /></div>}
                              <div className="overlay">
                                <button onClick={() => setMainCoverIndex(index)}>Definir Capa</button>
                                <button onClick={() => removePhoto(photo.id, 'cover')}>Excluir</button>
                              </div>
                          </div>
                      ))}
                      <label className="w-full h-40 border-2 border-dashed border-[#b19f8e] rounded-lg flex items-center justify-center bg-[#282828] text-gray-500 cursor-pointer hover:bg-gray-700 transition">
                          <div className="text-center"><PlusCircle className="mx-auto w-10 h-10" /><p>Adicionar fotos</p></div>
                          <input type="file" className="hidden" multiple onChange={(e) => handleMultipleUpload(e, setCoverPhotoUrls)}/>
                      </label>
                  </div>
              </FormSection>
              
              <FormSection id="section-5" title="5. Fotos da Galeria" icon={<GalleryVertical />}>
                    <p className="mb-4 text-gray-400">Envie entre 10 e 40 fotos. Elas podem ser horizontais ou verticais.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                         {galleryPhotoUrls.map(photo => (
                          <div key={photo.id} className="image-preview-item aspect-square">
                              <img src={photo.url} className="w-full h-full object-cover" />
                              <div className="overlay">
                                <button onClick={() => removePhoto(photo.id, 'gallery')}>Excluir</button>
                              </div>
                          </div>
                        ))}
                        <label className="w-full h-32 border-2 border-dashed border-[#b19f8e] rounded-lg flex items-center justify-center bg-[#282828] text-gray-500 cursor-pointer hover:bg-gray-700 transition">
                             <div className="text-center"><PlusCircle className="mx-auto w-8 h-8" /><p className="text-sm">Adicionar fotos</p></div>
                             <input type="file" className="hidden" multiple onChange={(e) => handleMultipleUpload(e, setGalleryPhotoUrls)} />
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
                  <button onClick={handleGeneratePage} disabled={isLoading} className="bg-[#bb9978] text-white font-bold py-4 px-10 rounded-lg hover:bg-[#a1866a] transition duration-300 flex items-center text-xl shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isLoading ? <LoaderCircle className="animate-spin mr-3 w-6 h-6" /> : <Wand2 className="inline-block mr-3 w-6 h-6" />}
                      {isLoading ? 'A Guardar...' : 'Gerar Minha Página'}
                  </button>
              </div>
            </div>
        </div>
      </main>
      <CustomModal 
        isOpen={modal.isOpen} 
        message={modal.message} 
        onOk={() => setModal({isOpen: false})}
      />
    </>
  );
}
