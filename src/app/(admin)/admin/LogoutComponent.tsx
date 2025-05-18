'use client';

import { logout } from '@/app/(auth)/action';
import { useQueryClient } from '@tanstack/react-query';

const LogoutComponent = () => {
  const queryClient = useQueryClient();
  const handleLogout = () => {
    queryClient.clear();
    logout();
  };
  return <div onClick={handleLogout}>admin</div>;
};

export default LogoutComponent;
