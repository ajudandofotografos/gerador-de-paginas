import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { pageData, slug } = await request.json();
    
    if (!pageData || !slug) {
        throw new Error('Dados da página e slug são obrigatórios');
    }

    // Primeiro, cria a tabela se ela não existir.
    // O ideal é fazer isto uma única vez, mas para este exemplo, isto garante que funciona.
    await sql`
      CREATE TABLE IF NOT EXISTS LandingPages (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        pagedata JSONB NOT NULL,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insere os novos dados na tabela
    await sql`
      INSERT INTO LandingPages (slug, pagedata)
      VALUES (${slug}, ${JSON.stringify(pageData)});
    `;

    // Retorna uma resposta de sucesso
    return NextResponse.json({ message: 'Página criada com sucesso!', slug: slug }, { status: 200 });

  } catch (error) {
    // Retorna uma resposta de erro
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
