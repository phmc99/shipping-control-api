import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeliveryOrderEntity } from "@/domain/delivery-order/enterprise/entities/delivery-oder";
import { Prisma, DeliveryOrder, DeliveryStatus } from "@prisma/client";

export class PrismaDeliveryOrderMapper {
  static toDomain(raw: DeliveryOrder): DeliveryOrderEntity {
    return DeliveryOrderEntity.create(
      {
        trackingCode: raw.trackingCode,
        deliveryManId: new UniqueEntityID(raw.deliveryManId),
        recipientId: new UniqueEntityID(raw.recipientId),
        status: raw.status as DeliveryStatus,
        pickupAddress: raw.pickupAddress,
        deliveryAddress: raw.deliveryAddress,
        deliveryDate: raw.deliveryDate ? new Date(raw.deliveryDate) : undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(deliveryOrder: DeliveryOrderEntity): Prisma.DeliveryOrderUncheckedCreateInput {
    return {
      id: deliveryOrder.id.toString(),
      trackingCode: deliveryOrder.trackingCode || "",
      deliveryManId: deliveryOrder.deliveryManId.toString(),
      recipientId: deliveryOrder.recipientId.toString(),
      status: deliveryOrder.status as DeliveryStatus,
      pickupAddress: deliveryOrder.pickupAddress,
      deliveryAddress: deliveryOrder.deliveryAddress,
      deliveryDate: deliveryOrder.deliveryDate ? deliveryOrder.deliveryDate.toISOString() : null,
      createdAt: deliveryOrder.createdAt.toISOString(),
      updatedAt: deliveryOrder.updatedAt.toISOString(),
    };
  }
}
