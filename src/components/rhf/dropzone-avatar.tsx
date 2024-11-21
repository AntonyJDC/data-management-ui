import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { MdImageNotSupported } from 'react-icons/md';
import { BsCameraFill } from 'react-icons/bs';
import { m } from 'framer-motion';

interface DropZoneProps {
  nameZone: string;
  label: string;
  accept?: string;
  maxSize?: number;
  onChange?: (files: FileWithIdProps[]) => void;
}

export interface FileWithIdProps extends File {
  id: string;
  preview: string;
}

const DropZoneAvatar = ({
  nameZone,
  label,
  accept = 'image/*',
  maxSize = 3 * 1024 * 1024, // Default 3MB
  onChange,
}: DropZoneProps) => {
  const [files, setFiles] = useState<FileWithIdProps[]>([]);
  const [loading, setLoading] = useState(true);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const updatedFiles = acceptedFiles.map((file) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.result) {
            const base64Image = reader.result.toString(); // Convertir a Base64
            onChange?.([{ ...file, id: uuidv4(), preview: base64Image }]); // Pasar la imagen como Base64
          }
        };
  
        reader.readAsDataURL(file); // Leer archivo como Base64
  
        return Object.assign(file, {
          id: uuidv4(),
          preview: URL.createObjectURL(file), // Mantener el preview si es necesario
        });
      });
  
      setFiles(updatedFiles);
    },
    [onChange]
  );
  

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
    },
    maxSize,
    noClick: true,
    noKeyboard: false,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const imageThumbnail = files[0]?.preview;
  const imageDesc = files[0]?.name || 'No Image';

  return (
    <section>
      <div
        id={label}
        {...getRootProps({
          className: `p-0 relative mb-1`,
        })}
      >
        <label htmlFor={nameZone}></label>
        <input {...getInputProps()} />
        <div
          className={`absolute -z-10 w-full rounded-full bg-base-200 border border-base-content h-full text-center content-center cursor-pointer animate-in fade-in duration-300 transition-opacity ${isDragActive ? 'z-10 opacity-100' : 'opacity-0'
            }`}
        >
          <p className="text-balance">Release the images here...</p>
        </div>
        <div
          onClick={open}
          className={`p-2 m-auto h-44 w-44 overflow-hidden rounded-full border animate-in fade-in duration-500 transition-colors ${isDragActive ? 'rounded-full ring-2 ring-current' : ''
            } ${imageThumbnail ? 'border-0 border-primary' : 'border-0 border-primary'}`}
        >
          <m.div
            className="relative w-full h-full overflow-hidden rounded-full"
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
              className={`bg-base-300 top-0 left-0 w-full h-full flex absolute items-center flex-col justify-center gap-y-2 rounded-full font-normal pointer-events-none sm:pointer-events-auto sm:cursor-pointer transition ${files.length > 0
                  ? 'opacity-0 hover:opacity-100 hover:font-bold hover:text-neutral-content hover:bg-neutral'
                  : 'opacity-100 hover:bg-base-300'
                }`}
            >
              <BsCameraFill className="mx-auto flex h-8 w-8" />
              <span className="text-xs">Upload photo</span>
            </div>
            <div className={`${files.length > 0 ? 'opacity-100' : 'opacity-0'}`}>
              {loading && imageThumbnail && (
                <div className="skeleton w-full h-full"></div>
              )}
              {imageThumbnail ? (
                <img
                  className="w-full h-full object-cover object-center"
                  src={imageThumbnail}
                  alt={imageDesc}
                  style={loading ? { display: 'none' } : { display: 'block' }}
                  onLoad={() => setLoading(false)}
                />
              ) : (
                <div className="bg-base-300 grid h-full w-full rounded-xl place-items-center">
                  <MdImageNotSupported size={30} />
                </div>
              )}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export { DropZoneAvatar };
