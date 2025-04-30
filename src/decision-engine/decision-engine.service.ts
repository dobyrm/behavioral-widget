import { Injectable, Logger } from '@nestjs/common';
import { ISessionData } from '../statistics/interfaces/session-data.interface';
import { IUserBehavior } from '../statistics/interfaces/user-behavior.interface';
import { IFormData } from '../statistics/interfaces/form-data.interface';
import SessionDataRule from './rules/session-data.rule';
import UserBehaviorRule from './rules/user-behavior.rule';
import FormDataRule from './rules/form-data.rule';
import { DecisionResult } from './types/decision-result.type';

@Injectable()
export class DecisionEngineService {
  private readonly logger = new Logger(DecisionEngineService.name);

  constructor(
    private readonly sessionDataRule: SessionDataRule,
    private readonly userBehaviorRule: UserBehaviorRule,
    private readonly formDataRule: FormDataRule,
  ) {}

  public evaluateSessionData(data: ISessionData): DecisionResult {
    try {
      return this.sessionDataRule.evaluate(data);
    } catch (error) {
      this.logger.error(
        `Failed to evaluate session data. Error: ${error.message}`,
      );
      throw new Error('Failed to evaluate session data');
    }
  }

  public evaluateUserBehavior(data: IUserBehavior): DecisionResult {
    try {
      return this.userBehaviorRule.evaluate(data);
    } catch (error) {
      this.logger.error(
        `Failed to evaluate user behavior. Error: ${error.message}`,
      );
      throw new Error('Failed to evaluate user behavior');
    }
  }

  public evaluateFormData(data: IFormData): DecisionResult {
    try {
      return this.formDataRule.evaluate(data);
    } catch (error) {
      this.logger.error(
        `Failed to evaluate form data. Error: ${error.message}`,
      );
      throw new Error('Failed to evaluate form data');
    }
  }
}
