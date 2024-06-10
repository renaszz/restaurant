import { db } from '@/prisma'

export async function POST(request: Request): Promise<Response> {
  const { email, password } = await request.json()

  const admin = await db.admin.findUnique({ where: { email } })

  if (!admin || admin.password !== password) {
    return new Response(
      JSON.stringify({ error: 'Credenciais inválidas. Tente novamente.' }),
      {
        status: 401,
      },
    )
  }
  return new Response(JSON.stringify({ admin }), { status: 200 })
}
