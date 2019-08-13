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

// const logData = log.read();

export default class LogPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          icons={tableIcons}
          columns={[
            { title: 'Grinding Time', field: 'gTime' },

            { title: 'Start Time', field: 'start' },
            { title: 'End Time', field: 'stop' },
            { title: 'Time', field: 'time', type: 'numeric' },
            { title: 'tag', field: 'tag' },
            { title: 'goal', field: 'goal' },

            {
              title: 'Mood',
              field: 'mood',
              lookup: { 1: '=(', 2: '=/', 3: '=|', 4: '=)', 5: '=P' }
            },
            { title: 'comment', field: 'comment' }
          ]}
          data={[
            {
              start: 12213213213,
              stop: 22222222,
              gTime: 'stop-start',
              tag: '#grinding',
              goal: 'finish log editor',
              mood: 1,
              comment: 'went well'
            }
          ]}
          title="Grinding Log"
        />
      </div>
    );
  }
}
