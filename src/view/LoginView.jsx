import React, { useState, useContext } from 'react'
import { InputItem, Button, List } from 'antd-mobile';
import axios from 'axios'
import { AppDataContext } from '../AppData'

export default function LoginView(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const appDataContext = useContext(AppDataContext)

    return <div>
        {appDataContext.appState.user && appDataContext.appState.user.name}
        <List style={{ marginTop: 20 }}>
            <InputItem onChange={val => { setUsername(val) }}>用户名</InputItem>
            <InputItem type="password" onChange={val => { setPassword(val) }}>密码</InputItem>
        </List>
        <Button type='primary' size={'large'} style={{ margin: 16 }} onClick={async () => {
            const response = await axios.post('http://hefeixiaomu.com:3009/find_user', { username, password })
            if (response && response.data.code === 0 && response.data.data.length > 0) {
                appDataContext.appDispatch({ type: 'login', data: response.data.data[0] })
                props.history.push('/main')
            }
        }}>登陆</Button>
    </div>
}