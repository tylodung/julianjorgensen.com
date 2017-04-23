let moment = require('moment');

let processInvoices = function(overdueInvoices) {
  let promise = new Promise(function(resolve, reject) {
    let invoicesToSendReminder = [];

    let today = moment().startOf('day');

    overdueInvoices.map((invoice) => {
      let lastSentDate = invoice.CustomField[1].StringValue;
      let paidDate = invoice.CustomField[0].StringValue;

      console.log('\n\n\n\nid: ', invoice.Id);
      console.log('lastSentDate: ', lastSentDate);
      console.log('paidDate: ', paidDate);

      if(!paidDate){
        if (lastSentDate){
          lastSentDate = moment(lastSentDate, 'DD-MM-YYYY'); //correct formatting
          let daysSinceSentLast = Math.round(moment.duration(today - lastSentDate).asDays());

          if (daysSinceSentLast > 7){
            invoicesToSendReminder.push(invoice.Id);
          }
        }else{
          invoicesToSendReminder.push(invoice.Id);
        }

        // console.log('\n\n\n\nid: ', invoice.Id);
        // console.log('lastSentDate: ', lastSentDate);
        // console.log('today: ', today);
        // console.log('paidDate: ', paidDate);
        // console.log('daysSinceSentLast: ', daysSinceSentLast);


      }
    });

    resolve(invoicesToSendReminder);
  }).catch((err) => {
    console.log('Error processing reminder invoice...', err);
  });
  return promise;
};

module.exports = processInvoices;