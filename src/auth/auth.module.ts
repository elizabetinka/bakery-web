import { Module } from '@nestjs/common';
import { AuthStateService } from './auth-state.service';

@Module({
  providers: [AuthStateService],
  exports: [AuthStateService],
})
export class AuthModule {}
