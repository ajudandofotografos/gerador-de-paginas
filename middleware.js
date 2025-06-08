import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Faz a correspondência com todos os caminhos de pedido, exceto para os que começam com:
     * - api (rotas de API)
     * - _next/static (ficheiros estáticos)
     * - _next/image (pedidos de otimização de imagem)
     * - favicon.ico (ficheiro de ícone)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export function middleware(req) {
  // Extrai o nome do anfitrião do pedido (ex: joaofotografia.propostalab.app)
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || url.hostname;

  // Define o seu domínio principal
  const rootDomain = 'propostalab.app';

  // Extrai o subdomínio
  // Ignora www e o domínio principal para encontrar o slug do subdomínio
  const slug = hostname.replace(`.${rootDomain}`, '').replace('www.', '');

  // Se o pedido for para o domínio principal ou 'www', não faz nada
  if (hostname === rootDomain || hostname === `www.${rootDomain}`) {
    return NextResponse.next();
  }
  
  // Reescreve o URL para que o Next.js possa encontrar a página dinâmica
  // Ex: joaofotografia.propostalab.app -> propostalab.app/joaofotografia
  url.pathname = `/${slug}${url.pathname}`;
  return NextResponse.rewrite(url);
}
