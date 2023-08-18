import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionMessageCode } from './exception_message_code.enum';

export class GenericException extends HttpException {
    constructor(statusCode: HttpStatus, messageCode: ExceptionMessageCode, message?: string, statusText?: string) {
        super(
            {
                statusCode,
                messageCode,
                message,
                statusText,
            },
            statusCode,
        );
    }
}
