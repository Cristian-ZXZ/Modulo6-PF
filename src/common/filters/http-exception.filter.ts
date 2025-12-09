import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
catch(exception: HttpException, host: ArgumentsHost) {
const ctx = host.switchToHttp();
const response = ctx.getResponse();
const status = exception.getStatus();
const error = exception.getResponse() as any;


response.status(status).json({
success: false,
data: null,
message: (error && error.message) || exception.message || 'Error',
});
}
}