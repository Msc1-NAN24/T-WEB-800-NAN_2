import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {createProxyMiddleware} from "http-proxy-middleware";
import {NestExpressApplication} from "@nestjs/platform-express";
import {Logger} from "@nestjs/common";

class App {

  private _app: NestExpressApplication;
  private _port = process.env.GATEWAY_PORT || 3000;

  constructor() {
    this.init().then(() => {
      Logger.log('API Gateway initialized !')
      this.start();
    });
  }

  async init() {
    this._app = await NestFactory.create<NestExpressApplication>(AppModule);
    this.config();
    this.proxy();
  }

  config() {
    const config = new DocumentBuilder()
      .setTitle('ATrip API')
      .setDescription('ATrip API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(this._app, config);
    SwaggerModule.setup('api', this._app, document);

    this._app.enableCors({
      origin: 'http://localhost:3000'
    })
  }

  proxy() {
    this._app.use('/places', createProxyMiddleware({
      target: 'http://172.17.0.1:4003',
      pathRewrite: {
        '/places': '/'
      },
      changeOrigin: true,
    }));

    this._app.use('/events', createProxyMiddleware({
      target: 'http://172.17.0.1:4004',
      pathRewrite: {
        '/events': '/'
      },
      changeOrigin: true,
    }));
  }

  start() {
    this._app.listen(this._port).then(() => {
      Logger.log(`API Gateway started at: http://localhost:${this._port}/`);
    });
  }
}

new App();