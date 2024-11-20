
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '../../ui/alert-dialog';

interface CustomAlertDialogProps {
  isOpen: any;
  setIsOpen: any;
  title: any;
  description: any;
  cancelText: any;
  actionText: any;
  onAction: any;
  IconComponent: any;
  actionButtonClass: any;
  onCancel?: any;
}

export const CustomAlertDialog = ({
  isOpen,
  setIsOpen,
  title,
  description,
  cancelText,
  actionText,
  onAction,
  IconComponent,
  actionButtonClass,
  onCancel = () => {},
}: CustomAlertDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className='p-0 bg-base-100 border-base-200 gap-0'>
        <div className='px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
          <div className='sm:flex items-center sm:items-start'>
            <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10'>
              <IconComponent />
            </div>
            <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
              <AlertDialogTitle className='text-lg font-semibold'>
                {title}
              </AlertDialogTitle>
              <div className='mt-2'>
                <AlertDialogDescription className='text-base'>
                  {description}
                </AlertDialogDescription>
              </div>
            </div>
          </div>
        </div>
        <AlertDialogFooter className='bg-base-200 gap-2 px-4 py-3 rounded-b-md sm:rounded-b-lg'>
          <AlertDialogCancel
            onClick={() => {
              setIsOpen(false);
              onCancel && onCancel();
            }}
            className='btn btn-outline btn-sm rounded-md text-sm font-semibold shadow-sm'
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setIsOpen(false);
              onAction();
            }}
            className={`btn btn-sm rounded-md text-sm font-semibold shadow-sm ${actionButtonClass}`}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
