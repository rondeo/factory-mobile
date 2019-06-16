import React, { useState, useEffect, useCallback, useContext } from 'react'
import { NavBar, ListView } from 'antd-mobile'
import axios from 'axios'
import { AppDataContext } from '../../AppData'

export default function BugView(props) {
    const [dataSource, setDataSource] = useState(new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))
    const { appDispatch } = useContext(AppDataContext)

    // eslint-disable-next-line
    const loadData = useCallback(async () => {
        const response = await axios.post('http://hefeixiaomu.com:3009/find_bug', {})
        if (response && response.data.code === 0 && response.data.data) {
            setDataSource(dataSource.cloneWithRows(response.data.data))
        }
    })

    useEffect(() => {
        loadData()
        // eslint-disable-next-line
    }, [])

    return <div style={{ width: '100%', height: '100%' }}>
        <NavBar mode="light">缺陷列表</NavBar>
        <ListView dataSource={dataSource} initialListSize={20} pageSize={2} style={{ height: document.documentElement.clientHeight - 95 }}
            renderSeparator={(sectionID, rowID) => (
                <div
                    key={`${sectionID}-${rowID}`}
                    style={{
                        backgroundColor: '#FFFFFF',
                        height: 1,
                        borderTop: '1px solid #ECECED',
                        borderBottom: '0px solid #ECECED'
                    }}
                />
            )}
            renderRow={(rowData) => {
                return <div style={{ height: 50, display: 'flex', paddingLeft: 15, alignItems: 'center' }} onClick={() => {
                    props.history.push(`/bugdetail/${rowData.id}`)
                    appDispatch({ type: 'bug', data: rowData })
                }}>{rowData.title_name || '空'}</div>
            }}></ListView>
    </div>
}