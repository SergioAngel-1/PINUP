interface TokenPayload {
  userId: number;
  exp: number;
}

export function createToken(payload: TokenPayload): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const content = btoa(JSON.stringify(payload));
  const signature = btoa(header + '.' + content); // Simplified for demo
  return `${header}.${content}.${signature}`;
}

export function verifyToken(token: string): TokenPayload {
  try {
    const [header, content] = token.split('.');
    if (!header || !content) throw new Error('Formato de token inválido');
    
    const payload = JSON.parse(atob(content));
    if (!payload.exp || payload.exp < Date.now()) {
      throw new Error('Token expirado');
    }
    
    return payload;
  } catch {
    throw new Error('Token inválido');
  }
}