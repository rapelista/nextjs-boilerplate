'use client';

import { create } from 'zustand';
import { DataTableDefaultActionKeyType } from '~/types/data-table';
import { BaseEntityType } from '~/types/entity';

export type ModalEntityStoreData<TData> = {
  label: string;
  entity: TData;
  state: DataTableDefaultActionKeyType;
};

export type ModalEntityStore<TData> = {
  opened: boolean;
  data: ModalEntityStoreData<TData> | null;

  open: (data: ModalEntityStoreData<TData>) => void;
  close: () => void;
};

export const createModalEntityStore = <TData extends BaseEntityType>() =>
  create<ModalEntityStore<TData>>((set) => ({
    opened: true,
    data: null,

    open: (data) => set({ opened: true, data }),
    close: () => set({ opened: false, data: null }),
  }));

export const useModalEntityStore = createModalEntityStore();
