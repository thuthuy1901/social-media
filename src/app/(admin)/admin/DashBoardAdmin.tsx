'use client';
import { logout } from '@/app/(auth)/action';
import { useQueryClient } from '@tanstack/react-query';

const DashBoardAdmin = () => {
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    queryClient.clear();
    logout(true);
  };

  return <div onClick={handleLogout}>Logout</div>;
};

export default DashBoardAdmin;
