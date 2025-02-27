import { CurrentUser } from "@/infra/auth/current-user-decorator"
import { UserPayload } from "@/infra/auth/jwt.strategy"
import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { z } from "zod"
import { ZodValidationPipe } from "../pipes/zod-validation-pipe"
import { CreateDeliveryOrderUseCase } from "@/domain/delivery-order/application/use-cases/create-delivery-order"


const createDeliveryOrderSchema = z.object({
  deliveryManId: z.string().uuid(),
  recipientId: z.string().uuid(),
  pickupAddress: z.string().min(1, "Pickup address is required"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
});

const bodyValidationPipe = new ZodValidationPipe(createDeliveryOrderSchema)

type CreateDeliveryOrderBodySchema = z.infer<typeof createDeliveryOrderSchema>

@Controller('/delivery-orders')
export class CreateDeliveryOrderController {
  constructor(private createDeliveryOrder: CreateDeliveryOrderUseCase) { }

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateDeliveryOrderBodySchema,
    //@CurrentUser() user: UserPayload,
  ) {
    //const userId = user.sub

    const { deliveryManId, recipientId, pickupAddress, deliveryAddress } = createDeliveryOrderSchema.parse(body);

    const result = await this.createDeliveryOrder.execute({
      deliveryManId,
      recipientId,
      pickupAddress,
      deliveryAddress,
    });

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
