import { FC, useEffect, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
// import ReactPaginate from 'react-paginate'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'
import { isEqual } from 'lodash'
import { useLocation } from 'react-router-dom'
// import { Checkbox } from '../CustomCheckbox'
import { Checkbox } from '../Checkbox'
// import { cellType } from '../../utils/Common'
import { cellType } from '../../utils/functions'
import RenderComponents from './table-components/RenderComponents'
// import { TableProps } from './TableProp'
// import Pagination from '../Pagination'

const nextprevBtn =
  'py-2 px-4 rounded-md w-auto bg-white text-primary-700 border border-gray-200 active:border-primary-700 outline-none focus:outline-none ease-linear transition-all duration-150 cursor-pointer'
const pageLink =
  'w-fit h-fit px-3 py-2 rounded-lg hover:bg-gray-200 ease-linear transition-all duration-150 cursor-pointer'
const containerClass = 'h-full w-full flex lg:text-base text-sm items-center'
const activeClass = '!h-10 !w-10 px-3 bg-gray-200'

const Table = ({
  paginate,
  loading = false,
  data,
  handleRowClick,
  getSelected,
  column,
  sortHeader,
  handleEditAction,
  handleDeleteAction,
  handlePaginate,
  isFiltered = false,
  isLoadingAction,
  meta,
}) => {
  const {
    currentPage = 1,
    hasNextPage = data.length > 10 && true,
    hasPreviousPage = false,
    perPage = 10,
    total = 0,
    // nextPage = null,
    // totalPages = 1,
  } = meta || {}

  const pageCounts = Math.ceil(Number(total) / Number(perPage))

  const { pathname } = useLocation()

  const newPathname = pathname.split('/')

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    if (handlePaginate) {
      handlePaginate(event.selected + 1)
    }
  }

  const clampedCurrentPage = Math.min(Math.max(1, Number(currentPage)), pageCounts)

  const [sortColumn, setSortColumn] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')

  const [selectedRows, setSelectedRows] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  const sortedData = data?.sort((a, b) => {
    if (sortColumn && sortDirection) {
      const compareResult = a[sortColumn.toLowerCase()]?.localeCompare(b[sortColumn.toLowerCase()])
      return sortDirection === 'desc' ? compareResult : -compareResult
    }
    return 0
  })

  const handleRowSelection = (item) => {
    const isSelected = selectedRows.some((row) => isEqual(row, item))
    let updatedRows = []

    if (isSelected) {
      updatedRows = selectedRows.filter((row) => !isEqual(row, item))
      setSelectAll(false) // Uncheck select all when deselecting an item
    } else {
      updatedRows = [...selectedRows, item]
      if (updatedRows.length === (sortedData || data)?.length) {
        setSelectAll(true) // Check select all when selecting all items
      }
    }

    getSelected && getSelected(updatedRows)
    setSelectedRows(updatedRows)
  }

  const handleSelectAll = () => {
    const allItems = sortedData || data || []
    if (!selectAll) {
      getSelected && getSelected(allItems)
      setSelectedRows(allItems)
    } else {
      getSelected && getSelected([])
      setSelectedRows([])
    }

    setSelectAll((prevSelectAll) => !prevSelectAll)
  }

  useEffect(() => {
    getSelected && getSelected(selectedRows)
  }, [selectedRows, getSelected])

  // const handleRowClicks = (event: any, row: any) => {
  //   const isActionColumn = column.some(
  //     (col) =>
  //       (col.accessor === cellType.ACTION ||
  //         col.accessor === cellType.SELECTION) &&
  //       event.target.closest([data-column="${col.accessor}"])
  //   );

  //   if (isActionColumn || event.target.tagName.toLowerCase() === 'input')
  //     return;

  //   handleRowClick && handleRowClick(row);
  // };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('desc')
    }
  }

  const displayCell = (row, column, index) => (
    <RenderComponents
      row={row}
      value={row[column.accessor]}
      column={column}
      index={index}
      handleEditAction={handleEditAction}
      handleDeleteAction={handleDeleteAction}
      selectedRows={selectedRows}
      handleRowSelection={handleRowSelection}
      isLoading={isLoadingAction}
    />
  )

  const allowCheckBox = column?.find((item) => item.accessor === cellType.SELECTION)

  return (
    <div className="relative">
      <div className="block w-full overflow-x-auto  hide-scrollbar">
        <table className="w-full border-collapse items-center overflow-x-scroll">
          <thead>
            {(loading || data?.length > 0) && (
              <tr>
                {getSelected && allowCheckBox && (
                  <th
                    key="select-all"
                    className="whitespace-nowrap bg-inherit px-6 py-5 text-left align-middle text-sm font-medium text-[#000]"
                  >
                    <div className="flex items-center">
                      <Checkbox
                        disabled={loading || !data?.length}
                        checked={!loading && selectedRows?.length === data?.length}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                )}

                {column
                  ?.filter((item) => item.accessor !== cellType.SELECTION)
                  .map((th, i) => (
                    <th
                      key={i}
                      className="whitespace-nowrap bg-inherit px-6 py-5 text-left align-middle text-xs font-semibold"
                      onClick={() => (sortHeader ? handleSort(th.accessor) : null)}
                    >
                      <span
                        className={classNames(
                          'flex items-center gap-1',
                          sortHeader ? 'cursor-pointer' : ''
                        )}
                      >
                        {th.header}
                        {sortHeader && (
                          <>
                            {sortColumn === th.accessor && (
                              <span className="ml-1">
                                {sortDirection === 'asc' ? (
                                  <ArrowUpIcon className="h-3 w-3 text-primary-600" />
                                ) : (
                                  <ArrowDownIcon className="h-3 w-3 text-primary-600" />
                                )}
                              </span>
                            )}
                            {sortColumn !== th.accessor && (
                              <span className="ml-1">
                                <ArrowUpIcon className="h-3 w-3 text-primary-600" />
                              </span>
                            )}
                          </>
                        )}
                      </span>
                    </th>
                  ))}
              </tr>
            )}
          </thead>
          <tbody className="bg-white">
            {loading && (
              <>
                {Array(isFiltered ? Number(perPage) : 5)
                  .fill(0)
                  .map((_, index) => (
                    <tr className="w-full" key={index}>
                      {column?.map((_, i) => (
                        <td
                          key={i}
                          className="whitespace-nowrap border-b border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle "
                        >
                          <div className="h-4 w-full animate-pulse bg-gray-200" />
                        </td>
                      ))}
                    </tr>
                  ))}
              </>
            )}

            {sortedData?.length > 0 && !loading && (
              <>
                {sortedData?.map((item, i) => (
                  <tr className={classNames('h-18 w-full')} key={i}>
                    {column?.map((column, idx) => (
                      <td
                        key={idx}
                        className={classNames(
                          'whitespace-nowrap border-b border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle',
                          {
                            'cursor-pointer':
                              handleRowClick &&
                              !item?.isDisabled &&
                              !(
                                column.accessor === cellType.ACTION ||
                                column.accessor === cellType.SELECTION
                              ),
                          }
                        )}
                        onClick={
                          handleRowClick &&
                          !item?.isDisabled &&
                          !(
                            column.accessor === cellType.ACTION ||
                            column.accessor === cellType.SELECTION
                          )
                            ? () => handleRowClick(item)
                            : undefined
                        }
                        data-column={column.accessor}
                      >
                        {displayCell(item, column, idx)}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* {newPathname.includes('dashboard') && paginate && data?.length > 0 && (
        <div className="relative mt-5 flex w-full">
          <ReactPaginate
            nextLabel={
              <div
                className={classNames(
                  'flex items-center gap-2 text-primary-700',
                  nextprevBtn,
                  {
                    '!cursor-not-allowed active:border-gray-200': !hasNextPage,
                  },
                  {
                    hidden: pageCounts === 1,
                  }
                )}
              >
                <span className="hidden md:block text-xs">Next</span>
                <ArrowRightIcon className="h-3 w-3 text-primary-700 " />
              </div>
            }
            previousLabel={
              <div
                className={classNames(
                  'flex items-center gap-2 text-primary-700',
                  nextprevBtn,
                  {
                    '!cursor-not-allowed active:border-gray-200': !hasPreviousPage,
                  },
                  {
                    hidden: pageCounts === 1,
                  }
                )}
              >
                <ArrowLeftIcon className="h-3 w-3 text-primary-700 lg:snap-start" />
                <span className="hidden md:block text-xs">Previous</span>
              </div>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCounts}
            pageClassName={classNames('mx-1 md:block hidden', {
              '!hidden': pageCounts === 1,
            })}
            pageLinkClassName={pageLink}
            // pageLinkClassName="page-link"
            previousClassName={classNames('mr-auto')}
            // previousLinkClassName="page-link"'!cursor-not-allowed'
            nextClassName={classNames('ml-auto')}
            breakLabel="..."
            forcePage={clampedCurrentPage - 1}
            // breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName={containerClass}
            activeLinkClassName={activeClass}
            renderOnZeroPageCount={undefined}
          />

          <div className="absolute left-0 right-0 mx-auto mt-2 w-fit text-center text-sm md:static md:mx-0 md:hidden md:justify-center">
            Page {Number(currentPage)} of {pageCounts}
          </div>
        </div>
      )} */}

      {/* {newPathname.includes('admin') && (
        <div className="flex justify-end items-center">
          <Pagination currentPage={currentPage} totalPages={20} onPageChange={handlePaginate!} />
        </div>
      )} */}
    </div>
  )
}

export default Table