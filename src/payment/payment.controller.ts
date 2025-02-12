import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PaymentService } from './payment.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment-link')
  async createPaymentLink(@Res() res: Response) {
    try {
      const paymentLinkResponse = await this.paymentService.createPaymentLink();
      res.json(paymentLinkResponse);
    } catch (error) {
      console.error('Payment creation error:', error);
      res.status(500).json({
        message: 'Failed to create payment link',
        error: error.message,
      });
    }
  }

  @ApiParam({ name: 'id', type: String })
  @Get('payment-link-information/:id')
  async getPaymentLinkInformation(
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const paymentLinkResponse =
        await this.paymentService.getPaymentLinkInformation(id);
      res.json(paymentLinkResponse);
    } catch (error) {
      console.error('Payment link information error:', error);
      res.status(500).json({
        message: 'Failed to get payment link information',
        error: error.message,
      });
    }
  }

  @Post('cancel-payment-link/:id')
  async cancelPaymentLink(@Res() res: Response) {
    try {
      const paymentLinkResponse =
        await this.paymentService.cancelPaymentLink('id');
      res.json(paymentLinkResponse);
    } catch (error) {
      console.error('Payment link cancelation error:', error);
      res.status(500).json({
        message: 'Failed to cancel payment link',
        error: error.message,
      });
    }
  }

  @Post('/receive-webhook')
  async confirmWebhook(@Res() res: Response) {
    try {
      const webhookResponse = await this.paymentService.confirmWebhook();
      res.json(webhookResponse);
    } catch (error) {
      console.error('Webhook confirmation error:', error);
      res.status(500).json({
        message: 'Failed to confirm webhook',
        error: error.message,
      });
    }
  }
}
