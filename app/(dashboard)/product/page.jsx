'use client'
import React from 'react'

import useProductModal from '@/hooks/useProductModal'

import ContentTitle from '@/components/dashboard/ContentTitle'
import MainWrapper from '@/components/dashboard/MainWrapper'

const ProductPage = () => {
  const productModal = useProductModal();

  return (
    <MainWrapper>
      <ContentTitle
        title="Manajemen Produk"
        actionLabel="TAMBAH PRODUK"
        actionHandler={() => productModal.onOpen()}
      />
    </MainWrapper>
  );
};

export default ProductPage;
