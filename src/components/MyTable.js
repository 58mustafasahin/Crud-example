import React from 'react'

const MyTable = ({ userId, id, title, completed }) => {
    return (

        <tr>
            <td>{id}</td>
            <td>{userId}</td>
            <td>{title}</td>
            <td>{completed}</td>
        </tr>

    )
}

export default MyTable
