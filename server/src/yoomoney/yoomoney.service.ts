import { Injectable } from '@nestjs/common';
import { YooCheckout, ICreatePayment } from "@a2seven/yoo-checkout";
import * as uuid from 'uuid';

@Injectable()
export class YoomoneyService {

    private readonly yooCheckout = new YooCheckout({
        shopId: `${process.env.YOOMONEY_SHOPID}`,
        secretKey: `${process.env.YOOMONEY_SECRET_KEY}`,
    });

    async checkout(dto) {
        const { value } = dto;

        const idempotenceKey = uuid.v4();

        const createPayload: ICreatePayment = {
            amount: {
                value: value,
                currency: "RUB",
            },
            confirmation: {
                type: "embedded",
                return_url: "test",
            }
        }

        try {
            const payment = await this.yooCheckout.createPayment(createPayload, idempotenceKey);
            return payment
        } catch (error) {
            console.log(error);
        }
    }
}
