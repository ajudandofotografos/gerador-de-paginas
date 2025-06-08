import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // Verifica se o nome do ficheiro e o corpo do pedido existem
  if (!filename) {
    return NextResponse.json(
      { error: 'Nome do ficheiro é obrigatório.' },
      { status: 400 }
    );
  }

  if (!request.body) {
    return NextResponse.json(
      { error: 'Corpo do pedido em falta.' },
      { status: 400 }
    );
  }

  try {
    // Faz o upload do ficheiro para o Vercel Blob
    const blob = await put(filename, request.body, {
      access: 'public',
    });

    // Retorna os dados do blob em caso de sucesso
    return NextResponse.json(blob);

  } catch (error) {
    // Retorna uma mensagem de erro em formato JSON
    return NextResponse.json(
      { error: `Falha ao fazer upload: ${error.message}` },
      { status: 500 }
    );
  }
}
