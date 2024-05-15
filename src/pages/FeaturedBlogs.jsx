import { useQuery } from '@tanstack/react-query';
import { flexRender, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFacetedMinMaxValues, getFilteredRowModel } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';




const FeaturedBlogs = () => {

    const { isPending, isError, data: featuredBlogs, error } = useQuery({
        queryKey: ['featuredBlogs'],
        queryFn: async () => {
            const res = await fetch('https://assignment-11-server-snowy-nine.vercel.app/featuredBlogs')
            return res.json();
        }
    })

    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')
    // title, imgUrl, catagory, shortDisc, longDesc
    const columns = [
        {
            header: 'SL',

            footer: 'SL',
            cell: ({ row }) => row.index + 1
        },
        {
            header: 'Title',
            accessorKey: 'title',
            footer: 'Title',
        },

        {
            header: 'Owoner',
            accessorKey: 'authorName',
            footer: 'Owoner',
        },
        {
            header: 'Profile Picture',
            accessorKey: 'authorImg',
            cell: (table) => {
                return (
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle group-hover:hidden avatar">
                        <div className="w-10 rounded-full">
                            <img alt={table.cell.row.original.authorName} src={table.cell.row.original.authorImg} />
                            <p></p>
                        </div>
                    </div>
                )
            },


            footer: 'Profile Picture',
        },


    ]
    useEffect(() => {


    }, [featuredBlogs])

    const data = useMemo(() => featuredBlogs, [featuredBlogs])

    const table = useReactTable({
        data,
        columns,

        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering

        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,



    })

    if (isPending) {
        return (
            <div className="flex flex-col gap-4 w-52">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        )
    }
    if (isError) {
        return <p className='text-red-600'>{error.message}</p>
    }


    if (featuredBlogs) {
        return (
            <div>
                <input type="text" value={filtering} onChange={(e) => setFiltering(e.target.value)} />
                <table className="table table-zebra table-pin-rows table-pin-cols">
                    <thead>
                        {table?.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {
                                            { asc: '^', desc: '' }[header.column.getIsSorted() ?? null]
                                        }
                                    </th>
                                ))}

                            </tr>
                        ))}

                    </thead>

                    <tbody>
                        {table?.getRowModel()?.rows?.map(row => (
                            <tr key={row.id}>
                                {row?.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}

                    </tbody>


                </table>

                <div className='flex gap-2'>
                    <button className='btn btn-ghost' onClick={() => table.setPageIndex(0)}>First Page</button>
                    <button className='btn btn-ghost' disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Previous Page</button>
                    <button className='btn btn-ghost' disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next Page</button>
                    <button className='btn btn-ghost' onClick={() => table.getPageCount() - 1}>Last Page</button>
                </div>
            </div>
        );
    }

};



export default FeaturedBlogs;