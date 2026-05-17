import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { RegisterInput, LoginInput, AuthPayload, UpdateUserInput } from './dto/auth.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(input: RegisterInput): Promise<AuthPayload> {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: input.email }, { username: input.username }],
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = this.userRepository.create({
      ...input,
      password: hashedPassword,
      role: input.role || UserRole.OPERATOR,
    });

    await this.userRepository.save(user);
    const token = this.generateToken(user);

    return { user, token };
  }

  async login(input: LoginInput): Promise<AuthPayload> {
    const user = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user);
    return { user, token };
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(input: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: input.id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${input.id} not found`);
    }

    if (input.email || input.username) {
      const conflictingUser = await this.userRepository.findOne({
        where: [
          ...(input.email ? [{ email: input.email, id: Not(input.id) }] : []),
          ...(input.username ? [{ username: input.username, id: Not(input.id) }] : []),
        ],
      });

      if (conflictingUser) {
        throw new ConflictException('Another user already uses this email or username');
      }
    }

    if (input.email !== undefined) {
      user.email = input.email;
    }

    if (input.username !== undefined) {
      user.username = input.username;
    }

    if (input.role !== undefined) {
      user.role = input.role;
    }

    if (input.password !== undefined) {
      user.password = await bcrypt.hash(input.password, 10);
    }

    return this.userRepository.save(user);
  }

  async removeUser(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.delete(id);
    return true;
  }

  private generateToken(user: User): string {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }
}
