import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { Status } from 'generated/prisma';

@Injectable()
export class BookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getBooking(id: string) {
    return this.prisma.booking.findUnique({ where: { id } });
  }

  async createBooking(data: CreateBookingDto) {
    return this.prisma.booking.create({ data });
  }

  async updateBookingStatus(id: string, status: Status) {
    return this.prisma.booking.update({ where: { id }, data: { status } });
  }
}
