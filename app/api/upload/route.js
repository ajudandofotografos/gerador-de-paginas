import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // Verifica se o nome do ficheiro e o corpo do pedido existem
  if (!filename || !request.body) {
    return new NextResponse('Nome do ficheiro ou corpo do pedido em falta', { status: 400 });
  }

  try {
    // Faz o upload do ficheiro para o Vercel Blob
    const blob = await put(filename, request.body, {
      access: 'public',
    });

    // Retorna os dados do blob em caso de sucesso
    return NextResponse.json(blob);

  } catch (error) {
    // Retorna uma mensagem de erro mais detalhada
    return new NextResponse(
      `Falha ao fazer upload da imagem: ${error.message}`,
      { status: 500 },
    );
  }
}
