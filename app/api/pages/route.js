import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { pageData, slug } = await request.json();
    
    if (!pageData || !slug) {
        throw new Error('Dados da página e slug são obrigatórios');
    }

    // Garante que a tabela existe
    await sql`
      CREATE TABLE IF NOT EXISTS LandingPages (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        pagedata JSONB NOT NULL,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Lógica UPSERT: Atualiza se o slug existir, senão insere um novo.
    // ON CONFLICT (slug) significa: se houver um conflito na coluna 'slug' (ou seja, já existe)
    // DO UPDATE SET pagedata = EXCLUDED.pagedata significa: então, atualize a coluna pagedata com os novos dados.
    await sql`
      INSERT INTO LandingPages (slug, pagedata)
      VALUES (${slug}, ${JSON.stringify(pageData)})
      ON CONFLICT (slug) 
      DO UPDATE SET pagedata = EXCLUDED.pagedata;
    `;

    // Retorna uma resposta de sucesso
    return NextResponse.json({ message: 'Página guardada com sucesso!', slug: slug }, { status: 200 });

  } catch (error) {
    // Retorna uma resposta de erro
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
