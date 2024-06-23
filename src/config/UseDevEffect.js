import {useEffect} from 'react';

export const useDevEffect = (cb, deps) => {
    let ran = false;
    //console.log('effect ran');
    useEffect(() => {
        if (ran) return;
        cb();
        return () => {
            //console.log('unmounted');
            ran = true
        };
    }, deps);
};

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const useOnceEffect = isDev ? useDevEffect : useEffect;