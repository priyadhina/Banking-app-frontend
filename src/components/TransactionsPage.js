import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { fetchTransactions } from '../helpers/Utils';

const TransactionsPage = (props) => {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    items: 5,
  });
  useEffect(() => {
    Promise.resolve(fetchTransactions({ queryParams })).then((data) => {
      console.log('=data=', data);
      props.getTransactionList(data);
    });
  }, [queryParams]);

  const dataSource = props?.transactionList?.map((item) => {
    return {
      key: item.id,
      ...item,
    };
  });

  const columns = [
    {
      dataIndex: 'trans_id',
      title: 'Transaction ID',
    },
    {
      dataIndex: 'trans_remarks',
      title: 'Remarks',
    },
    {
      dataIndex: 'cheque_number',
      title: 'Cheque number',
    },
    {
      dataIndex: 'type',
      title: 'Transaction Type',
    },
    {
      dataIndex: 'amount',
      title: 'Amount',
    },
    {
      dataIndex: 'balance',
      title: 'Available Balance',
    },
  ];
  return (
    <TableView
      columns={columns}
      dataSource={dataSource}
      paginationEnabled={true}
      setPaginationParams={setQueryParams}
      dataSourceTotalCount={props?.totalCount || 0}
      tableTitle="Transaction Summary"
    />
  );
};

export default TransactionsPage;

const useTableStyles = makeStyles(() => ({
  paper: {
    backgroundColor: 'inherit',
    paddingTop: '15px',
    paddingRight: '15px',
    boxShadow: 'none',
  },
  container: {
    marginLeft: '315px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  },
  heading: {
    alignItems: 'center',
    paddingLeft: '15px',
  },
  table: {
    margin: '0 auto',
    border: '1px solid #ddd',
  },
  tableHead: {
    fontWeight: '700',
    color: '#3f51b5',
    textAlign: 'center',
  },
}));

const TableView = ({
  columns,
  dataSource = [],
  tableTitle,
  paginationEnabled,
  setPaginationParams = () => {},
  dataSourceTotalCount = 0,
}) => {
  const classes = useTableStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dataSourceLength = dataSource.length > 30 ? 30 : dataSource.length;
  const [totalLengthOfDataSource, setTotalLengthOfDataSource] =
    useState(dataSourceLength);

  useEffect(() => {
    setTotalLengthOfDataSource((prevCount) => {
      if (dataSourceTotalCount >= 0) {
        return dataSourceTotalCount;
      }
      return prevCount;
    });
  }, [dataSourceTotalCount]);

  const handleChangePage = (event, newPage) => {
    setPaginationParams((prevValues) => {
      return {
        ...prevValues,
        page: newPage + 1,
      };
    });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const numberOfRowsPerPage = parseInt(event.target.value, 10);
    setPaginationParams((prevValues) => {
      return {
        ...prevValues,
        items: numberOfRowsPerPage,
        page: 1,
      };
    });
    setRowsPerPage(numberOfRowsPerPage);
    setPage(0);
  };

  return (
    <Paper className={classes.paper}>
      <Box className={classes.container}>
        <Box className={classes.heading}>
          <Box pt={1} pb={1}>
            <Typography variant="h5">{tableTitle}</Typography>
          </Box>
        </Box>
        <TableContainer>
          <Table size="small" className={classes.table}>
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.dataIndex}
                      className={classes.tableHead}
                    >
                      {column.title}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSource.map((dataItem) => {
                return [
                  <TableRow key={dataItem.key}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.dataIndex} align="center">
                          {dataItem[column.dataIndex]}
                        </TableCell>
                      );
                    })}
                  </TableRow>,
                ];
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {paginationEnabled && (
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10]}
            count={totalLengthOfDataSource || dataSource.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Box>
    </Paper>
  );
};
