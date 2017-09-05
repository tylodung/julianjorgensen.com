import React from 'react';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

import InvoiceHeader from './components/InvoiceHeader';
import InvoiceItems from './components/InvoiceItems';
import InvoiceSummary from './components/InvoiceSummary';
import styles from './index.css';

export default class InvoiceDetails extends React.Component {
  render() {
    let { invoice, customer, paid } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.id}><label>Invoice</label>{invoice.id}</div>

        <div className={styles.body}>
          <div className={styles.status}>
            {paid ? 'Paid on xx/xx/xxxx' : `${numeral(invoice.balance).format('$0,0.00')} is due on April 2017`}
          </div>

          <div className={styles.note}>
            Some more detail here...
          </div>

          <div className={styles.container}>
            <InvoiceHeader {...this.props} />
            <InvoiceItems {...this.props} />
            <InvoiceSummary {...this.props} />
          </div>

          <footer className={styles.footer}>
            <div className={styles.col}>
              <label>Notes</label>
              <div className={styles.description}>{invoice.notes}</div>
            </div>

            <div className={styles.col}>
              <label>Late Fees</label>
              <div className={styles.description}>
                If this invoice is unpaid by Jul 24, 2017, a non-compounding late fee of 3.0% accrues monthly on the outstanding amount.
              </div>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}