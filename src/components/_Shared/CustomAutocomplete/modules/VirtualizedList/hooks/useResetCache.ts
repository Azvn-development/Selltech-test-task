import { useEffect, useRef } from 'react';
import { VariableSizeList } from 'react-window';

export const useResetCache = (itemCount: number) => {
    const ref = useRef<VariableSizeList>(null);

    useEffect(() => {
      if (ref.current != null) {
        ref.current.resetAfterIndex(0, true);
      }
    }, [itemCount]);

    return ref;
}