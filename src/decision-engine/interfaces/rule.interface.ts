import { DecisionResult } from '../types/decision-result.type';

export interface IRule<TInput> {
  evaluate(data: TInput): DecisionResult;
}
