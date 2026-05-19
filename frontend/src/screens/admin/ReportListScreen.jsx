import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetReportsQuery,
  useResolveReportMutation,
  useDeleteReportMutation,
} from '../../slices/reportsApiSlice';
import { toast } from 'react-toastify';

const ReportListScreen = () => {
  const { data: reports, refetch, isLoading, error } = useGetReportsQuery();

  const [resolveReport, { isLoading: loadingResolve }] = useResolveReportMutation();
  const [deleteReport, { isLoading: loadingDelete }] = useDeleteReportMutation();

  const resolveHandler = async (id) => {
    if (window.confirm('Mark this report as resolved?')) {
      try {
        await resolveReport(id).unwrap();
        refetch();
        toast.success('Report resolved');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
      if (window.confirm('Delete this report?')) {
        try {
          // Note: Backend might not support delete yet, check reportRoutes.js
          // If it doesn't support, we can just omit this button or implement it.
          await deleteReport(id).unwrap();
          refetch();
          toast.success('Report deleted');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };

  return (
    <>
      <h1>Reports</h1>
      {loadingResolve && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>REPORTER</th>
              <th>REPORTED ITEM</th>
              <th>REASON</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{report._id}</td>
                <td>{report.reporter?.name}</td>
                <td>
                  {report.reportedProduct ? (
                    `Product: ${report.reportedProduct.title}`
                  ) : report.reportedUser ? (
                    `User: ${report.reportedUser.name}`
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>{report.reason}</td>
                <td>{report.createdAt.substring(0, 10)}</td>
                <td>
                  {report.status === 'resolved' ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {report.status !== 'resolved' && (
                    <Button
                      variant='light'
                      className='btn-sm'
                      onClick={() => resolveHandler(report._id)}
                    >
                      Resolve
                    </Button>
                  )}
                  {/* Delete button */}
                  <Button
                    variant='danger'
                    className='btn-sm mx-2'
                    onClick={() => deleteHandler(report._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ReportListScreen;
