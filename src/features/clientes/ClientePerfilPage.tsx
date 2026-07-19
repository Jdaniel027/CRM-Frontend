import { useParams } from 'react-router-dom'

export default function ClientePerfilPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground">Perfil del Cliente</h2>
      <p className="mt-2 text-muted-foreground">
        Cliente ID: {id} — próximamente.
      </p>
    </div>
  )
}
