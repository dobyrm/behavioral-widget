import { IStatisticsData } from '../interfaces/statistics-data.interface';
import {
  IName,
  ITimestamp,
  IFormData,
} from '../interfaces/form-data.interface';

class FormSubmissionDto implements IFormData, IStatisticsData {
  constructor(
    private readonly name: IName,
    private readonly timestamp: ITimestamp,
  ) {}

  getName(): IName {
    return this.name;
  }

  getTimestamp(): ITimestamp {
    return this.timestamp;
  }
}

export default FormSubmissionDto;
