import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentView } from '@/store/features/walletSlice';
import { ContentViewE } from '@/store/models/state-machine.types';
import { RootState } from '@/store/store';

import { Button } from '../button';
import { InnerWrapper } from '../inner-wrapper';

import styles from './success-withdraw.module.css';

const mockFundsSent = '0.001'; //TODO: replace with real value when send will be implemented

export const SuccessWithdraw: FC = () => {
  const dispatch = useDispatch();
  const address = useSelector((state: RootState) => state.wallet.address);

  const handleChangeView = () => {
    dispatch(setCurrentView(ContentViewE.Wallet));
  };

  return (
    <>
      <h1 className={styles.header}>Success !</h1>
      <InnerWrapper>
        <p className={styles.paragraph}>Bitcoins sent!</p>
        <p className={styles.funds}>{mockFundsSent} BTC</p>
        <p className={styles.fromAddress}>{address}</p>
        <Button label="Back" onClick={handleChangeView} />
      </InnerWrapper>
    </>
  );
};
