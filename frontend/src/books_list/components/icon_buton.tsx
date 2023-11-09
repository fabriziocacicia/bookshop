import { IconName, library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {
    IconLookup,
    IconDefinition,
    findIconDefinition
  } from '@fortawesome/fontawesome-svg-core'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas)


export default function IconButton({ children, iconName, onClick }: { children?: any, iconName: IconName, onClick: () => any }) {
    const iconLookup: IconLookup = { prefix: 'fas', iconName: iconName }
    const iconDefinition: IconDefinition = findIconDefinition(iconLookup)
    
    return (
        <Button onClick={() => onClick()}>
            {children}
            <FontAwesomeIcon className='mx-2' icon={iconDefinition} /> 
        </Button>
    )
}