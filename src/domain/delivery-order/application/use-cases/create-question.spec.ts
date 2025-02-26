import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { CreateDeliveryOrderUseCase } from './create-delivery-order'
import { InMemoryDeliveryOrderRepository } from 'test/repositories/in-memory-delivery-order-repository'

let inMemoryDeliveryOrderRepository: InMemoryDeliveryOrderRepository
let sut: CreateDeliveryOrderUseCase

describe('Create Delivery Order', () => {
  beforeEach(() => {
    inMemoryDeliveryOrderRepository = new InMemoryDeliveryOrderRepository()
    sut = new CreateDeliveryOrderUseCase(inMemoryDeliveryOrderRepository)
  })

  it('should be able to create a Delivery Order', async () => {
    const deliveryOrder = await sut.execute({
      deliveryAddress: "Rua Armando de Godi",
      pickupAddress: "Rua Miguel Angelo",
      deliveryManId: "1",
      recipientId: "2"
    })

    expect(deliveryOrder.isRight()).toBe(true)
    expect(inMemoryDeliveryOrderRepository.items[0]).toEqual(deliveryOrder.value?.delivery_order)

  })
})
