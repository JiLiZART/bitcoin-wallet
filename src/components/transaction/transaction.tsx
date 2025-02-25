import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { ArrowUpCircleIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

import { Transaction } from '@/store/models/state-machine.types';
import { SATOSHY } from '@/store/services/query';
import { RootState } from '@/store/store';

import styles from './transaction.module.css';
import classNames from 'classnames';

interface TransactionProps {
  transaction: Transaction;
}

export const TransactionRow: FC<TransactionProps> = ({ transaction }) => {
  const address = useSelector((state: RootState) => state.wallet.address);

  const addressTo = transaction.vout[0].scriptpubkey_address;

  const addressFrom = transaction.vout.filter((vout) => vout.scriptpubkey_address !== address)[0]
    .scriptpubkey_address;

  const isSentTransaction = address !== transaction.vout[0].scriptpubkey_address;

  return (
    <a
      href={`https://blockstream.info/testnet/tx/${transaction.txid}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.transactionRoot}
    >
      <div className={classNames(styles.iconWrapper, { [styles.turnIcon]: isSentTransaction })}>
        <ArrowUpCircleIcon width={24} height={24} className={styles.icon} />
      </div>
      <div className={styles.column}>
        <div className={styles.row}>
          <span className={styles.paragraph}>{isSentTransaction ? 'Sent' : 'Recieved'}</span>
          {transaction.status.confirmed && (
            <CheckBadgeIcon width={18} height={18} className={styles.check} />
          )}
        </div>
        <p className={styles.textAdderss}>
          {isSentTransaction ? `To ${addressTo}` : `From ${addressFrom}`}
        </p>
      </div>
      <p className={classNames({ [styles.amountBlockRecieved]: !isSentTransaction })}>
        +{transaction.vout[0].value / SATOSHY} BTC
      </p>
    </a>
  );
};
