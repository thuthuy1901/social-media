import { useRef } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import 'cropperjs/dist/cropper.css';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';

interface CropImageDialogProps {
  src: string;
  cropAspectRatio: number;
  onCropped: (blob: Blob | null) => void;
  onClose: () => void;
}

export default function CropImageDialog({
  src,
  cropAspectRatio,
  onClose,
  onCropped,
}: CropImageDialogProps) {
  const t = useTranslations('crop-image-box');
  const cropperRef = useRef<ReactCropperElement>(null);

  function crop() {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    cropper.getCroppedCanvas().toBlob((blob) => onCropped(blob), 'image/webp');
    onClose();
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-text-title">{t('title')}</DialogTitle>
        </DialogHeader>
        <Cropper
          src={src}
          aspectRatio={cropAspectRatio}
          guides={false}
          zoomable={false}
          ref={cropperRef}
          className="mx-auto size-fit max-h-[calc(100vh-150px)]"
        />
        <DialogFooter>
          <Button onClick={onClose} variant="dotted">
            {t('cancel')}
          </Button>
          <Button onClick={crop} variant="dotted">
            {t('crop')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
