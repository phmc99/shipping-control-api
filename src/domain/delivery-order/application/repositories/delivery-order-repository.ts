import { DeliveryOrderEntity } from '../../enterprise/entities/delivery-oder';

export abstract class DeliveryOrderRepository {
  // abstract findById(id: string): Promise<Answer | null>
  // abstract findManyByQuestionId(
  //   questionId: string,
  //   params: PaginationParams,
  // ): Promise<Answer[]>

  abstract create(deliveryOrder: DeliveryOrderEntity): Promise<void>
  //abstract save(answer: Answer): Promise<void>
  //abstract delete(answer: Answer): Promise<void>
}