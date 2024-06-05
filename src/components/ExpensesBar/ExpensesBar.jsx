import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, YAxis } from 'recharts';
import styles from './ExpensesBar.module.css'

const SimpleBarChart = ({ expFormData }) => {

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

  return (
   

<div className={styles.barWrapper}>
        {transformedData?.length ? (
          <ResponsiveContainer width="100%" height={280} >
            <BarChart data={transformedData} layout="vertical">
              <XAxis type="number" axisLine={false} display="none" />
              <YAxis
                type="category"
                width={120}
                dataKey="name"
                axisLine={false}
              />
              <Bar dataKey="value" fill="#8884d8" barSize={25} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "280px"
            }}
          >
            
          </div>
        )}
      </div>

  );
}

export default SimpleBarChart;
