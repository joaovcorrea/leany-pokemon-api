/**
 * PONTO DE ENTRADA DA APLICAÇÃO
 *
 * Este arquivo é o primeiro a rodar quando você executa `npm run start:dev`.
 * Responsabilidades:
 * - Criar e iniciar o servidor NestJS
 * - Ativar validação automática dos DTOs (ValidationPipe)
 * - Configurar o Swagger em /docs
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Valida todo body/query que chega nos DTOs (ex: @IsString, @IsNotEmpty)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos que não estão no DTO
      forbidNonWhitelisted: true, // rejeita se vier campo extra
      transform: true, // converte tipos automaticamente
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Leany Pokémon API')
    .setDescription(
      'API RESTful para gerenciar Treinadores, Times e Pokémon utilizando a PokeAPI.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Aplicação rodando em http://localhost:${port}`);
  console.log(`Swagger disponível em http://localhost:${port}/docs`);
}

bootstrap();
