import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createAdminIfNotExists(): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@autoshow.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await this.findByEmail(adminEmail);

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await this.prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
        },
      });
      console.log(`Usuário admin criado: ${adminEmail}`);
    } else {
      console.log('Usuário admin já existe. Seed ignorado.');
    }
  }
}
