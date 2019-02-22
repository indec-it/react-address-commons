const roles = {
    NATIONAL_COORDINATOR: 'cn',
    NATIONAL_COORDINATOR_RO: 'ro',
    COORDINATOR: 'co',
    SUB_COORDINATOR: 'sc',
    SUPERVISOR: 'su',
    POLLSTER: 'po'
};

const optionsForUsersSelect = [
    {_id: null, name: '[Todos]'},
    {_id: 'su', name: 'Supervisor'},
    {_id: 'po', name: 'Actualizador'},
    {_id: 'cn', name: 'Coordinador Nacional'},
    {_id: 'ro', name: 'Coordinador Nacional (SL)'},
    {_id: 'co', name: 'Coordinador Provincial'},
    {_id: 'sc', name: 'Subcoordinador Provincial'}
];

export {optionsForUsersSelect};
export {roles};
