'use client';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import UserAvatar from '@/components/user-avatar';
import { useSession } from '@/app/(main)/SessionProvider';
import { useSubmitPostMutation } from './mutation';
import LoadingButton from '@/components/ui/loading-button';
import useMediaUpload, { Attachment } from './useMediaUpload';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ImageIcon, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { useDropzone } from '@uploadthing/react';
import { cn } from '@/lib/utils';

interface PostEditorProps {
  button: string;
}

export default function PostEditor({ button }: PostEditorProps) {
  const { user } = useSession();
  const t = useTranslations('home.post-editor');

  const mutation = useSubmitPostMutation();

  const {
    startUpload,
    attachments,
    isUploading,
    // uploadProgress,
    removeAttachment,
    reset: resetMediaUpload,
  } = useMediaUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: startUpload,
  });

  const { onClick, ...rootProps } = getRootProps();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: t('placeholder'),
      }),
    ],
    immediatelyRender: false,
  });

  const input =
    editor?.getText({
      blockSeparator: '\n',
    }) || '';

  function onSubmit() {
    // await submitPost(input);
    mutation.mutate(
      {
        content: input,
        mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
      },
      {
        onSuccess: () => {
          editor?.commands.clearContent();
          resetMediaUpload();
        },
      },
    );
    editor?.commands.clearContent();
  }

  function onPaste(e: React.ClipboardEvent<HTMLDivElement>) {
    const files = Array.from(e.clipboardData?.items || [])
      .filter((item) => item.kind === 'file')
      .map((item) => item.getAsFile()) as File[];
    startUpload(files);
  }

  return (
    <div>
      <div className="rounded-md border bg-bg-main ~p-3/5 shadow-md">
        <div className="flex items-center gap-5">
          <UserAvatar
            avatarUrl={user.avatarUrl}
            size={40}
            className="max-sm:hidden"
          />
          <div {...rootProps} className="w-full">
            <EditorContent
              editor={editor}
              className={cn(
                'grow max-h-[20rem] overflow-y-auto border dark:border-white/30 rounded-md bg-black/10 dark:bg-white/10 p-2',
                isDragActive && 'outline-dashed',
              )}
              onPaste={onPaste}
            />
            <input {...getInputProps()} />
          </div>
        </div>
        {!!attachments.length && (
          <div className="~mt-3/5">
            <AttachmentPreviews
              attachments={attachments}
              removeAttachment={removeAttachment}
            />
          </div>
        )}
        <div className="flex justify-end mt-5 ~gap-3/5">
          {isUploading && (
            <div className="flex items-center">
              <Loader2 className="size-5 animate-spin text-primary" />
            </div>
          )}
          <AddAttachmentsButton
            onFilesSelected={startUpload}
            disabled={isUploading || attachments.length >= 5}
          />
          <LoadingButton
            variant="transformToBottomBox"
            onClick={onSubmit}
            disabled={!input.trim() || isUploading}
            loading={mutation.isPending}
          >
            {button}
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}

interface AddAttachmentsButtonProps {
  onFilesSelected: (files: File[]) => void;
  disabled: boolean;
}

function AddAttachmentsButton({
  onFilesSelected,
  disabled,
}: AddAttachmentsButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="transformToBottomBox"
        disabled={disabled}
      >
        <ImageIcon size={20} className="dark:text-white" />
      </Button>
      <input
        type="file"
        accept="image/*, video/*"
        multiple
        ref={fileInputRef}
        className="hidden sr-only"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);

          if (files.length) {
            onFilesSelected(files);
            e.target.value = '';
          }
        }}
      />
    </>
  );
}

interface AttachmentPreviewsProps {
  attachments: Attachment[];
  removeAttachment: (filename: string) => void;
}

function AttachmentPreviews({
  attachments,
  removeAttachment,
}: AttachmentPreviewsProps) {
  return (
    <div
      className={`flex flex-col gap-3 ${attachments.length > 1 ? 'sm:grid sm:grid-cols-2' : ''}`}
    >
      {attachments.map((attachment) => (
        <AttachmentPreview
          key={attachment.file.name}
          attachment={attachment}
          onRemoveClick={() => removeAttachment(attachment.file.name)}
        />
      ))}
    </div>
  );
}

interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemoveClick: () => void;
}

function AttachmentPreview({
  attachment: { file, isUploading },
  onRemoveClick,
}: AttachmentPreviewProps) {
  const src = URL.createObjectURL(file);

  return (
    <div
      className={`relative mx-auto size-fit ${isUploading ? 'opacity-50' : ''}`}
    >
      {file.type.startsWith('image') ? (
        <Image
          src={src}
          alt="Attachment preview"
          width={500}
          height={500}
          className="size-fit max-h-[30rem] rounded-2xl"
        />
      ) : (
        <video controls className="size-fit max-h-[30rem] rounded-2xl">
          <source src={src} type={file.type} />
        </video>
      )}
      {!isUploading && (
        <button
          onClick={onRemoveClick}
          className="absolute right-3 top-3 rounded-full bg-text-title p-1 hover:bg-text-second transition-colors duration-300"
        >
          <X className="~size-3/4 text-white dark:text-green-main" />
        </button>
      )}
    </div>
  );
}
