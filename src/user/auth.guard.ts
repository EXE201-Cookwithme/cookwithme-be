import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
  mixin,
  Type,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

export function AuthenticationGuard(): Type<CanActivate> {
  @Injectable()
  class AuthenticationGuardMixin implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }
      try {
        const payload = this.jwtService.verify(token);
        request.userId = payload.userId;
      } catch (e) {
        Logger.error(e.message);
        throw new UnauthorizedException('Invalid token');
      }
      return true;
    }

    private extractTokenFromHeader(request): string | null {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
      }
      return authHeader.split(' ')[1];
    }
  }

  return mixin(AuthenticationGuardMixin);
}
