import Button from './Button';
import useModalStore from '@/store/ui/useModale';
import { ButtonWrapperProps } from '@/types/type';

const ButtonModalWrapper: React.FC<ButtonWrapperProps> = ({
  actionLabel,
  handleAction,
}) => {
  return (
    <div className="flex justify-between">
      {['Cancel', actionLabel].map((label) => (
        <div key={label} className="mt-5 h-[35px] w-[120px]">
          <Button
            label={label}
            color={label === 'Cancel' ? 'empty' : 'full'}
            type={label === 'Cancel' ? 'button' : 'submit'}
            onClick={
              label === 'Cancel'
                ? () => useModalStore.getState().closeModal()
                : (e) => handleAction(e)
            }
            disabled={false}
          />
        </div>
      ))}
    </div>
  );
};
export default ButtonModalWrapper;
