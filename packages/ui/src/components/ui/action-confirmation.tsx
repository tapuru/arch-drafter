import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogPortal
} from './alert-dialog';

type Props = {
  classNameButtons?: string;
  classNameMessage?: string;
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  confirmationText?: string;
  rejectionText?: string;
  onReject?: () => void;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
};

export function ActionConfirmation({
  classNameButtons,
  classNameMessage,
  isOpen,
  message,
  onConfirm,
  confirmationText = 'OK',
  rejectionText = 'No',
  onReject,
  setIsOpen,
  title,
}: Props) {
  return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogPortal>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription className={classNameMessage}>
                {message}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className={classNameButtons}>
              {onReject && (
                  <AlertDialogCancel onClick={onReject}>
                    {rejectionText}
                  </AlertDialogCancel>
              )}
              <AlertDialogAction onClick={onConfirm}>
                {confirmationText}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
  );
}
