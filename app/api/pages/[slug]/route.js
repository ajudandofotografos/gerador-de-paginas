import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    const { rows } = await sql`
      SELECT pagedata FROM LandingPages WHERE slug = ${slug};
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Página não encontrada' }, { status: 404 });
    }

    return NextResponse.json(rows[0].pagedata, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
