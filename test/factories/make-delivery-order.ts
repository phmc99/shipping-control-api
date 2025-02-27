import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeliveryOrderEntity, DeliveryOrderProps } from "@/domain/delivery-order/enterprise/entities/delivery-oder";
import { PrismaDeliveryOrderMapper } from "@/infra/database/prisma/mappers/prisma-delivery-order-mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";

export function makeDeliveryOrder(
  override: Partial<DeliveryOrderProps> = {},
  id?: UniqueEntityID,
) {
  const deliveryOrder = DeliveryOrderEntity.create(
    {
      deliveryManId: new UniqueEntityID(),
      recipientId: new UniqueEntityID(),
      trackingCode: faker.string.uuid(),
      pickupAddress: faker.location.streetAddress(),
      deliveryAddress: faker.location.streetAddress(),
      status: 'PENDING',
      deliveryDate: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...override,
    },
    id,
  );

  return deliveryOrder;
}

@Injectable()
export class DeliveryOrderFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaDeliveryOrder(
    data: Partial<DeliveryOrderProps> = {},
  ): Promise<DeliveryOrderEntity> {
    const deliveryOrder = makeDeliveryOrder(data);

    await this.prisma.deliveryOrder.create({
      data: PrismaDeliveryOrderMapper.toPrisma(deliveryOrder),
    });

    return deliveryOrder;
  }
}
