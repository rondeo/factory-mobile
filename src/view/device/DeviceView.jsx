import React, { useState, useEffect, useCallback } from 'react'
import { NavBar, ListView, Icon, List } from 'antd-mobile'
import axios from 'axios'

export default function DeviceView(props) {
    const [devicesData, setDevicesData] = useState(new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))
    const [displayValue, setDisplayValue] = useState(0)
    const [device, setDevice] = useState({})
    const [recordsData, setRecordsData] = useState(new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))

    // eslint-disable-next-line
    const loadBugsData = useCallback(async () => {
        const response = await axios.post('http://hefeixiaomu.com:3009/find_device', {})
        if (response && response.data.code === 0 && response.data.data) {
            setDevicesData(devicesData.cloneWithRows(response.data.data))
        }
    })

    // eslint-disable-next-line
    const loadReocrdsData = useCallback(async (device_id) => {
        const response = await axios.post('http://hefeixiaomu.com:3009/find_record', { device_id })
        if (response && response.data.code === 0 && response.data.data) {
            setRecordsData(recordsData.cloneWithRows(response.data.data))
        }
    })

    useEffect(() => {
        loadBugsData()
        // eslint-disable-next-line
    }, [])

    return <div style={{ width: '100%', height: '100%' }}>
        {/* =================================================================================================================== */}
        <div style={{ width: '100%', height: '100%', display: displayValue === 0 ? 'block' : 'none' }}>
            <NavBar mode="light" icon={<Icon type='left' />}
                onLeftClick={() => {
                    props.history.push('/main')
                }}>设备列表</NavBar>
            <ListView dataSource={devicesData} initialListSize={20} pageSize={2} style={{ height: document.documentElement.clientHeight - 45 }}
                renderRow={(rowData) => {
                    return <List.Item error={rowData.status !== 1} extra={rowData.status === 1 ? '正常' : '故障'} arrow="horizontal" onClick={() => {
                        setDevice(rowData)
                        loadReocrdsData(rowData.id)
                        setDisplayValue(1)
                    }}>{rowData.name || '空'}</List.Item>
                }} />
        </div>
        {/* =================================================================================================================== */}
        <div style={{ width: '100%', height: '100%', display: displayValue === 1 ? 'block' : 'none' }}>
            <NavBar mode="light" icon={<Icon type='left' />}
                onLeftClick={e => { setDisplayValue(0) }}>设备详情</NavBar>
            <List renderHeader={() => '设备信息'}>
                <List.Item extra={device.name}>名称</List.Item>
                <List.Item extra={device.device_type && device.device_type.name}>类型</List.Item>
                <List.Item extra={device.area && device.area.name}>区域</List.Item>
                <List.Item error={device.status !== 1} extra={device.status === 1 ? '正常' : '故障'}>状态</List.Item>
            </List>
            <ListView dataSource={recordsData} initialListSize={20} pageSize={2} useBodyScroll
                renderHeader={() => <span>巡检记录</span>}
                renderRow={(rowData) => {
                    return <List.Item error={rowData.device_status === 2} extra={rowData.device_status === 1 ? '正常' : '故障'}>{rowData.user.name}</List.Item>
                }} />
        </div>
    </div>
}