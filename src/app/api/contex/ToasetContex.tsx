'use client';

import { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';

const ToasterContext = (
  {
    msg,
    color,
  }: {
    msg: string;
    color?: string;
  }
) => {

  useEffect(() => {
    if (msg) {
      toast(msg, {
        style: {
          backgroundColor: color || '#fff', // Couleur personnalisée
          color: color ? '#fff' : '#000', // Si color est défini, texte blanc
        },
      });
    }
  }, [msg, color]);

  return (
    <div className="z-[99999]">
      <Toaster />
    </div>
  );
};

export default ToasterContext;
