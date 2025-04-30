import { Module } from '@nestjs/common';
import { DecisionEngineService } from './decision-engine.service';
import SessionDataRule from './rules/session-data.rule';
import UserBehaviorRule from './rules/user-behavior.rule';
import FormDataRule from './rules/form-data.rule';

@Module({
  providers: [
    DecisionEngineService,
    SessionDataRule,
    UserBehaviorRule,
    FormDataRule,
  ],
  exports: [DecisionEngineService],
})
export class DecisionEngineModule {}
