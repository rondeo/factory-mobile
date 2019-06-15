import React from 'react'
import { TabBar, Icon } from 'antd-mobile'
import BugListView from './bug/BugListView'

export default function MainView(props) {

    return <div style={{ height: '100%', width: '100%', top: 0 }}>
        <TabBar>
            <TabBar.Item title="消息" key="message" icon={<Icon type="" />} />
            <TabBar.Item title="缺陷" key="bug" icon={<Icon type="" />} selectedIcon={<Icon type="" />} selected children={<BugListView {...props} />} />
            <TabBar.Item title="任务" key="task" icon={<Icon type="" />} />
            <TabBar.Item title="我的" key="my" icon={<Icon type="" />} />
        </TabBar>
    </div>
}