import { TokenName } from '@/data/enums/TokenName';
import axios from 'axios';
import { useEffect } from 'react';

export const useAuthorization = () => {
    useEffect(() => {
        axios
            .post(
                API_AUTHORIZE_ULR, 
                {
                    email: 'test@test.com',
                    password: '1234567Qa'
                })
            .then((response) => {
                const accessToken = response.data.access_token;
                localStorage.setItem(TokenName.Authorization, accessToken);
            });
    }, [])
}