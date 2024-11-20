import type { FieldError, FieldErrors, FieldValues } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface ErrorMessageProps {
  multipleError?: boolean;
  errors: FieldError | undefined | FieldErrors<FieldValues>;
  name: string;
}
const ErrorMessageAdapter = ({
  multipleError = false,
  name,
  errors,
}: ErrorMessageProps) => {
  return (
    <>
      {multipleError ? (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ messages }: any) => {
            let messagesCont: string[] = [];
            for (let key in messages) {
              if (Array.isArray(messages[key])) {
                messagesCont = [...messagesCont, ...messages[key]];
              } else {
                messagesCont.push(messages[key]);
              }
            }
            return (
              <ul className='pt-1'>
                {messagesCont.map((message, index) => (
                  <li
                    className='text-error animate-in fade-in duration-500'
                    key={index}
                  >
                    <span>❌ </span> {message}
                  </li>
                ))}
              </ul>
            );
          }}
        />
      ) : (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }: any) => {
            return (
              <p className='text-error animate-in fade-in duration-500'>
                {message}
              </p>
            );
          }}
        />
      )}
    </>
  );
};
ErrorMessageAdapter.displayName = 'ErrorMessageAdapter';

export { ErrorMessageAdapter };
