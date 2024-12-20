import clsx from 'clsx';

export const headerClass = (name: string) =>
  clsx(
    name === 'checked' && 'w-10 flex-none lg:w-16',
    name === 'filename' && 'grow',
    name !== 'checked' && name !== 'filename' && 'w-[105px] flex-none lg:w-32',
    (name === 'modified' || name === 'acces') && 'hidden sm:block',
    'px-2'
  );
