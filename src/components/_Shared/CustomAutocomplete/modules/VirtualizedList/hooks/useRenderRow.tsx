import React, { useCallback } from 'react';
import { Typography } from '@mui/material';
import { ListChildComponentProps } from 'react-window';

export const useRenderRow = () => {
    return useCallback(({ data, index, style }: ListChildComponentProps) => {
      const dataSet = data[index];

      return (
        <Typography { ...dataSet[0] } component='span' style={style} noWrap>
          {dataSet[1]}
        </Typography>
      );
    }, [])
}