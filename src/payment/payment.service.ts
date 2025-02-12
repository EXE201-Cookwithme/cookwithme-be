import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import PayOS = require('@payos/node');
import { PaymentLinkData } from 'src/constants';

@Injectable()
export class PaymentService {
  configService = new ConfigService();
  private readonly payOs: PayOS;
  private readonly YOUR_DOMAIN =
    this.configService.get<string>('COOKWITHME_FE');
  PAYOS_CLIENT_ID = this.configService.get<string>('PAYOS_CLIENT_ID');
  PAYOS_API_KEY = this.configService.get<string>('PAYOS_API_KEY');
  PAYOS_CHECKSUM_KEY = this.configService.get<string>('PAYOS_CHECKSUM_KEY');
  constructor() {
    if (
      !this.PAYOS_CLIENT_ID ||
      !this.PAYOS_API_KEY ||
      !this.PAYOS_CHECKSUM_KEY
    ) {
      throw new Error(
        'Missing PayOS configuration. Please check your .env file.',
      );
    }

    this.payOs = new PayOS(
      this.PAYOS_CLIENT_ID,
      this.PAYOS_API_KEY,
      this.PAYOS_CHECKSUM_KEY,
    );
  }

  async createPaymentLink(): Promise<any> {
    const paymentBody: PaymentLinkData = {
      orderCode: Number(String(Date.now()).slice(-6)),
      amount: 2000,
      description: 'Cookwithme Service',
      items: [
        {
          name: 'Register Cookwithme serivice',
          quantity: 1,
          price: 59000,
        },
      ],
      returnUrl: this.YOUR_DOMAIN + '/payment/success',
      cancelUrl: this.YOUR_DOMAIN + '/payment/cancel',
    };

    return await this.payOs.createPaymentLink(paymentBody);
  }

  async getPaymentLinkInformation(id: string): Promise<any> {
    return await this.payOs.getPaymentLinkInformation(id);
  }

  async cancelPaymentLink(id: string): Promise<any> {
    return await this.payOs.cancelPaymentLink(id);
  }

  async confirmWebhook(): Promise<any> {
    return await this.payOs.confirmWebhook('null');
  }

  // async verifyPaymentWebhookData(): Promise<any> {

  //     const webhookBody: WebhookDataType = {
  //         "code": "string",
  //         "desc": "string",
  //         "data": {
  //             "orderCode": 123,
  //             "amount": 3000,
  //             "description": "VQRIO123",
  //             "accountNumber": "12345678",
  //             "reference": "TF230204212323",
  //             "transactionDateTime": "2023-02-04 18:25:00",
  //             "currency": "VND",
  //             "paymentLinkId": "124c33293c43417ab7879e14c8d9eb18",
  //             "code": "00",
  //             "desc": "Thành công",
  //             "counterAccountBankId": "",
  //             "counterAccountBankName": "",
  //             "counterAccountName": "",
  //             "counterAccountNumber": "",
  //             "virtualAccountName": "",
  //             "virtualAccountNumber": ""
  //         },
  //         "signature": "8d8640d802576397a1ce45ebda7f835055768ac7ad2e0bfb77f9b8f12cca4c7f"
  //     };
  //     return await this.payOs.verifyPaymentWebhookData(webhookBody);
  // }
}
