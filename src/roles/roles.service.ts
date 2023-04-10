import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}
  async create(createRoleDto: CreateRoleDto) {
    const { name, permissions } = createRoleDto;
    const newPermissions: Array<string> = [];

    // Creating a new Role
    const role = await this.prisma.role.create({
      data: { name },
    });

    // Creating every permission role
    for (const permissionCode of permissions) {
      // Getting permission by code
      const permission = await this.prisma.permission.findFirst({
        where: { code: permissionCode },
      });

      // If not exist
      if (permission === null) continue;

      // Saving all existing codes
      newPermissions.push(permission.code);

      // Creating a role permission
      await this.prisma.rolePermission.create({
        data: { idPermission: permission.id, idRole: role.id },
      });

      createRoleDto.permissions = newPermissions;
    }
    return createRoleDto;
  }

  async findAll() {
    const roles = await this.prisma.role.findMany({
      select: {
        name: true,
        id: true,
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
    });

    const newRoles = roles.map((role) => {
      const { RolePermission, ...roleRest } = role;
      const permissions = RolePermission.map((item) => item.permission.code);
      return { ...roleRest, permissions };
    });

    return newRoles;
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      select: {
        name: true,
        id: true,
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
    });

    if (role === null) throw new NotFoundException('Rol no encontrado');

    const { RolePermission, ...restRole } = role;
    const permissions = RolePermission.map((item) => item.permission.code);

    return { ...restRole, permissions };
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { name, permissions } = updateRoleDto;
    const newPermissions: Array<string> = [];

    // Updating role
    await this.prisma.role.update({
      data: { name },
      where: { id },
    });

    // Deleting all permission role
    await this.prisma.rolePermission.deleteMany({
      where: { idRole: id },
    });

    for (const permissionCode of permissions) {
      // Getting permission by code
      const permission = await this.prisma.permission.findFirst({
        where: { code: permissionCode },
      });

      // If not exist
      if (permission === null) continue;

      // Saving all existing codes
      newPermissions.push(permission.code);

      // Creating a role permission
      await this.prisma.rolePermission.create({
        data: { idPermission: permission.id, idRole: id },
      });

      updateRoleDto.permissions = newPermissions;
    }

    return { ...updateRoleDto, id };
  }

  async remove(id: number) {
    await this.prisma.rolePermission.deleteMany({
      where: { idRole: id },
    });
    return await this.prisma.role.delete({
      where: { id },
    });
  }
}
