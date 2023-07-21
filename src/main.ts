import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

const start = async () => {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });

  await app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} port`);
  });
};

start();
