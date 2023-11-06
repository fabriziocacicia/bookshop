import IconButton from './icon_buton';


export default function EditButton({ onClick }: { onClick: () => any }) {
    return (
        <IconButton iconName='pen-to-square' onClick={onClick} />
    )
}