import { create } from 'zustand';
import { CheckBoxState } from '@/types/storeType';

export const useCheckBox = create<CheckBoxState>((set) => ({
  toggleFileChecked: (fileId: string) =>
    set((state) => ({
      files: state.files
        ? state.files.map((file) =>
            file.id === fileId ? { ...file, isChecked: !file.isChecked } : file
          )
        : [],
    })),

  setAllFilesChecked: (isChecked: boolean) =>
    set((state) => ({
      files: state.files
        ? state.files.map((file) => ({
            ...file,
            isChecked,
          }))
        : [],
    })),

  resetCheckedFiles: () =>
    set((state) => ({
      files: state.files
        ? state.files.map((file) => ({
            ...file,
            isChecked: false,
          }))
        : [],
    })),
}));
