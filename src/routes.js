import { FaTicketAlt, FaPlusSquare, FaSpinner, FaCheckCircle } from 'react-icons/fa'

const helper = {
  'Geral': [
    {
      fullPath: "/tickets/@me",
      name: "Meus tickets",
      icon: <FaTicketAlt />
    },
    {
      fullPath: "/tickets/@me/pendentes",
      name: "Pendentes",
      icon: <FaSpinner />
    }
  ],
  'Outros': [
    {
      fullPath: "/tickets/@me/finalizados",
      name: "Finalizados",
      icon: <FaCheckCircle />,
    }
  ]
}

const admin = { ...helper }

export default {
  admin,
  helper,
  default: {
    'Geral': [
      {
        fullPath: "/tickets/novo",
        name: "Criar Ticket",
        icon: <FaPlusSquare />
      },
      {
        fullPath: "/tickets/@me",
        name: "Meus tickets",
        icon: <FaTicketAlt />
      }
    ]
  }
}
