import React from 'react';

interface SidebarElementProps {
    route: string
    value: string
    clickAction?: () => void
    icon: React.ReactNode
}

const SidebarElement: React.FC<SidebarElementProps> = ({route, value, icon, clickAction}) => {
    return (
        <a href={route} onClick={clickAction} className="flex items-center text-white hover:text-gray-400">
            {icon}
            {value}
        </a>
    )
}

export default SidebarElement