export default function TableRows({ rowsData, deleteTableRows, type }) {
    return (

        rowsData.map((data) => {
            const { cost, name, id, categoryName } = data;
            return (
                <tr key={id}>
                    <td>
                        {name}
                    </td>
                    {cost && <td>${cost}</td>}
                    {categoryName && <td>{categoryName}</td>}

                    <td><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(type,id))}>x</button></td>
                </tr>
            )
        })

    )

}