import React, { HTMLAttributes } from 'react';
import { VariableSizeList } from 'react-window';
import { useRenderRow } from './hooks/useRenderRow';
import { useResetCache } from './hooks/useResetCache';

export const VirtualizedListContext = React.createContext({});

const VirtualizedList = ({ children, ...other }: HTMLAttributes<HTMLElement>, ref: React.LegacyRef<HTMLDivElement>):React.ReactElement => {
    const itemSize = 36;
    const itemData = children as React.ReactNode[];
    const itemCount = itemData.length;

    const gridRef = useResetCache(itemCount);
    const renderRow = useRenderRow();

    return (
        <div ref={ref} { ...other }>
            <VariableSizeList
                itemData={itemData}
                height={itemCount > 8 ? 150 : itemCount * itemSize}
                width={'100%'}
                itemSize={() => itemSize}
                ref={gridRef}
                innerElementType="div"
                overscanCount={5}
                itemCount={itemCount}
            >
                {renderRow}
            </VariableSizeList>
        </div>
        
    );
}

export default React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLElement>>(VirtualizedList);