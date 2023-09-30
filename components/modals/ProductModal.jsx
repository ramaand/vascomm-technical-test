'use client';

import { useCallback, useState } from 'react'

import { signIn } from 'next-auth/react'

import axios, { HttpStatusCode } from 'axios'
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import useProductModal from '@/hooks/useProductModal'

import Button from '@/components/Button'
import ImageUpload from '@/components/inputs/ImageUpload'
import Input from '@/components/inputs/Input'

import Modal from './Modal'

const ProductModal = () => {
  const productModal = useProductModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      price: 0,
      imageSrc: '',
    },
  });

  const imageSrc = watch('imageSrc');

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit = (data) => {
    setIsLoading(true);

    console.log('SUBMIT', data);
    axios
      .post('/api/products', data)
      .then((res) => {
        const { code, data, message } = res.data;
        if (code === HttpStatusCode.Ok) {
          toast.success(message);
          reset();
          productModal.onClose();
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="name"
        label="Nama Produk"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        type="number"
        formatPrice
        label="Harga Produk"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <ImageUpload
        value={imageSrc}
        onChange={(value) => setCustomValue('imageSrc', value)}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={productModal.isOpen}
      title="Tambah User"
      actionLabel="SIMPAN"
      onClose={productModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    ></Modal>
  );
};

export default ProductModal;
