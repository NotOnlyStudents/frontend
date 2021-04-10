import { ChangeEvent } from "react"
import { Box } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

interface Props
{
    totalElements: number,
    limit: number,
    page: number,
    handleChangePagination: (event: ChangeEvent<unknown>, value: number) => void
}

function EMLPagination({totalElements, limit, page, handleChangePagination} : Props) : React.ReactElement
{
    const totalPage = totalElements / limit;

    console.log(page)

    return (
        <Box display='flex' justifyContent='center' alignItems='center'>
            <Pagination count={totalPage} page={page} onChange={handleChangePagination} />
        </Box>
    )
}


export default EMLPagination