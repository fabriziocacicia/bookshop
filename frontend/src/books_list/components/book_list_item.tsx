import DeleteButton from "./delete_button";
import EditButton from "./edit_button";

export default function BookListItem({id, title, author, year, price, onClickEdit, onClickDelete }: {id: string, title: string, author: string, year: number, price: number, onClickEdit: () => any, onClickDelete: () => any}) {
    return (
        <tr>
            <td>{id}</td>
            <td>{title}</td>
            <td>{author}</td>
            <td>{year}</td>
            <td>{price}€</td>
            <td>
                <EditButton onClick={onClickEdit} />
            </td>
            <td>
                <DeleteButton onClick={onClickDelete} />
            </td>
        </tr> 
    );
}