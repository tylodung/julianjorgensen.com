import React from 'react';
import moment from 'moment-timezone';
import _ from 'lodash';
import numeral from 'numeral';

import TimeEntryDetails from './TimeEntryDetails';
import styles from './index.css';

export default class InvoiceItems extends React.Component {
  render() {
    let { invoice, customer, paid } = this.props;

    return (
      <div className={styles.container}>
        {invoice.dateRange ?
          <div className={styles.dateRange}>
            <label>Date range</label>
            <date>{moment(invoice.dateRange[0], 'DD-MM-YYYY').format('MMMM Do YYYY')} - {moment(invoice.dateRange[1], 'DD-MM-YYYY').format('MMMM Do YYYY')}</date>
          </div> : ''}

        <header className={styles.header}>
          <div className={styles.description}>
            <label>Description</label>
          </div>
          <div className={styles.units}>
            <label>Hours</label>
          </div>
          <div className={styles.rate}>
            <label>Rate</label>
          </div>
          <div className={styles.total}>
            <label>Total</label>
          </div>
        </header>

        <div className={styles.items}>
          {
            invoice.items.map((item, index) => {
              if (!item.SalesItemLineDetail){
                return false;
              }
              return (
                <div className={styles.item} key={index}>
                  <div className={styles.description}>
                    {item.SalesItemLineDetail.ItemRef.name}: {item.Description}
                  </div>
                  <div className={styles.units}>
                    {item.SalesItemLineDetail.Qty}
                  </div>
                  <div className={styles.rate}>
                    {numeral(item.SalesItemLineDetail.UnitPrice).format('$0,0.00')}
                  </div>
                  <div className={styles.total}>
                    {numeral(item.Amount).format('$0,0.00')}
                  </div>
                </div>
              )
            })
          }
        </div>

        <TimeEntryDetails />
      </div>
    )
  }
}
