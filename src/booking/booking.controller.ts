import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly service: BookingService) {}

  @Get(':bookingId')
  async getBookingById(@Param('bookingId') id: string) {
    return this.service.findBookingById(id);
  }

  @Post()
  async createNewBooking(@Body() body: CreateBookingDto) {
    return this.service.createNewBooking(body);
  }
}
