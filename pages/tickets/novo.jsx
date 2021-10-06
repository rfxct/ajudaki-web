import { useRef } from 'react'
import { useRouter } from 'next/router'

import { Dashboard } from '../../layouts'
import { useLocalStorage } from '../../hooks'

import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  FormGroup,
  Form,
  Input,
  Button
} from 'reactstrap';

export default function MeusTickets() {
  const router = useRouter()

  const [tickets, setTickets] = useLocalStorage('tickets', [])

  return (
    <Dashboard>
      {/* Page content */}
      <Container className="bg-gradient-dark h-100 pb-8 pt-5 pt-md-8" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Novo Ticket</h3>
              </CardHeader>

              <CardBody>
                <Form>
                  <FormGroup>
                    <label htmlFor="title">Título <span style={{ color: "red" }}>*</span></label>
                    <Input
                      id="title"
                      placeholder="Insira o título/assunto"
                      type="text"
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="description">Descrição <span style={{ color: "red" }}>*</span></label>
                    <Input
                      id="description"
                      rows="3"
                      placeholder="Descreva o seu problema"
                      type="textarea"
                    ></Input>
                  </FormGroup>

                  <Button color="primary" onClick={() => {
                    const form = document.forms[0]
                    setTickets([{
                      id: ([...tickets.sort()].pop()?.id || tickets.length) + 1,
                      subject: form.title.value,
                      helper: '---',
                      createdAt: Date.now(),
                      updatedAt: 0,
                      status: 'pendente',
                      color: 'warning',
                      timeline: [{
                        avatar: 'https://avatars.dicebear.com/v2/initials/Marcos.svg',
                        username: 'Marcos',
                        description: form.description.value,
                        createdAt: Date.now()
                      }]
                    }, ...tickets])

                    form.reset()
                    router.push('/tickets/@me')
                  }}>Enviar</Button>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container >
    </Dashboard >
  );
}
