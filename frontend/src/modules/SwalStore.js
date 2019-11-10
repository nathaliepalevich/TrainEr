import SwalService from '../services/SwalService.js'

export default {
     actions: {
        async  notRegAlert(context, {msg}) {
             const alertToShow = await SwalService.notRegAlert(msg)
                         return alertToShow
          },
        async  toggleLsnSub(context, {msg}) {
             const alertToShow = await SwalService.toggleLsnSub(msg)
             return alertToShow
          },
          async  successMsg(context, {msg}) {
             const alertToShow = await SwalService.successMsg(msg)
                         return alertToShow
          },
     },
}
