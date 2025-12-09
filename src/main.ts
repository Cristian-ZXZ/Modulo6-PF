import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptotrs/transform.interceptor';


async function bootstrap() {
const app = await NestFactory.create(AppModule);


app.useGlobalPipes(
new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
);


app.useGlobalInterceptors(new TransformInterceptor());
app.useGlobalFilters(new HttpExceptionFilter());


const config = new DocumentBuilder()
.setTitle('TechHelpDesk API')
.setDescription('API de soporte técnico')
.setVersion('1.0')
.addBearerAuth()
.build();


const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);


await app.listen(process.env.PORT || 3000);
console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();