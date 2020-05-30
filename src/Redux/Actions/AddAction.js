import { ToastAndroid } from 'react-native';
export function AddAction(action) {
    // alert(action)
    return (dispatch) => {
        dispatch(getService())
        if(action == 'increment'){
         var count = 0;
      
             ++count
        }else{
          count--
        }
        dispatch(getServiceSuccess(count))
    }
}
export function getService() {
    return {
        type: 'onCount',
    }
}
export function getServiceSuccess(count) {
    return {
        type: 'onCountSuccess',
        count
    }
}
export function getServiceFailure() {
    return {
        type: 'onCountFailure',
    }
}