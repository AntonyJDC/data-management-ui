import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { type Control, type FieldValues, useController } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/utils/utils';
import { ErrorMessageAdapter } from './error-message-adapter';
import { toast } from 'sonner';
import { MdImageNotSupported } from 'react-icons/md';
import { BsCameraFill } from 'react-icons/bs';
import {m} from 'framer-motion';
import { AddContactFormValues } from '@/presentation/admin/validations/addContactSchema';

interface DropZoneProps {
  nameZone: string;
  control: Control<AddContactFormValues & FieldValues, any>;
  label: string;
  gridClass?: string;
  [x: string]: any;
}

export interface FileWithIdProps extends File {
  id: string;
  preview: string;
}

const DropZoneAvatar = ({
  nameZone,
  label,
  accept,
  control,
}: DropZoneProps) => {
  console.log('Render DropZone Avatar');

  const [loading, setLoading] = useState(true);

  const {
    field: { value, onChange, ref, name },
    formState: { errors },
  } = useController({
    name: nameZone,
    control,
    defaultValue: [],
  });

  const onDrop = useCallback(
    (acceptedFiles: any, rejectedFiles: any) => {
      if (acceptedFiles?.length) {
        const updatedFiles = [
          ...acceptedFiles.map((file: any) =>
            Object.assign(file, {
              id: uuidv4(),
              preview: URL.createObjectURL(file),
              uploaded: false,
            })
          ),
        ];
        onChange(updatedFiles);
      }
      if (rejectedFiles?.length) {
        rejectedFiles.map((file: any) => {
          file.errors.map((error: any) => {
            toast.error(file.file.name, {
              description: error.message,
            });
          });
        });
      }
    },
    [value, onChange]
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: accept,
    maxSize: 3 * 1024 * 1024,
    noClick: true,
    noKeyboard: false,
  });

  useEffect(() => {
    return () =>
      value.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, []);

  useEffect(() => {
    if (errors[name]) {
      const divDrop = document.getElementById(label);
      if (divDrop) {
        divDrop.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    }
  }, [errors[name]]);

  const imageThumbnail = value[0]?.preview;
  const imageDesc = value[0]?.name || 'No Image';

  return (
    <section>
      <div
        id={label}
        {...getRootProps({
          className: `p-0 relative mb-1`,
        })}
      >
        <label htmlFor={name}></label>
        <input ref={ref} {...getInputProps({ name: name })} />
        <div
          className={cn(
            'absolute -z-10 w-full rounded-full bg-base-200 border border-base-content h-full text-center content-center cursor-pointer animate-in fade-in duration-300 transition-opacity',
            isDragActive ? 'z-10 opacity-100' : 'opacity-0'
          )}
        >
          <p className='text-balance'>Release the images here...</p>
        </div>
        <div
          onClick={open}
          className={`p-2 m-auto h-44 w-44 overflow-hidden rounded-full border animate-in fade-in duration-500 transition-colors  ${
            isDragActive ? 'rounded-full ring-2 ring-current' : ''
          } ${errors[name] ? 'border-error text-error hover:border-error' : ''}
          ${
            imageThumbnail
              ? 'border-0 border-primary'
              : 'border-2 border-dashed'
          }
          `}
        >
          <m.div
            className='relative w-full h-full overflow-hidden rounded-full'
            initial={{ boxShadow: '0 0 5px oklch(var(--p) / 0.5)' }}
            animate={{
              boxShadow: [
                '0 0 5px oklch(var(--p) / 0.5)',
                '0 0 15px oklch(var(--p) / 0.8)',
                '0 0 5px oklch(var(--p) / 0.5)',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <div
              className={`bg-base-300 top-0 left-0 w-full h-full flex absolute items-center flex-col justify-center gap-y-2 rounded-full font-normal pointer-events-none sm:pointer-events-auto sm:cursor-pointer transition ${
                value.length > 0
                  ? 'opacity-0 hover:opacity-100 hover:font-bold hover:text-neutral-content hover:bg-neutral/60'
                  : 'opacity-100 hover:bg-base-300/50'
              }`}
            >
              <BsCameraFill className='mx-auto flex h-8 w-8' />
              <span className='text-xs'>Upload photo</span>
            </div>
            <div
              className={`${value.length > 0 ? 'opacity-100' : 'opacity-0'}`}
            >
              {loading && imageThumbnail && (
                <div className='skeleton w-full h-full'></div>
              )}
              {imageThumbnail ? (
                <img
                  className='w-full h-full object-cover object-center'
                  src={imageThumbnail}
                  alt={imageDesc}
                  style={loading ? { display: 'none' } : { display: 'block' }}
                  onLoad={() => setLoading(false)}
                />
              ) : (
                <div className='bg-base-300 grid h-full w-full rounded-xl place-items-center'>
                  <MdImageNotSupported size={30} />
                </div>
              )}
            </div>
          </m.div>
        </div>
      </div>
      <ErrorMessageAdapter errors={errors} name={name} multipleError={false} />
    </section>
  );
};

DropZoneAvatar.displayName = 'DropZoneAvatar';

export { DropZoneAvatar };
