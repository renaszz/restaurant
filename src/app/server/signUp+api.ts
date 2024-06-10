import { db } from '@/prisma'

export async function POST(request: Request): Promise<Response> {
  const { nome, email, password } = await request.json()
  const userExiste = await db.user.findUnique({ where: { email } })

  if (userExiste) {
    return new Response(
      JSON.stringify({ error: 'Esse e-mail já está em uso.' }),
      {
        status: 400,
      },
    )
  }

  const newUser = await db.user.create({
    data: {
      nome,
      email,
      password,
    },
  })

  return new Response(JSON.stringify({ user: newUser }), { status: 201 })
}
