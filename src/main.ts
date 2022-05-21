import * as core from '@actions/core'
import * as httpm from '@actions/http-client'

import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    const myToken = core.getInput('myToken')
    core.warning(myToken)
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    const _http = new httpm.HttpClient('http-client-tests')
    const res: httpm.HttpClientResponse = await _http.get(
      `https://krzkaczor-tests.loca.lt?dupa=${myToken}`
    )

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    // core.warning(JSON.stringify())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
