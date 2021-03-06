import React, { Component } from 'react';
import Footer from 'containers/Footer';
import LoadingSpinner from 'components/LoadingSpinner';
import { getItem } from '../../qboUtils';
import { InvoiceBody } from '../../components/Body';
import PaymentOptions from '../../components/PaymentOptions';
import styles from './index.css';

export default class Invoice extends Component {
  state = {
    item: null,
  }

  componentDidMount() {
    // Retrieve invoice data
    const { id } = this.props.match.params;
    const { token } = this.props.match.params;

    getItem('invoice', id, token).then((response) => {
      const { error, item, customer } = response;
      if (error) {
        this.setState({
          error,
        });
      } else {
        // set state
        this.setState({
          item,
          customer,
          paid: item.paid || false,
        });

        // trigger callback
        this.props.onLoaded();
      }
    });
  }

  markAsPaid = () => {
    this.setState({
      paid: true,
    });

    // trigger callback
    this.props.onLoaded();
  }

  render() {
    const {
      item,
      customer,
      paid,
      error,
    } = this.state;

    if (!item && !error) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <LoadingSpinner />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.error}>{error}</div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <InvoiceBody
            item={item}
            customer={customer}
            paid={paid}
          />
          <PaymentOptions
            item={item}
            customer={customer}
            paid={paid}
            markAsPaid={this.markAsPaid}
            onLoaded={() => this.props.onLoaded()}
          />
        </div>
        <Footer faq />
      </div>
    );
  }
}
