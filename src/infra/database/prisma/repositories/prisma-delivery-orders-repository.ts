import { Injectable } from "@nestjs/common";
import { PrismaDeliveryOrderMapper } from "../mappers/prisma-delivery-order-mapper";
import { PrismaService } from "../prisma.service";
import { DeliveryOrderEntity } from "@/domain/delivery-order/enterprise/entities/delivery-oder";
import { DeliveryOrderRepository } from "@/domain/delivery-order/application/repositories/delivery-order-repository";

@Injectable()
export class PrismaDeliveryOrdersRepository implements DeliveryOrderRepository {
  constructor(private prisma: PrismaService) {}

  // async findById(id: string): Promise<DeliveryOrder | null> {
  //   const deliveryOrder = await this.prisma.deliveryOrder.findUnique({
  //     where: { id },
  //   });

  //   if (!deliveryOrder) {
  //     return null;
  //   }

  //   return PrismaDeliveryOrderMapper.toDomain(deliveryOrder);
  // }

  async create(deliveryOrder: DeliveryOrderEntity): Promise<void> {
    const data = PrismaDeliveryOrderMapper.toPrisma(deliveryOrder);

    await this.prisma.deliveryOrder.create({ data });
  }

  // async save(deliveryOrder: DeliveryOrder): Promise<void> {
  //   const data = PrismaDeliveryOrderMapper.toPrisma(deliveryOrder);

  //   await this.prisma.deliveryOrder.update({
  //     where: { id: deliveryOrder.id.toString() },
  //     data,
  //   });
  // }
}
