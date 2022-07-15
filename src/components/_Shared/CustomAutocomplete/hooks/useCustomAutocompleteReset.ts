import { useEffect, useState } from 'react';

export const useCustomAutocompleteReset = () => {
    // Used to clear a value that is not included in the options
    const [needReset, setNeedReset] = useState(false);

    useEffect(() => {
        if(needReset) {
            setNeedReset(false);
        } // if
    }, [needReset])

    return {
        needReset,
        reset: () => setNeedReset(true),
    }
}