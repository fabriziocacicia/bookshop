import IconButton from './icon_buton';

export default function DeleteButton({ onClick }: { onClick: () => any }) {
    return (
        <IconButton iconName='trash' onClick={() => onClick()}/>
    )
}