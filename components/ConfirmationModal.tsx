import { Transition } from '@headlessui/react';

type Props = {
  show: boolean;
  title: string;
  confirmText: string;
  onClickBackdrop?: () => void;
  confirmButton: JSX.Element;
  cancelButton: JSX.Element;
};

export default function ConfirmationModal({
  show,
  title,
  confirmText,
  onClickBackdrop,
  confirmButton,
  cancelButton,
}: Props) {
  return (
    <Transition show={show}>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-10 text-center sm:block sm:p-0">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {(ref) => (
              <div
                ref={ref}
                className="fixed inset-0 transition-opacity"
                onClick={onClickBackdrop}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
            )}
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {(ref) => (
              <div
                ref={ref}
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                role="dialog"
              >
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      {title}
                    </h3>
                    <div className="mt-2">
                      <p>{confirmText}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 space-y-2 sm:space-y-0 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  {cancelButton}
                  {confirmButton}
                </div>
              </div>
            )}
          </Transition.Child>
        </div>
      </div>
    </Transition>
  );
}
