import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BOOKING_CONSUMER } from 'src/consts/consumers.const';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingRepository } from './repository/booking.repository';

@Module({
  imports: [
    ClientsModule.register({
      clients: [
        {
          name: BOOKING_CONSUMER,
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'booking-api',
              brokers: ['localhost:9092'],
            },
            consumer: {
              groupId: 'check-booking',
            },
          },
        },
      ],
    }),
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository],
})
export class BookingModule {}
