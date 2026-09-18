'use client';

import Image from 'next/image';
import { useState } from 'react';

function ImageGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleSelectedImage = (index:number) => {
    setSelectedImage(index);
  };

  return (
    <div className="w-full">
      <div className="relative aspect-[1.3/1] overflow-hidden rounded-lg border border-[#c6b2b8] bg-shadow-[0_0_0_2px_rgba(40,33,28,0.05)]">
        <Image
          src={images[selectedImage]}
          alt={`${productName} image`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-500 hover:scale-[1.02]"
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className={`relative cursor-pointer aspect-square overflow-hidden rounded-lg border ${
              index === selectedImage
                ? 'ring-1'
                : 'ring-0'
            }`}
            onClick={()=>handleSelectedImage(index)}
          >
            <Image
              src={image}
              alt={`${productName} gallery preview ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 18vw, 30vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
