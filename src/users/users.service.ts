/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-user.dto';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { isEmail, isPhoneNumber } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private bcrypt: BcryptService) {}
  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    const isThereUser = await this.prisma.user.findFirst({
      where: { OR: { email, phone: email } },
    });

    // In case there is a user with this email registered
    if (isThereUser)
      throw new ConflictException(
        `Este ${isEmail(email) ? 'correo' : 'teléfono'} ya está registrado`,
      );

    const passwordHash = await this.bcrypt.encrypt(password);
    const user = await this.prisma.user.create({
      data: {
        email: isEmail(email) ? email : '',
        phone: isPhoneNumber(email) ? email : '',
        name,
        password: passwordHash,
        roleId: 2,
      },
      select: {
        id: true,
        email: true,
        isProvider: true,
        name: true,
        roleId: true,
        phone: true,
        state: true,
        password: true,
        role: {
          select: {
            id: true,
            name: true,
            RolePermission: {
              select: {
                permission: {
                  select: {
                    code: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const {
      password: storedPassword,
      role: { RolePermission, ...roleRest },
      ...rest
    } = user;

    const permissions = user.role.RolePermission.map(
      ({ permission: { code } }) => code,
    );

    const newUser = {
      ...rest,
      role: {
        ...roleRest,
        permissions,
      },
    };

    return newUser;
  }

  async findAll(query: GetUsersDto) {
    const { filter, limit, page } = query;

    const quantity = await this.prisma.user.count({
      where: {
        OR: {
          name: {
            contains: `%${filter}%`,
          },
        },
      },
    });

    const users = await this.prisma.user.findMany({
      where: {
        name: {
          contains: filter,
        },
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        state: true,
        isProvider: true,
        roleId: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return { users, quantity };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        state: true,
        isProvider: true,
        roleId: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const user = await this.prisma.user.update({
      data: updateUserDto,
      where: { id },
      select: {
        id: true,
        email: true,
        isProvider: true,
        name: true,
        roleId: true,
        state: true,
        password: true,
        role: {
          select: {
            id: true,
            name: true,
            RolePermission: {
              select: {
                permission: {
                  select: {
                    code: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const {
      password: storedPassword,
      role: { RolePermission, ...roleRest },
      ...rest
    } = user;

    const permissions = user.role.RolePermission.map(
      ({ permission: { code } }) => code,
    );

    const newUser = {
      ...rest,
      role: {
        ...roleRest,
        permissions,
      },
    };

    return newUser;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.user.delete({
      where: { id },
    });
    return { id };
  }
}
