import { Injectable } from '@nestjs/common';
import { IRule } from '../interfaces/rule.interface';
import { DecisionResult } from '../types/decision-result.type';
import { ISessionData } from '../../statistics/interfaces/session-data.interface';

@Injectable()
class SessionDataRule implements IRule<ISessionData> {
  evaluate(data: ISessionData): DecisionResult {
    if (!data.getDevice().browser) {
      return {
        behavior: 'inactive',
      };
    }

    return {
      behavior: 'active',
    };
  }
}

export default SessionDataRule;
