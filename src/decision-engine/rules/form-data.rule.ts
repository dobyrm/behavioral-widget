import { Injectable } from '@nestjs/common';
import { IRule } from '../interfaces/rule.interface';
import { DecisionResult } from '../types/decision-result.type';
import { IFormData } from '../../statistics/interfaces/form-data.interface';

@Injectable()
class FormDataRule implements IRule<IFormData> {
  evaluate(data: IFormData): DecisionResult {
    if (data.getName()) {
      return {
        behavior: 'approved',
        timestamp: Date.now(),
        activityLevel: 'high',
        action: 'showBanner',
      };
    }

    return {
      behavior: 'pending',
      timestamp: Date.now(),
      activityLevel: 'low',
    };
  }
}

export default FormDataRule;
