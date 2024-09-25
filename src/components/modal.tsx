'use client';

import { Modal as MantineModal } from '@mantine/core';
import { useModalEntityStore } from '~/store/modal-entity';

export function Modal({ children }: { children?: React.ReactNode }) {
  const store = useModalEntityStore();

  return (
    <MantineModal
      opened={store.opened && store.data !== null}
      onClose={store.close}
      title={store.data?.label}
      withCloseButton={false}
      closeOnEscape={false}
      closeOnClickOutside={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      {store.data && children}
    </MantineModal>
  );
}
