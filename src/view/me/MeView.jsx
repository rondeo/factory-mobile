import React, { useContext } from 'react'
import { List, NavBar } from 'antd-mobile';
import { AppDataContext } from '../../AppData'

import './MeView.css'
import icon from '../../assets/icon.jpg'

export default props => {
    const { appState } = useContext(AppDataContext)

    return <div style={{ textAlign: 'center' }}>
        <NavBar mode="light">我的</NavBar>
        <img src={icon} className="round_icon" alt="" />
        <List>
            <List.Item extra={appState.user.name}>姓名</List.Item>
            <List.Item extra={appState.user.phonenumber}>手机</List.Item>
            <List.Item extra={appState.user.remark}>职位</List.Item>
        </List>
    </div>
}