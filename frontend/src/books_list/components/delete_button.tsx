import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {
    IconLookup,
    IconDefinition,
    findIconDefinition
  } from '@fortawesome/fontawesome-svg-core'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas)
const trashLookup: IconLookup = { prefix: 'fas', iconName: 'trash' }
const trashIconDefinition: IconDefinition = findIconDefinition(trashLookup)

export default function DeleteButton({ onClick }: { onClick: Function }) {
    return (
        <Button onClick={() => onClick()}>
            <FontAwesomeIcon icon={trashIconDefinition} />
        </Button>
    )
}