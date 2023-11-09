import IconButton from "../books_list/components/icon_buton";

export default function SearchIcon({ onClick }: { onClick: () => any }) {
    return (
        <IconButton iconName="magnifying-glass" onClick={onClick}>AI</IconButton>
    )
}