'use client';
import Card from '@/components/Card'

const DashboardCard = ({ title, count = 0, suffix }) => {
  return (
    <Card className="rounded-2xl bg-blue-200">
      <div className="flex flex-col gap-2">
        <div className="text-zinc-600">{title}</div>
        <div className="flex flex-row gap-2 items-end font-semibold">
          <div className="text-2xl">{count}</div>
          <div className="">{suffix}</div>
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
