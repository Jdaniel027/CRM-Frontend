/**
 * DataTable — Tabla genérica con TanStack Table v8.
 *
 * Wrapper completo que incluye sorting por cabecera, paginación,
 * selección de filas y empty state. Cualquier módulo que necesite
 * una tabla reutiliza este componente.
 *
 * @typeParam TData - Tipo de los datos de cada fila
 * @typeParam TValue - Tipo de los valores de las columnas
 *
 * @example
 * ```tsx
 * import { DataTable, DataTableColumnHeader } from '@/components/data-table'
 * import type { ColumnDef } from '@tanstack/react-table'
 *
 * const columns: ColumnDef<Cliente, unknown>[] = [
 *   {
 *     accessorKey: 'nombre',
 *     header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
 *   },
 *   {
 *     accessorKey: 'email',
 *     header: 'Email',
 *   },
 *   {
 *     id: 'acciones',
 *     cell: ({ row }) => <Button>Ver</Button>,
 *   },
 * ]
 *
 * <DataTable
 *   columns={columns}
 *   data={clientes}
 *   onRowClick={(row) => navigate(`/clientes/${row.id}`)}
 * />
 * ```
 *
 * @see {@link FilterDropdown} para filtros combinados con la tabla
 */

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** Props del componente DataTable */
interface DataTableProps<TData, TValue> {
  /** Definición de columnas (formato TanStack Table) */
  columns: ColumnDef<TData, TValue>[]
  /** Datos a mostrar en la tabla */
  data: TData[]
  /** Placeholder del campo de búsqueda (no implementado aún) */
  searchPlaceholder?: string
  /** Columna para búsqueda (no implementado aún) */
  searchColumn?: string
  /** Cantidad de filas por página */
  pageSize?: number
  /** Callback al hacer clic en una fila */
  onRowClick?: (row: TData) => void
  /** Mensaje cuando no hay datos */
  emptyMessage?: string
}

/**
 * Componente DataTable genérico con paginación, sorting y selección.
 * Renderiza una tabla HTML estándar con estilos del CRM.
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  onRowClick,
  emptyMessage = 'No se encontraron resultados.',
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: { pagination: { pageSize } },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border bg-white">
        <table className="w-full caption-bottom text-sm">
          <thead className="border-b bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="h-11 px-4 text-left align-middle font-medium text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(
                    'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-muted-foreground">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Encabezado de columna con sorting.
 * Muestra el título clickeable para ordenar asc/desc.
 * Si la columna no es ordenable, muestra solo el título.
 *
 * @param column - Columna de TanStack Table
 * @param title - Título de la columna
 */
export function DataTableColumnHeader({
  column,
  title,
  className,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: any
  title: string
  className?: string
}) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <button
      className={cn('flex items-center space-x-1 hover:text-foreground', className)}
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      <span>{title}</span>
    </button>
  )
}
