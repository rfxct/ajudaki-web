import Link from 'next/link'

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
  Table,
  Container,
  Row
} from 'reactstrap';

import Dashboard from '../../layouts/Dashboard'
import checkAuth from '../../util/CheckAuth'
import { colorMap } from '../../util/StatusColor'
import { displayDate } from '../../util/DateUtil'

import { getAPIClient } from '../../services/axios'

export default function MeusTickets({ tickets, meta, user }) {
  return (
    <Dashboard user={user}>
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
                  {tickets.map((r, i) => {
                    return (
                      <tr key={1 + i}>
                        {/* Avatar */}
                        <th scope="row">
                          <Media className="align-items-center">
                            <Link
                              href={`/tickets/${r.id}`}
                              onClick={e => e.preventDefault()}
                            >
                              <a>
                                <span style={{ cursor: 'pointer' }} className="mb-0 text-sm">
                                  {r.subject}
                                </span>
                              </a>
                            </Link>
                          </Media>
                        </th>
                        {/* Content */}
                        <td data-label="Ajudante"> {r.helper?.full_name || 'nenhum'}</td>
                        <td data-label="Criado">{displayDate(r?.created_at)}</td>
                        <td data-label="Atualizado">{displayDate(r?.updated_at)}</td>
                        <td data-label="Status">
                          {/* <span className="badge badge-dot mr-4">
                            <i className={`bg-${colorMap[r.status]}`} />
                            {r?.status || 'indefinido'}
                          </span> */}
                          <Badge color={colorMap[r.status]} className="badge mr-4">
                            {r?.status || 'indefinido'}
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
                              onClick={e => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#"
                                data-parent={r.id}
                                onClick={e => {
                                  //setTickets(tickets.filter(t => t.id != e.target.dataset.parent))
                                }}
                              >
                                Encerrar atendimento
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>

              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    {/* Anterior */}
                    <PaginationItem disabled={meta.current_page <= 1}>
                      <Link
                        href={`/tickets/@me?page=${meta.current_page - 1}`}
                      >
                        <a className="page-link">
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Anterior</span>
                        </a>
                      </Link>
                    </PaginationItem>
                    {/* Atual */}
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#"
                        onClick={e => e.preventDefault()}
                      >
                        {meta.current_page}
                      </PaginationLink>
                    </PaginationItem>
                    {/* Próximo */}
                    <PaginationItem disabled={meta.current_page >= meta.last_page}>
                      <Link
                        href={`/tickets/@me?page=${meta.current_page + 1}`}
                      >
                        <a className="page-link">
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Próximo</span>
                        </a>
                      </Link>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </Dashboard>
  );
}

export async function getServerSideProps(ctx) {
  const user = await checkAuth(ctx)

  const apiClient = getAPIClient(ctx)
  const { data } = await apiClient.get(`/users/@me/tickets?page=${ctx.query.page || 1}`).catch(() => [])


  if (!user) return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
    props: {}
  }

  return { props: { user, tickets: data.data, meta: data.meta } }
}