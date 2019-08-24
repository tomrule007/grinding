import React, { Component, forwardRef } from 'react';
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';

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

//Mood Icons
import CloseIcon from '@material-ui/icons/Close';
import VeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfiedOutlined';
import Dissatisfied from '@material-ui/icons/SentimentDissatisfiedOutlined';
import VerySatisfied from '@material-ui/icons/SentimentVerySatisfiedOutlined';
import Satisfied from '@material-ui/icons/SentimentSatisfiedOutlined';
import localStore from '../utils/localStore';

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

const moodToIcon = mood => {
  switch (mood) {
    case 'VeryDissatisfied':
      return <VeryDissatisfied fontSize="large" />;
    case 'Dissatisfied':
      return <Dissatisfied fontSize="large" />;
    case 'Satisfied':
      return <Satisfied fontSize="large" />;
    case 'VerySatisfied':
      return <VerySatisfied fontSize="large" />;

    default:
      return <div>N/A</div>;
  }
};

const formatJustTime = ms =>
  new Date(ms).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
const formatJustDate = ms => new Date(ms).toLocaleDateString('en-US');

const formatTime = ms => {
  const minutes = Math.floor(ms / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  return minutes < 60 ? `${minutes} Minutes` : `${hours}:${minutes % 60} Hours`;
};

export default class LogPage extends Component<Props> {
  constructor(props) {
    super(props);

    // @TODO log wrapper that tells children to update when log data changes and also allow table to update log data store.
    const logData = localStore.get('log');

    this.state = {
      columns: [
        {
          title: 'Grinding Time',
          field: 'gTime',
          editable: 'never',
          render: ({ gTime }) => formatTime(gTime)
        },
        {
          title: 'Start Time',
          field: 'start',
          editable: 'never',
          render: ({ start }) => formatJustDate(start)
        },
        { title: 'Tag', field: 'tag' },
        {
          title: 'Mood',
          field: 'mood',
          render: ({ mood }) => moodToIcon(mood)
        }
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
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
          detailPanel={rowData => {
            return (
              <div>
                <Typography component="p">
                  <b>Goal: </b> {rowData.goal}
                </Typography>
                <Typography component="p">
                  <b>Comment: </b> {rowData.comment}
                </Typography>
                <Typography component="p">
                  <b>Start:</b> {formatJustTime(rowData.start)}
                  {'    '}
                  <b>Stop:</b> {formatJustTime(rowData.stop)}
                </Typography>
                <Typography component="p" />
              </div>
            );
          }}
          options={{
            exportButton: true
          }}
          title="Grinding Log"
        />
      </div>
    );
  }
}
