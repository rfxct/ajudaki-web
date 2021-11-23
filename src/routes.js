import { FaTicketAlt, FaPlusSquare, FaSpinner } from 'react-icons/fa'

const Route = class {
  constructor(data) {
    this.path = data.path
    this.name = data.name
    this.icon = data.icon
    this.layout = data.layout
  }

  get fullPath() {
    return this.layout + this.path
  }
}

const helper = [
  {
    path: "/@me",
    name: "Meus tickets",
    icon: <FaTicketAlt />,
    layout: "/tickets",
  },
  {
    path: "/@me/pendentes",
    name: "Pendentes",
    icon: <FaSpinner />,
    layout: "/tickets",
  }
]

const admin = [
  ...helper
]

const routes = {
  admin,
  helper,
  default: [
    {
      path: "/novo",
      name: "Criar Ticket",
      icon: <FaPlusSquare />,
      layout: "/tickets",
    },
    {
      path: "/@me",
      name: "Meus tickets",
      icon: <FaTicketAlt />,
      layout: "/tickets",
    }
  ]
}

for (const [type, values] of Object.entries(routes)) {
  routes[type] = values.map(data => new Route(data))
}

export default routes
