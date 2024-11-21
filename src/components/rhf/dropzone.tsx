import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { type Control, type FieldValues, useController } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { FaImages } from 'react-icons/fa';
import { DndGallery } from '../shared';
import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { MeasuringStrategy } from '@dnd-kit/core';
import { cn } from '../../utils/utils';
import { ErrorMessageAdapter } from './error-message-adapter';
import { toast } from 'sonner';

interface DropZoneProps {
  nameZone: string;
  control: Control<FieldValues, any>;
  label: string;
  gridClass?: string;
  [x: string]: any;
}

export interface FileWithIdProps extends File {
  id: string;
  preview: string;
}

const DropZone = (props: DropZoneProps) => {
  console.log('Render DropZone');
  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });
  const { nameZone, gridClass, label, className, accept, control } = props;
  const {
    field: { value, onChange, ref, name },
    formState: { errors },
  } = useController({
    name: nameZone,
    control,
    defaultValue: [],
  });

  /*   const [rejected, setRejected] = useState<any>([]);
   */
  const onDrop = useCallback(
    (acceptedFiles: any, rejectedFiles: any) => {
      if (acceptedFiles?.length) {
        const updatedFiles = [
          ...value,
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
        /* setRejected((previousFiles: any) => [
          ...previousFiles,
          ...rejectedFiles.map((file: any) => {
            file.errors.map((error: any) => {
              toast.error(file.file.name, {
                description: error.message,
              });
            });
            return file;
          }),
        ]); */
      }
    },
    [value, onChange]
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: accept,
    maxSize: 1024 * 1000,
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
          block: 'center', // Esto desplazará el div hacia arriba
          inline: 'nearest',
        });
      }
    }
  }, [errors[name]]);

  return (
    <section>
      {/* <button type='button' onClick={() => toast('My first toast')}>Give me a toast</button> */}
      <div
        id={label}
        {...getRootProps({
          className: `p-0 relative ${
            isDragActive ? 'rounded-lg ring-2 ring-current' : ''
          }`,
        })}
      >
        <label htmlFor={name}></label>
        <input ref={ref} {...getInputProps({ name: name })} />

        <div
          className={cn(
            'absolute -z-10 w-full rounded-lg bg-base-200 border border-dashed border-base-content h-full text-center content-center cursor-pointer animate-in fade-in duration-300 transition-opacity',
            isDragActive ? 'z-10 opacity-100' : 'opacity-0'
          )}
        >
          <p>Release the images here...</p>
          <p className='text-xs leading-5 '>PNG, JPG, GIF up to 10MB</p>
        </div>
        <div
          className={`${isDragActive ? 'opacity-0 ' : 'opacity-100'} ${
            value.length > 0 ? 'flex' : 'hidden'
          }`}
        >
          <DndGallery
            gridClass={gridClass}
            strategy={rectSortingStrategy}
            adjustScale={true}
            wrapperClassNames={({ index, isDragging }) => {
              if (index === 0) {
                return (
                  (isDragging ? 'brightness-110' : '') +
                  ' col-span-2 rounded-lg md:col-span-2 row-span-2 md:row-span-2'
                );
              } else {
                return (
                  (isDragging ? 'brightness-110' : '') +
                  ' col-span-1 row-span-1 rounded-lg'
                );
              }
            }}
            animateLayoutChanges={animateLayoutChanges}
            measuring={{
              droppable: { strategy: MeasuringStrategy.Always },
            }}
            removable
            items={value}
            setItems={onChange}
            open={open}
          />
        </div>
        <div
          onClick={open}
          className={`${className} relative animate-in fade-in duration-500 ${
            isDragActive ? 'rounded-lg ring-2 ring-current' : ''
          } ${value.length > 0 ? 'hidden' : 'flex'} ${
            errors[name] ? 'border-error text-error hover:border-error' : ''
          }`}
        >
          <div className='text-center'>
            <FaImages className='mx-auto h-12 w-12 ' />
            <div className='mt-4 flex text-sm leading-6 '>
              <p>
                Drag and drop some images here, or click to select images from
                the select images
              </p>
            </div>
            <p className='text-xs leading-5 '>PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      <ErrorMessageAdapter errors={errors} name={name} multipleError={false} />
    </section>
  );
};

DropZone.displayName = 'DropZone';

export { DropZone };
