import { Name, Timestamp } from '../types/statistics.type';
import { IFormData } from '../interfaces/form-data.interface';

class FormSubmissionDto implements IFormData {
  constructor(
    private readonly name: Name,
    private readonly timestamp: Timestamp,
  ) {}

  public getName(): Name {
    return this.name;
  }

  public getTimestamp(): Timestamp {
    return this.timestamp;
  }
}

export default FormSubmissionDto;
