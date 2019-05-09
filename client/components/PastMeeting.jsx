import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });
  
  let id = 0;
  function createData(Date , Name, Cost, Duration, Attendees) {
    id += 1;
    return { id, Date , Name, Cost, Duration, Attendees };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
  function PastMeeting(props) {
    const { classes } = props;
  
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell align="right">Attendees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.Name}</TableCell>
                <TableCell align="right">{row.Cost}</TableCell>
                <TableCell align="right">{row.Duration}</TableCell>
                <TableCell align="right">{row.Attendees}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
  
  PastMeeting.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(PastMeeting);