import { db } from '@/prisma'

export async function POST(request: Request): Promise<Response> {
  const { email, password } = await request.json()

  const user = await db.user.findUnique({ where: { email } })

  if (!user || user.password !== password) {
    return new Response(
      JSON.stringify({ error: 'Credenciais inválidas. Tente novamente.' }),
      {
        status: 401,
      },
    )
  }
  return new Response(JSON.stringify({ user }), { status: 200 })
}
