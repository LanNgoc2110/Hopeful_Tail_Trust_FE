import { Breadcrumb, Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 5000 },
  { month: 'Feb', revenue: 6000 },
  { month: 'Mar', revenue: 7000 },
  { month: 'Apr', revenue: 8000 },
  { month: 'May', revenue: 7500 },
  { month: 'Jun', revenue: 9000 },
  { month: 'Jul', revenue: 8500 },
  { month: 'Aug', revenue: 9500 },
  { month: 'Sep', revenue: 11000 },
  { month: 'Oct', revenue: 10500 },
  { month: 'Nov', revenue: 11500 },
  { month: 'Dec', revenue: 12000 },
];

export default function Revenue() {
  const {
    token: {
      colorBgContainer,
      borderRadiusLG
    },
  } = theme.useToken();

  useEffect(() => {
    
  }, [])

  return (
    <>
      <Content
        style={{
          padding: 24,
          marginBottom: 24,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <h1>Doanh thu theo tháng</h1>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data} margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </Content>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        Content
      </Content>
    </>
  )
}
