'use client';

import Card from '@/components/Card'
import ContentTitle from '@/components/dashboard/ContentTitle'
import DashboardCard from '@/components/dashboard/DashboardCard'
import MainWrapper from '@/components/dashboard/MainWrapper'

const DashboardPage = () => {
  return (
    <MainWrapper>
      <ContentTitle title="Dashboard" />
      <div className="grid grid-cols-4 gap-6 mt-4">
        <DashboardCard title="Jumlah User" count={150} suffix="User" />
        <DashboardCard title="Jumlah User Aktif" count={150} suffix="User" />
        <DashboardCard title="Jumlah Produk" count={150} suffix="Produk" />
        <DashboardCard
          title="Jumlah Produk Aktif"
          count={150}
          suffix="Produk"
        />
      </div>
    </MainWrapper>
  );
};

export default DashboardPage;
