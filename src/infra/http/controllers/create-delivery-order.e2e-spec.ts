import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { randomUUID } from 'crypto'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'

describe('Create Delivery Order (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test.only('[POST] /delivery-orders', async () => {
    const admin = await studentFactory.makePrismaStudent()
    const deliveryMan = await studentFactory.makePrismaStudent()
    const costumer = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: admin.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/delivery-orders')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        deliveryManId: deliveryMan.id, 
        recipientId: costumer.id,
        pickupAddress: '123 Street A',
        deliveryAddress: '456 Street B',
      })

    expect(response.statusCode).toBe(201)

    const deliveryOrderOnDatabase = await prisma.deliveryOrder.findFirst({
      where: {
        trackingCode: '123456789',
      },
    });

    expect(deliveryOrderOnDatabase).toBeTruthy();
    expect(deliveryOrderOnDatabase?.pickupAddress).toBe('123 Street A');
    expect(deliveryOrderOnDatabase?.deliveryAddress).toBe('456 Street B');
    expect(deliveryOrderOnDatabase?.deliveryManId).toBe('some-deliveryman-id');
  })
})
