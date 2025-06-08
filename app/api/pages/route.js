import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Adiciona esta linha para garantir compatibilidade

export async function POST(request) {
  try {
    const { pageData, slug } = await request.json();
    
    if (!pageData || !slug) {
        throw new Error('Dados da página e slug são obrigatórios');
    }

    await sql`
      CREATE TABLE IF NOT EXISTS LandingPages (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        pagedata JSONB NOT NULL,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      INSERT INTO LandingPages (slug, pagedata)
      VALUES (${slug}, ${JSON.stringify(pageData)});
    `;

    return NextResponse.json({ message: 'Página criada com sucesso!', slug: slug }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
