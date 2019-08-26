import React, { Component } from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend
} from 'recharts';
import localStore from '../utils/localStore';

const formatStartDate = ms => new Date(ms).toLocaleDateString('en-US');
const formatTime = ms => Math.floor(ms / 1000); // Ms to minutes

export default class ChartPage extends Component {
  constructor(props) {
    super(props);

    // @TODO log wrapper that tells children to update when log data changes and also allow table to update log data store.
    const logData = Object.entries(
      localStore.get('log').reduce((acc, { gTime, start }) => {
        const formatedStart = formatStartDate(start);
        if (acc[formatedStart]) {
          acc[formatedStart] += gTime;
        } else {
          acc[formatedStart] = gTime;
        }
        return acc;
      }, {})
    ).map(keyVal => ({ date: keyVal[0], time: formatTime(keyVal[1]) }));
    console.log(logData);

    this.state = { data: logData };
  }

  render() {
    const { data } = this.state;
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Your Time Grinding</h1>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="time" fill="#8884d8" />
        </BarChart>
      </div>
    );
  }
}
