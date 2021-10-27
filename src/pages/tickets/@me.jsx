import Link from 'next/link'
import Image from 'next/image'

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';

import { useLocalStorage } from '../../hooks'
import { Dashboard } from '../../layouts'
import { Long } from '../../util/DateUtil'

import { getAPIClient } from '../../services/axios'

export default function MeusTickets({ tickets }) {
  // const [tickets, setTickets] = useLocalStorage('tickets', [])

  return (
    <Dashboard>
      {/* Page content */}
      <Container className="pb-8 pt-5 pt-md-8" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Tickets</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Assunto</th>
                    <th scope="col">Ajudante</th>
                    <th scope="col">Criado</th>
                    <th scope="col">Atualizado</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((r, i) => (
                    <tr key={1 + i}>
                      {/* Avatar */}
                      <th scope="row">
                        <Media className="align-items-center">
                          <Image
                            className="rounded-circle"
                            alt={r.helper}
                            width='48px'
                            height='48px'
                            src={r?.avatar || `https://avatars.dicebear.com/v2/initials/${r.helper?.split(' ').join('-')
                              }.svg`}
                          />
                          <Link
                            href={`/tickets/${r.id}`}
                            onClick={(e) => e.preventDefault()}
                          >
                            <a className="ml-3">
                              <span style={{ cursor: 'pointer' }} className="mb-0 text-sm">
                                {r.subject}
                              </span>
                            </a>
                          </Link>
                        </Media>
                      </th>
                      {/* Content */}
                      <td data-label="Ajudante"> {r.helper}</td>
                      <td data-label="Criado">{Long.format(r.createdAt)}</td>
                      <td data-label="Atualizado">{!r.updatedAt ? '---' : Long.format(r.updatedAt)}</td>
                      <td data-label="Status">
                        <Badge color="" className="badge-dot mr-4">
                          <i className={`bg-${r.color}`} />
                          {r.status}
                        </Badge>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#"
                              data-parent={r.id}
                              onClick={(e) => {
                                //setTickets(tickets.filter(t => t.id != e.target.dataset.parent))
                              }}
                            >
                              Deletar
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Anterior</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Próximo</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container >
    </Dashboard >
  );
}

export async function getServerSideProps(ctx) {
  const apiClient = getAPIClient(ctx)
  const { data } = await apiClient.get('/users/@me/tickets')
  
  return {
    props: { tickets: data },
  }
}