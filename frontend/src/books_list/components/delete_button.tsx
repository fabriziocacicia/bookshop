import IconButton from './icon_button';

export default function DeleteButton({ onClick }: { onClick: () => any }) {
    return (
        <IconButton iconName='trash' onClick={() => onClick()}/>
    )
}