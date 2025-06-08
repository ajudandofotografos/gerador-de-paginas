'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link'; // Importa o componente Link
import { LoaderCircle } from 'lucide-react';
import { generateGerginPageHTML } from '../utils/template-gergin.js'; 

const Page = ({ params }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params.slug) {
      fetch(`/api/pages/${params.slug}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Página não encontrada');
          }
          return res.json();
        })
        .then((data) => {
          setPageData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <LoaderCircle className="w-16 h-16 animate-spin text-[#bb9978]" />
        <p className="mt-4 text-xl">A carregar a página...</p>
      </div>
    );
  }

  if (error) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <h1 className="text-4xl font-bold text-red-500">Erro 404</h1>
            <p className="mt-4 text-xl">Página não encontrada.</p>
            {/* CORREÇÃO: Usa o componente Link em vez da tag <a> */}
            <Link href="/" className="mt-8 px-4 py-2 bg-[#bb9978] rounded-lg text-white">Voltar ao Início</Link>
        </div>
    );
  }

  if (pageData) {
    return (
      <>
        <Head>
            <title>{pageData.name || 'Página do Fotógrafo'}</title>
            <meta name="description" content={pageData.slogan || 'Portfólio de fotografia'} />
        </Head>
        <div dangerouslySetInnerHTML={{ __html: generateGerginPageHTML(pageData) }} />
      </>
    );
  }

  return null;
};

export default Page;
