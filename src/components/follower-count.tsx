'use client';
import useFollowerInfo from '@/hooks/useFollowerInfo';
import { FollowerInfo } from '@/lib/types';
import { formatNumber } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface FollowerCountProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowerCount({
  userId,
  initialState,
}: FollowerCountProps) {
  const t = useTranslations('');
  const { data } = useFollowerInfo(userId, initialState);
  return (
    <span className="">
      {t('follow-title')}:{' '}
      <span className="font-semibold">{formatNumber(data.followers)}</span>
    </span>
  );
}
