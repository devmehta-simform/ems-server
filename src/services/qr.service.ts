import { type RequestHandler } from 'express';
import { RequestHandlerWrapper } from '../utils';
import QrCode from 'qrcode';

function getQr(data: unknown) {
  return new Promise((resolve, reject) => {
    QrCode.toBuffer(JSON.stringify(data), (err, buf) => {
      if (err) reject(err);
      resolve(buf);
    });
  });
}

export const createQr: RequestHandler = RequestHandlerWrapper(async function (req, res, _next) {
  const data = await getQr(req.body);
  return res.status(200).end(data);
});
