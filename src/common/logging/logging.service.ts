import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class LoggingService {
  private logFilePath = 'app.log';

  private logToFile(data: string) {
    fs.appendFileSync(this.logFilePath, data + '\n');
  }

  logRequest(url: string, method: string) {
    const logMessage = `Incoming request: ${method} ${url}`;
    this.logToFile(logMessage);
  }

  logError(error: any, context?: string) {
    const logMessage = `Error in ${context || 'Unknown context'}: ${error}`;
    this.logToFile(logMessage);
  }
}
