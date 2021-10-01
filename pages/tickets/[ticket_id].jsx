import { useRouter } from 'next/router'

export default function Ticket({ }) {
  const router = useRouter()
  const { ticket_id } = router.query
  
  return <h1>Ticket id: {ticket_id}</h1>
}
