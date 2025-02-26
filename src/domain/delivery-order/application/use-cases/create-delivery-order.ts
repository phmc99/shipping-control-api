import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { DeliveryOrderRepository } from '../repositories/delivery-order-repository'
import { DeliveryStatus } from '@prisma/client'
import { DeliveryOrderEntity } from '../../enterprise/entities/delivery-oder'

interface CreateDeliveryOrderUseCaseRequest {
  deliveryManId: string;
  recipientId: string;
  pickupAddress: string;
  deliveryAddress: string;
}

type CreateDeliveryOrderUseCaseResponse = Either<
  null,
  {
    delivery_order: DeliveryOrderEntity
  }
>

@Injectable()
export class CreateDeliveryOrderUseCase {
  constructor(private deliveryOrderRepository: DeliveryOrderRepository) {}

  async execute({
    deliveryManId,
    recipientId,
    pickupAddress,
    deliveryAddress
  }: CreateDeliveryOrderUseCaseRequest): Promise<CreateDeliveryOrderUseCaseResponse> {
    const deliveryOrder = DeliveryOrderEntity.create({
      deliveryManId: new UniqueEntityID(deliveryManId),
      recipientId: new UniqueEntityID(recipientId),
      status: DeliveryStatus.PENDING,
      pickupAddress,
      deliveryAddress,
      trackingCode: undefined,
      deliveryDate: undefined
    });

    await this.deliveryOrderRepository.create(deliveryOrder)


    return right({
      delivery_order: deliveryOrder,
    })
  }
}
