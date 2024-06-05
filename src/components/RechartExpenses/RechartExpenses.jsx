import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const RechartExpenses = ({ expFormData }) => {
  const COLORS = ['#A000FF', '#FDE006', '#FFBB28'];

  const transformedData = expFormData.reduce((acc, curr) => {
    const category = curr.category;
    const price = parseFloat(curr.price);

    const existingCategory = acc.find(item => item.name === category);

    if (existingCategory) {
      existingCategory.value += price;
    } else {
      acc.push({ name: category, value: price });
    }

    return acc;
  }, []);

  const RADIAN = Math.PI / 180;
  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (!transformedData?.length) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
   
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={transformedData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          label={renderLabel}
        >
          {transformedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend iconType="rect" verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RechartExpenses;