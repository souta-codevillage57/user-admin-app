import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom"

import { User } from "../types/api/user"
import { useMessage } from "./useMessage";
import { useLoginUser } from "./userLoginUser"

export const useAuth = () => {

    const history = useHistory();
    const { showMessage } = useMessage();
    const { setLoginUser } = useLoginUser();

    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);

    const login = useCallback((id: string) => {
        setLoading(true)
        axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => {
                if (res.data) {
                    const isAdmin = res.data.id === 10 ? true : false;
                    setLoginUser({ ...res.data, isAdmin })
                    history.push("/home")
                    showMessage({ title: "ログインしました", status: "success" })
                } else {
                    showMessage({ title: "ユーザーが見つかりません", status: "error" })
                    setLoading(false)
                }
            })
            .catch(() => {
                showMessage({ title: "ログインできません", status: "error" })
                setLoading(false)
            })
    }, [showMessage, setLoginUser, history])

    return { login, loading }
}