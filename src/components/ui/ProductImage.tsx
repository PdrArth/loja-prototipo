import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

/**
 * Componente ProductImage - Wrapper para next/image com fallback automático
 */
export const ProductImage: React.FC<ImageProps> = (props) => {
  const [imgSrc, setImgSrc] = useState(props.src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc('/placeholder-product.svg');
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      onError={handleError}
      unoptimized={false}
    />
  );
}; 