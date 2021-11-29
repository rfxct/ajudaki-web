import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from 'reactstrap'

import Dashboard from '../../../layouts/Dashboard'
import checkAuth from '../../../util/CheckAuth'
import { colorMap } from '../../../util/StatusColor'
import { displayDate } from '../../../util/DateUtil'

import { getAPIClient } from '../../../services/axios'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function TicketsPendentes({ tickets, meta, user }) {
  const router = useRouter()

  return (
    <Dashboard user={user}>
      <Container className="pb-8 pt-5 pt-md-8" fluid>
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
                    <th scope="col">{user.role === 'default' ? 'Ajudante' : 'Usuário'}</th>
                    <th scope="col">Criado</th>
                    <th scope="col">Atualizado</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((r, i) => {
                    r.username = r[user.role === 'default' ? 'helper' : 'creator']?.full_name
                    return (
                      <tr key={1 + i}>
                        <th scope="row" data-label="Assunto">
                          <Media className="align-items-center">
                            <a
                              className="avatar avatar-sm mr-3"
                              href="#"
                              id={`tooltip${1 + i}`}
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                className="rounded-circle"
                                src={`https://avatars.dicebear.com/v2/initials/${r.username || ''}.svg`}
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target={`tooltip${1 + i}`}
                            >
                              {r.username || 'nenhum'}
                            </UncontrolledTooltip>
                            <Media>
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
                          </Media>
                        </th>

                        <td data-label={user.role === 'default' ? 'Ajudante' : 'Usuário'}>{r.username || 'nenhum'}</td>
                        <td data-label="Criado">{displayDate(r?.created_at)}</td>
                        <td data-label="Atualizado">{displayDate(r?.updated_at)}</td>
                        <td data-label="Status">
                          <Badge color={colorMap[r.status]} className="mr-4">
                            {r?.status || 'indefinido'}
                          </Badge>
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
                        href={`${router.route}?page=${meta.current_page - 1}`}
                      >
                        <a className="page-link">
                          <FaAngleLeft />
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
                        href={`${router.route}?page=${meta.current_page + 1}`}
                      >
                        <a className="page-link">
                          <FaAngleRight />
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

  if (!user || user?.role === 'default') return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
    props: {}
  }

  const apiClient = getAPIClient(ctx)
  const { data } = await apiClient.get(
    `/tickets?page=${ctx.query.page || 1}`
  ).catch(() => [])

  return { props: { user, tickets: data.data.filter(t => t.status === 'pendente'), meta: data.meta } }
}