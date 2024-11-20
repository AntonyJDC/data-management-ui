import React, { useEffect, useState } from 'react';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import type { Transform } from '@dnd-kit/utilities';

import styles from './Item.module.css';
import { cn } from '../../../../../utils/utils';
import { MdClose, MdDragIndicator, MdImageNotSupported } from 'react-icons/md';
import { FileWithIdProps } from '../../../../rhf/dropzone';

export interface Props {
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  handleProps?: any;
  height?: number;
  index?: number;
  data?: FileWithIdProps;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  wrapperClassNames?: string;
  value: React.ReactNode;
  onRemove?(): void;
  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: Props['transform'];
    transition: Props['transition'];
    value: Props['value'];
  }): React.ReactElement;
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        data,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        wrapperClassNames,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = 'grabbing';

        return () => {
          document.body.style.cursor = '';
        };
      }, [dragOverlay]);

      const [loading, setLoading] = useState(true);
      const imageThumbnail = data?.preview;
      const imageDesc = data?.name || 'No Image';
      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <li
          className={cn(
            wrapperClassNames,
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay,
            'aspect-[1/1] overflow-hidden'
          )}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(', '),
              '--translate-x': transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              '--translate-y': transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              '--scale-x': transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              '--scale-y': transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              '--index': index,
              '--color': color,
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div className='absolute right-0 top-0 z-10'>
            {onRemove ? (
              <button
                type='button'
                className={cn(
                  'btn btn-primary btn-square btn-sm text-red-700',
                  styles.Remove
                )}
                onClick={onRemove}
              >
                <MdClose size={20} />
              </button>
            ) : null}
            {handle ? (
              <button
                className='btn btn-ghost btn-sm'
                cursor='grab'
                data-cypress='draggable-handle'
                {...handleProps}
                {...listeners}
              >
                <MdDragIndicator />
              </button>
            ) : null}
          </div>
          <div
            className={cn(
              styles.Item,
              dragging && styles.dragging,
              handle && styles.withHandle,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
              color && styles.color
            )}
            style={style}
            data-cypress='draggable-item'
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
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
              <div className='bg-base-300 grid h-16 w-16 rounded-xl place-items-center'>
                <MdImageNotSupported size={30} />
              </div>
            )}
          </div>
        </li>
      );
    }
  )
);
