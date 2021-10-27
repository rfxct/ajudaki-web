import { FaTicketAlt, FaPlusSquare } from 'react-icons/fa'

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

export default [
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
].map(data => new Route(data))
