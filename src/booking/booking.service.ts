import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { BookingRepository } from './repository/booking.repository';
import { BOOKING_CONSUMER } from 'src/consts/consumers.const';
import { ClientKafka } from '@nestjs/microservices';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ERoute } from './enum/routes.enum';
import { IBookingCheckPayload } from './types/booking-check-payload.types';
import { Status } from 'generated/prisma';

@Injectable()
export class BookingService {
  constructor(
    @Inject(BOOKING_CONSUMER) private readonly kafka: ClientKafka,
    private readonly repository: BookingRepository,
  ) {}

  async findBookingById(id: string) {
    try {
      return this.repository.getBooking(id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async createNewBooking(dto: CreateBookingDto) {
    try {
      const booking = await this.repository.createBooking(dto);
      await this.repository.updateBookingStatus(booking.id, Status.CHECKING_AVAILABILITY);
      this.kafka.emit<ERoute, IBookingCheckPayload>(ERoute.BOOKING_CHECK, {
        bookingId: booking.id,
      });
      return { bookingId: booking.id };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
