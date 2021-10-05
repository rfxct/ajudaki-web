import { useRouter } from 'next/router'

import Image from 'next/image'
import { Container, Col, Card, CardBody, CardTitle, Row } from 'reactstrap'
import { Common } from '../../layouts'

import { Long } from '../../util/DateUtil'

export default function Ticket({ }) {
  const router = useRouter()
  const { ticket_id } = router.query

  const ticketData = {
    title: 'Lorem Ipsum',
    author: 'Marcos',
    timeline: [{
      avatar: 'https://avatars.dicebear.com/v2/initials/Marcos.svg',
      username: 'Marcos',
      description: 'Alvejou a militância de seus iguais, silenciados pela heteronormatividade patriarcal com o intuito egoístico que transcendem a normalidade dos fatos. Ressignificou inverdades dos indivíduos silenciados por seus lugares de dores sendo contraproducente com quem é diferente de você.',
      createdAt: Date.now() - 8.64e+7
    }, {
      avatar: 'https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg',
      username: 'Rafael',
      description: 'Gaio de pau quebrando,  moto estralando, engastiando na boca estaca de pau e quebrando os dente tudo. Casca de pau, vaca entrando no meio de roça!, engrenagem enpenando, casca de pau,  moto estralando, engrenagem enpenando. Moto estralando tenénénénénénénénéné, cambio de trator engastaindo, equipamento estourando.',
      createdAt: Date.now() - (8.64e+7 * 3.3)
    }]
  }

  return (
    <Common>
      <Container className="bg-gradient-dark h-100 pb-8 pt-5 pt-md-8" fluid>
        <p>Ticket id: {ticket_id}</p>


        <h1>Título: {ticketData.title}</h1>
        <div className="p-4">
          {ticketData.timeline.sort((a, b) => b.createdAt - a.createdAt).map((topic, i, { length }) => (
            <>
              <Card key={i}>
                <CardBody>
                  <Row>
                    <Col xs='1'>
                      <Image
                        className="rounded-circle"
                        width="100%" height="100%"
                        src={topic.avatar}
                        alt={`#${i}#${topic.username}`}
                      />
                    </Col>
                    {/* Topic Author info */}
                    <Col xs="11" className='pl-0'>
                      <CardTitle className="text-dark font-weight-bold mb-0">
                        {topic.username}
                      </CardTitle>
                      <span className="text-muted h5 mb-0">
                        {Long.format(topic.createdAt)}
                      </span>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-sm">
                    {topic.description}
                  </p>
                </CardBody>
              </Card>
            </>
          ))}
        </div>
      </Container>
    </Common>
  )
}
