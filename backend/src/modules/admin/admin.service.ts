import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DatabaseService } from '../database/database.service';
import { Role } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly databaseService: DatabaseService) {}
  async becomeAdmin(userId: string) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const admin = await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        role: Role.ADMIN,
      }
    });

    return {
      message: 'User is now an admin',
      admin,
    };
  }

  async findAllUsers() {
    return await this.databaseService.user.findMany({
      where: {
        role: Role.USER,
      },
      orderBy: {
        registeredAt: 'desc',
      },
    });
  }

  async findAllAdmins() {
    return await this.databaseService.user.findMany({
      where: {
        role: Role.ADMIN,
      },
      orderBy: {
        registeredAt: 'desc',
      },
    });
  }

  async findAllReports() {
    return await this.databaseService.crimeReport.findMany({
      orderBy: {
        postTime: 'desc',
      },
      include: {
        comments: true,
        user: true,
      }
    });
  }

  async findUserById(userId: string) {
    return await this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        comments: true,
        crimes: true,
        votes: true,
      }
    });
  }

  async banUser(userId: string) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if(user.role === Role.ADMIN) 
      throw new BadRequestException('Cannot ban an admin');

    const bannedUser = await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        isBanned: true,
      }
    });

    return {
      message: 'User is now banned',
      bannedUser,
    };
  }

  async deleteUser(userId: string) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if(user.role === Role.ADMIN) 
      throw new BadRequestException('Cannot delete an admin');

    await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        deleted: true,
      }
    });

    return {
      message: 'User is now deleted',
    };
  }

  async unbanUser(userId: string) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const unbannedUser = await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        isBanned: false,
      }
    });

    return {
      message: 'User is now unbanned',
      unbannedUser
    };
  }

  async findBannedUsers() {
    return await this.databaseService.user.findMany({
      where: {
        isBanned: true,
      },
      orderBy: {
        registeredAt: 'desc',
      },
    });
  }

  async removeReport(reportId: string) {
    await this.databaseService.crimeReport.update({
      where: {
        id: reportId,
      },
      data: {
        hidden: true,
      }
    });
    return {
      message: 'Report is now removed',
    }
  }

  async removeComment(commentId: string) {
    await this.databaseService.comment.update({
      where: {
        id: commentId,
      },
      data: {
        hidden: true,
      }
    });
    return {
      message: 'Comment is now removed',
    }
  }
}
