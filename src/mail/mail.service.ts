import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { News } from 'src/news/news.interface';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail() {
    return this.mailerService
      .sendMail({
        to: 'vidmantest@mail.ru',
        subject: 'Первое тестовое письмо',
        template: './test',
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  async sendNewNewsForAdmins(emails: string[], news: News): Promise<void> {
    for (const email of emails) {
      await this.mailerService
        .sendMail({
          to: email,
          subject: `Создана новость: ${news.title}`,
          template: './new-news',
          context: news,
        })
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }

  async sendUpdatedNewsForAdmins(
    emails: string[],
    data: Partial<News>,
    oldTitle: string,
  ): Promise<void> {
    for (const email of emails) {
      await this.mailerService
        .sendMail({
          to: email,
          subject: `Отредактирована новость: ${oldTitle}`,
          template: './updated-news',
          context: data,
        })
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }
}
