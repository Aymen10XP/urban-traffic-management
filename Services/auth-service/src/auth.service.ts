import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { RegisterInput, LoginInput, AuthPayload } from './dto/auth.input';
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

  private generateToken(user: User): string {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }
}