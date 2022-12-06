import clipboardCopy from 'clipboard-copy';
import { useState } from 'react';

export default function useCopieFav({ pathname }) {
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState();

  const shareRecipe = async () => {
    const fiveSeconds = 5000;
    setCopied(true);
    setTimeout(() => setCopied(false), fiveSeconds);
    await clipboardCopy(`http://localhost:3000${pathname}`);
  };

  return ({
    copied,
    favorite,
    setFavorite,
    setCopied,
    shareRecipe,
  });
}
