/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LoginDto } from './dto/login.dto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private bcrypt: BcryptService,
    private jwtService: JwtService,
  ) {}

  /**
   *
   * @param {LoginDto} dtoLogin
   * @returns
   */
  async signIn(dtoLogin: LoginDto) {
    const { email } = dtoLogin;

    // Query
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        roleId: true,
        isProvider: true,
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

    // If not exits
    if (!user) throw new UnauthorizedException();

    // If is banned
    if (!user.state) throw new UnauthorizedException('Deshabilitado');

    // If password match
    const isEqual = await this.bcrypt.compare(dtoLogin.password, user.password);
    if (!isEqual)
      throw new UnauthorizedException('Contraseña o Email incorrectos');

    // Destructuring
    const {
      password,
      role: { RolePermission, ...roleRest },
      ...rest
    } = user;

    // Creating an array of permissions <string>
    const permissions = user.role.RolePermission.map(
      ({ permission: { code } }) => code,
    );

    // Creating a new object
    const newUser = {
      ...rest,
      role: {
        ...roleRest,
        permissions,
      },
    };

    // Generating and return a token and user
    return {
      token: await this.jwtService.signAsync(newUser, {
        secret: process.env.JWT_SECRET,
      }),
      user: newUser,
    };
  }

  async signUp(dtoRegister: RegisterDto) {
    const { email, name, password } = dtoRegister;

    const isThereUser = await this.prisma.user.findFirst({
      where: { email },
    });

    // In case there is a user with this email registered
    if (isThereUser)
      throw new ConflictException('Este correo ya está registrado');

    const passwordHash = await this.bcrypt.encrypt(password);
    const user = await this.prisma.user.create({
      data: {
        email,
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

    return {
      token: await this.jwtService.signAsync(newUser, {
        secret: process.env.JWT_SECRET,
      }),
      newUser,
    };
  }
}
