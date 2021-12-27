import { response } from 'express';
import {useState, useCallback} from 'react';

export const useHtpp = () => {
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    const req = useCallback( async (url, method ='Get', body=null, headers={}) => {
        setLoading(true)
        try{
            if(body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const res = await fetch(url, {method, body, headers});
            const data = await res.json();

            if (!response.ok) {
                throw new Error(data.message || 'Штосьці не так')
            }

            setLoading(false)
            return data
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e
        }
    }, [])

    const clearError = useCallback(()=>setError(null), [])
    return{loading, req, error, clearError}
}