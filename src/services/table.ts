import { DataGridProps } from '@mui/x-data-grid/models/props/DataGridProps';
import { Paging } from '@type/context';

export class TableHelper {
  static rowsPerPageOptions = [10, 20, 30, 50, 100];

  static pagingDefault: Paging = {
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
  };

  static propsParamsTable = (
    { currentPage, pageSize, totalCount }: Paging,
    rowsPerPageOptions = null
  ): DataGridProps | any => {
    return {
      pagination: true,
      rowCount: totalCount || this.pagingDefault.totalCount,
      pageSize: pageSize || this.pagingDefault.pageSize,
      paginationMode: 'server',
      page: currentPage || this.pagingDefault.currentPage,
      rowsPerPageOptions: rowsPerPageOptions || this.rowsPerPageOptions,
    };
  };
}
