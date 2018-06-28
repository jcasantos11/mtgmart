const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '3fe68a1b',
  apiSecret: 'w4VkPDI5Lg60mq1V'
});

const from = 'Nexmo';
const to = '639063509436';
const text = 'You have Posted an Item';

nexmo.message.sendSms(from, to, text, (error, response) => {
  if(error) {
    throw error;
  } else if(response.messages[0].status != '0') {
    console.error(response);
    throw 'Nexmo returned back a non-zero status';
  } else {
    console.log(response);
  }
});