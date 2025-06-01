import { IDockviewHeaderActionsProps } from 'dockview';
import { nextId } from '../../defaultLayout';
import { Plus } from 'lucide-react';

export const LeftControls = (props: IDockviewHeaderActionsProps) => {
    const onClick = () => {
        props.containerApi.addPanel({
            id: `id_${Date.now().toString()}`,
            component: 'default',
            title: `Tab ${nextId()}`,
            position: {
                referenceGroup: props.group,
            },
        });
    };

    return (
        <div
            className="group-control"
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0px 8px',
                height: '100%',
            }}
        >
            <Plus size={15} strokeWidth={2} onClick={onClick} />
        </div>
    );
};