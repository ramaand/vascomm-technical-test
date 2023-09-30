'use client';
import React, { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import {
  FaEye,
  FaPencil,
  FaPencilAlt,
  FaTrash,
} from 'react-icons/fa'

import useDeleteDialog from '@/hooks/useDeleteDialog'
import useProductModal from '@/hooks/useProductModal'
import { cn, formatCurr } from '@/lib/utils'

import ActionButton from '@/components/ActionButton'
import ActiveBadge from '@/components/ActiveBadge'
import Card from '@/components/Card'
import ContentTitle from '@/components/dashboard/ContentTitle'
import MainWrapper from '@/components/dashboard/MainWrapper'
import { RenderIf } from '@/components/RenderIf'

const columns = (productModal, deleteDialog) => {
  return [
    {
      name: 'No',
      selector: (row, index) => {
        return index + 1;
      },
      width: '50px',
    },
    {
      name: 'Nama Produk',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Harga (IDR)',
      selector: (row) => row.price,
      format: (row) => {
        return formatCurr(row.price);
      },
      sortable: true,
      right: 'true',
    },
    {
      name: 'Status',
      cell: (row, index, column, id) => {
        const { isActive } = row;
        return <ActiveBadge isActive={isActive} />;
      },
      center: true,
      maxWidth: '200px',
      sortable: false,
    },
    {
      name: '',
      maxWidth: '150px',
      cell: (row, index) => {
        return (
          <ActionButton
            allowView={false}
            onEdit={() => {
              productModal.detail = row;
              productModal.setEdit();
              productModal.onOpen();
            }}
            onDelete={() => {
              deleteDialog.detail = row;
              deleteDialog.onOpen();
            }}
          />
        );
      },
    },
  ];
};

const ProductPage = () => {
  const productModal = useProductModal();
  const deleteDialog = useDeleteDialog();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get('/api/products');
      return data;
    },
  });

  useEffect(() => {
    if (productModal.hasUpdate || deleteDialog.hasUpdate) {
      refetch();
      productModal.closeUpdate();
    }

    return () => {
      productModal.closeUpdate();
      deleteDialog.closeUpdate();
    };
  }, [productModal.hasUpdate, deleteDialog.hasUpdate]);

  return (
    <MainWrapper>
      <ContentTitle
        title="Manajemen Produk"
        actionLabel="TAMBAH PRODUK"
        actionHandler={() => productModal.onOpen()}
      />

      <Card className="p-0 mt-4">
        <RenderIf isTrue={isLoading}>
          <div className="w-full text-center">Memuat data produk...</div>
        </RenderIf>
        <RenderIf isTrue={isError}>
          Terjadi kesalahan, silahkan coba lagi!
        </RenderIf>
        <RenderIf isTrue={!isLoading && !isError && data !== undefined}>
          <DataTable
            columns={columns(productModal, deleteDialog)}
            data={data?.data}
            pagination
            striped
          />
        </RenderIf>
      </Card>
    </MainWrapper>
  );
};

export default ProductPage;
