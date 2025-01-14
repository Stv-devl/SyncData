import { useState, useEffect, useRef, useCallback } from 'react';
import { useFileStore } from '@/store/useFileStore';

const ITEM_WIDTH = 112;
const DESKTOP_THRESHOLD = 1024;
const MIN_GAP = 16;

const useResponsiveFileCount = (isList: boolean) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const [fileCount, setFileCount] = useState(0);

  const { setEntriesPerPage } = useFileStore();

  const calculateFileCount = useCallback(() => {
    const containerElement = containerRef.current;
    if (!containerElement) {
      return;
    }
    const screenHeight = window.innerHeight;
    const isDesktop = window.innerWidth > DESKTOP_THRESHOLD;

    const { width: Width } = containerElement.getBoundingClientRect();
    const containerWidth = Math.max(0, Math.round(Width) - 48);

    if (isList) {
      const rowsForScreenHeight =
        screenHeight > 1250 ? 11 : screenHeight > 1100 ? 8 : isDesktop ? 6 : 5;
      setFileCount(rowsForScreenHeight);
    } else {
      let itemsPerRow = Math.floor(
        (containerWidth + MIN_GAP) / (ITEM_WIDTH + MIN_GAP)
      );
      let gap = Math.max(
        MIN_GAP,
        Math.floor(
          (containerWidth - itemsPerRow * ITEM_WIDTH) / (itemsPerRow - 1)
        )
      );

      while (
        itemsPerRow > 1 &&
        itemsPerRow * ITEM_WIDTH + (itemsPerRow - 1) * gap > containerWidth
      ) {
        itemsPerRow -= 1;
        gap = Math.max(
          MIN_GAP,
          Math.floor(
            (containerWidth - itemsPerRow * ITEM_WIDTH) / (itemsPerRow - 1)
          )
        );
      }
      const maxRows = screenHeight > 1250 ? 5 : screenHeight > 1050 ? 4 : 2;
      setFileCount(itemsPerRow * maxRows);
    }
  }, [isList]);

  useEffect(() => {
    calculateFileCount();
    const resizeObserver = new ResizeObserver(() => {
      calculateFileCount();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [calculateFileCount]);

  useEffect(() => {
    if (fileCount > 0) {
      setEntriesPerPage(fileCount);
    }
  }, [fileCount, setEntriesPerPage]);

  return { containerRef, fileCount };
};

export default useResponsiveFileCount;
