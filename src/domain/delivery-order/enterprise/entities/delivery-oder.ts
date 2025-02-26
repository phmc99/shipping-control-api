import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { DeliveryStatus, User, DeliveryImage } from "@prisma/client";

export interface DeliveryOrderProps {
  trackingCode?: string;
  deliveryManId: UniqueEntityID;
  recipientId: UniqueEntityID;
  status: DeliveryStatus;
  pickupAddress: string;
  deliveryAddress: string;
  deliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class DeliveryOrderEntity extends AggregateRoot<DeliveryOrderProps> {
  get trackingCode() {
    return this.props.trackingCode;
  }

  get deliveryManId() {
    return this.props.deliveryManId;
  }

  get recipientId() {
    return this.props.recipientId;
  }

  get status() {
    return this.props.status;
  }

  set status(status: DeliveryStatus) {
    this.props.status = status;
    this.touch();
  }

  get pickupAddress() {
    return this.props.pickupAddress;
  }

  get deliveryAddress() {
    return this.props.deliveryAddress;
  }

  get deliveryDate() {
    return this.props.deliveryDate;
  }

  set deliveryDate(date: Date | undefined) {
    this.props.deliveryDate = date;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<DeliveryOrderProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    const deliveryOrder = new DeliveryOrderEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );

    return deliveryOrder;
  }
}
