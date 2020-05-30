export function MenuAction(list) {
    return (dispatch) => {
        dispatch(getService())
            var menuList = [
                {
                    id: '1',
                    title: 'Guac de la Costa',
                    items: 'tortillas de mais, fruit le de passion, mango',
                    price: '12'
                },
                {
                    id: '2',
                    title: 'Chicharron y cerveza',
                    items: 'citron vert / Corona sauce',
                    price: '10'
                },
                {
                    id: '3',
                    title: 'chillitos',
                    items: 'pedrones tempura',
                    price: '7'
                },
                {
                    id: '4',
                    title: 'Aloo and Dal ki tikki',
                    items: 'tortillas de mais, fruit le de passion, mango',
                    price: '14'
                }
            ]
            dispatch(getServiceSuccess(menuList))
    }
}
export function getService() {
    return {
        type: 'onMenuList',
    }
}
export function getServiceSuccess(menuList) {
    return {
        type: 'onMenuListSuccess',
        menuList
    }
}
export function getServiceFailure() {
    return {
        type: 'onMenuListFailure',
    }
}