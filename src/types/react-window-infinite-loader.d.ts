declare module 'react-window-infinite-loader' {
    import { ComponentType } from 'react';

    export interface InfiniteLoaderProps {
        isItemLoaded: (index: number) => boolean;
        itemCount: number;
        loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void> | void;
        children: (props: {
            onItemsRendered: (props: {
                overscanStartIndex: number;
                overscanStopIndex: number;
                visibleStartIndex: number;
                visibleStopIndex: number;
            }) => void;
            ref: (ref: any) => void;
        }) => React.ReactElement;
        threshold?: number;
        minimumBatchSize?: number;
    }

    export const InfiniteLoader: ComponentType<InfiniteLoaderProps>;
}