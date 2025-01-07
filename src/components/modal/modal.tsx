import { FC, memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { TModalProps } from './type';
import { ModalUI } from '@ui';
import { useLocation, useParams } from 'react-router-dom';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  const { number } = useParams<{ number: string }>();

  const [titleStyle, setTitleStyle] = useState('text_type_digits-default');
  useEffect(() => {
    if (/feed|profile/i.test(location.pathname)) {
      setTitleStyle('text_type_main-large');
    }
  });
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalUI title={number} onClose={onClose} titleStyle={titleStyle}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
