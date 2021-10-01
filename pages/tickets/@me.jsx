import { Dashboard } from '../../layouts'
import Header from '../../components/Header'

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

export default function MeusTickets() {
    const INTL = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', timeStyle: 'short', dateStyle: 'medium' })
    const rows = [{
        subject: 'Lorem ipsum dolor sit amet.', helper: 'Marcos', createdAt: Date.now() - 8.64e+7,
        updatedAt: Date.now(), status: 'pendente', color: 'warning'
    }, {
        avatar: 'https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg',
        subject: 'Lorem ipsum dolor sit amet.', helper: 'Marcos', createdAt: Date.now() - 8.64e+7,
        updatedAt: Date.now(), status: 'pendente', color: 'warning'
    }]

    return (
        <Dashboard>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((r, i) => (
                                        <tr key={1 + i}>
                                            {/* Avatar */}
                                            <th scope="row">
                                                <Media className="align-items-center">
                                                    <a
                                                        className="avatar rounded-circle mr-3"
                                                        href={`ticket/${1 + i}`}
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        <Image
                                                            alt={r.helper}
                                                            width='48px'
                                                            height='48px'
                                                            src={r?.avatar || `https://avatars.dicebear.com/v2/initials/${
                                                                r.helper.split(' ').join('-')
                                                            }.svg`}
                                                        />
                                                    </a>
                                                    <Media>
                                                        <a style={{cursor: 'pointer'}}className="mb-0 text-sm">
                                                            {r.subject}
                                                        </a>
                                                    </Media>
                                                </Media>
                                            </th>
                                            {/* Content */}
                                            <td data-label="Ajudante">{r.helper}</td>
                                            <td data-label="Criado">{INTL.format(r.createdAt)}</td>
                                            <td data-label="Atualizado">{INTL.format(r.updatedAt)}</td>
                                            <td data-label="Status">
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className={`bg-${r.color}`} />
                                                    {r.status}
                                                </Badge>
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
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                                tabIndex="-1"
                                            >
                                                <i className="fas fa-angle-left" />
                                                <span className="sr-only">Previous</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="active">
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                2 <span className="sr-only">(current)</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                3
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className="fas fa-angle-right" />
                                                <span className="sr-only">Next</span>
                                            </PaginationLink>
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

// Row Dropdown
{/* <td className="text-right">
    <UncontrolledDropdown>
        <DropdownToggle
            className="btn-icon-only text-light"
            href="#pablo"
            role="button"
            size="sm"
            color=""
            onClick={(e) => e.preventDefault()}
        >
            <i className="fas fa-ellipsis-v" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem
                href="#pablo"
                onClick={(e) => e.preventDefault()}
            >
                Action
            </DropdownItem>
            <DropdownItem
                href="#pablo"
                onClick={(e) => e.preventDefault()}
            >
                Another action
            </DropdownItem>
            <DropdownItem
                href="#pablo"
                onClick={(e) => e.preventDefault()}
            >
                Something else here
            </DropdownItem>
        </DropdownMenu>
    </UncontrolledDropdown>
</td> */}