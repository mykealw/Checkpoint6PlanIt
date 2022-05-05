import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      // logger.log(res.data, "account service");
      AppState.account = res.data
      // logger.log(AppState.account, "$$$$")
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(account) {
    // logger.log(account, "this  came through")
    const res = api.put('account', account)
    // logger.log(res, "res.data 1111")
    // logger.log(AppState.user, "user")
    AppState.account = account
  }
}

export const accountService = new AccountService()
