// @flow

import React, { Component, forwardRef } from 'react';
import MaterialTable from 'material-table';

// ICON SUPPORT

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import log from '../components/log';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

// END ICON SUPPORT
type Props = {};

const formatDateTime = ms => new Date(ms).toLocaleString('en-US');
const formatTime = ms => {
  const minutes = ms / 1000 / 60;
  const hours = minutes / 60;
  return minutes < 90
    ? `${minutes.toFixed(2)} Minutes`
    : `${hours.toFixed(2)} Hours`;
};

export default class LogPage extends Component<Props> {
  props: Props;
  constructor(props) {
    super(props);

    // @TODO log wrapper that tells children to update when log data changes and also allow table to update log data store.
    const logData = log.read();

    this.state = {
      columns: [
        {
          title: 'Grinding Time',
          field: 'gTime',
          render: ({ gTime }) => formatTime(gTime)
        },
        {
          title: 'Start Time',
          field: 'start',
          render: ({ start }) => formatDateTime(start)
        },
        {
          title: 'End Time',
          field: 'stop',
          render: ({ stop }) => formatDateTime(stop)
        },
        { title: 'Tag', field: 'tag' },
        { title: 'Goal', field: 'goal' },
        { title: 'Mood', field: 'mood' },
        { title: 'Comment', field: 'comment' }
      ],
      data: logData
    };
  }

  render() {
    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          icons={tableIcons}
          columns={this.state.columns}
          data={this.state.data}
          title="Grinding Log"
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.state.data;
                    data.push(newData);
                    this.setState({ data }, () => resolve());
                  }
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.state.data;
                    const index = data.indexOf(oldData);
                    data[index] = newData;
                    this.setState({ data }, () => resolve());
                  }
                  resolve();
                }, 1000);
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    let data = this.state.data;
                    const index = data.indexOf(oldData);
                    data.splice(index, 1);
                    this.setState({ data }, () => resolve());
                  }
                  resolve();
                }, 1000);
              })
          }}
        />
      </div>
    );
  }
}
