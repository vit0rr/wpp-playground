import { Message, MessageMedia } from 'whatsapp-web.js';
import { imgflipCaption } from '../../imgflip/imgflipCaption';
import imageToBase64 from 'image-to-base64';

const drakeMessage = async (msg: Message) => {
  if (!msg.body) {
    return;
  }

  const [text0, text1] = msg.body
    .replace('!drake', '')
    .split('-')
    .map((text) => text.trim());

  if (!text0 || !text1) {
    return;
  }

  const imgFlipCaptionResult = await imgflipCaption({
    randomTemplatedId: '181913649',
    text0,
    text1,
  });

  if (!imgFlipCaptionResult.success) {
    return msg.reply(imgFlipCaptionResult.error);
  }

  const base64 = await imageToBase64(imgFlipCaptionResult.url);

  const replyMedia = new MessageMedia('image/png', base64);

  msg.reply(replyMedia, undefined, {
    sendMediaAsSticker: true,
  });
};

export default drakeMessage;
