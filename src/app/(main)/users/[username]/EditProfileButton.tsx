'use client';

import { Button } from '@/components/ui/button';
import { UserData } from '@/lib/types';
import { useState } from 'react';
import EditPropfileDialog from './EditProfileDialog';

interface EditProfileButtonProps {
  user: UserData;
}

export default function EditProfileButton({ user }: EditProfileButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button
        variant="transformToBottomBox"
        className="h-fit"
        onClick={() => setShowDialog(true)}
      >
        Edit profile
      </Button>
      <EditPropfileDialog
        user={user}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
}
