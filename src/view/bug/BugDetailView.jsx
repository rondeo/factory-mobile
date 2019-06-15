import React, { useState, useEffect, useCallback } from 'react'
import { NavBar, Icon, List } from 'antd-mobile'
import axios from 'axios'

export default function BugDetailView(props) {
    const [bug, setBug] = useState({})

    // eslint-disable-next-line
    const loadBug = useCallback(async () => {
        const response = await axios.post('http://hefeixiaomu.com:3009/find_bug', { id: props.match.params.id })
        if (response && response.data.code === 0 && response.data.data && response.data.data.length > 0) {
            setBug(response.data.data[0])
        }
    })

    useEffect(() => {
        loadBug()
        // eslint-disable-next-line
    }, [])

    return <div style={{ width: '100%', height: '100%' }}>
        <NavBar mode="light" icon={<Icon type='left' />}
            onLeftClick={e => { console.log(props); props.history.push('/main') }}>缺陷详情</NavBar>
        <List renderHeader={() => 'Basic Style'} className="my-list">
            <List.Item extra={bug.title_name}>标题</List.Item>
            <List.Item extra={bug.title_name}>标题</List.Item>
            <List.Item extra={bug.title_name}>标题</List.Item>
            <List.Item extra={bug.title_name}>标题</List.Item>
        </List>
        <List renderHeader={() => 'Basic Style'} className="my-list">
            <List.Item extra={bug.title_name}>标题</List.Item>
            <List.Item extra={bug.title_name}>标题</List.Item>
            <List.Item extra={bug.title_name}>标题</List.Item>
            <List.Item extra={bug.title_name}>标题</List.Item>
        </List>
        <List renderHeader={() => 'Basic Style'} className="my-list">
            <List.Item extra={bug.title_name}>标题</List.Item>
            <List.Item extra={bug.title_name}>标题</List.Item>
            <List.Item extra={bug.title_name}>标题</List.Item>
            <List.Item extra={bug.title_name}>标题</List.Item>
        </List>
        <List renderHeader={() => 'Basic Style'} className="my-list">
            <List.Item extra={bug.title_name}>标题</List.Item>
            <List.Item extra={bug.title_name}>标题</List.Item>
            <List.Item extra={bug.title_name}>标题</List.Item>
            <List.Item extra={bug.title_name}>标题</List.Item>
        </List>
        <List renderHeader={() => 'Basic Style'} className="my-list">
            <List.Item extra={bug.title_name}>标题</List.Item>
            <List.Item extra={bug.title_name}>标题</List.Item>
            <List.Item extra={bug.title_name}>标题</List.Item>
            <List.Item extra={bug.title_name}>标题</List.Item>
        </List>
    </div >
}