let _ = require('lodash');
let ENV_CONFIG = require('./utils').getEnvConfig();
let billingItemMailer = require('../emails/billingItem/init');

function processItemData(item) {
  return new Promise((resolve, reject) => {
    if (!item) {
      reject();
    }

    let customerId = item.CustomerRef.value;
    qbo.getCustomer(customerId, (error, customer) => {
      if (error) reject(error);

      let itemAndCustomer = {
        item: item,
        customer: customer
      };
      resolve(itemAndCustomer);
    });
  });
};
module.exports.processItemData = processItemData;


function mailItem({
  item,
  itemType,
  eventType
}) {
  return new Promise((resolve, reject) => {
    if (!item) {
      reject();
    }

    console.log('got item details from webhook: ', item);

    // get last sent date
    let lastSentDateObj = _.find(item.CustomField, {
      'Name': ENV_CONFIG.QBO_SENT_LABEL
    });
    let lastSentDate = lastSentDateObj ? lastSentDateObj.StringValue : null;

    console.log('last sent date', lastSentDate);
    console.log('item balance', item.balance);
    console.log('send item?', !lastSentDate && item.balance > 0);

    if (!lastSentDate && item.Balance > 0) {
      // send the item
      billingItemMailer.send({
        id: item.Id,
        itemType,
        eventType
      }).then(() => {
        console.log(`Billing item #${item.DocNumber} sent!`);
        resolve(`Billing item #${item.DocNumber} sent!`);
      }).catch((err) => {
        reject(`Error sending billing item #${Item.DocNumber}...`);
      });
    } else {
      console.log('nothing to send');
      resolve('Nothing to send');
    }
  }).catch((err) => {
    return err;
  });
};
module.exports.mailItem = mailItem;