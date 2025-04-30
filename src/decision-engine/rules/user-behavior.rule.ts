import { Injectable } from '@nestjs/common';
import { IRule } from '../interfaces/rule.interface';
import { DecisionResult } from '../types/decision-result.type';
import { IUserBehavior } from '../../statistics/interfaces/user-behavior.interface';

@Injectable()
class UserBehaviorRule implements IRule<IUserBehavior> {
  evaluate(data: IUserBehavior): DecisionResult {
    if (data.getEvents().length > 20) {
      return {
        behavior: 'analyzed',
        timestamp: Date.now(),
        activityLevel: 'high',
        action: 'displayForm',
      };
    }

    return {
      behavior: 'engaged',
      timestamp: Date.now(),
      activityLevel: 'medium',
    };
  }
}

export default UserBehaviorRule;
