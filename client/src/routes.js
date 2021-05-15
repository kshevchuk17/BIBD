import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'
import { CreditsTypePage } from './pages/CreditsTypePage'
import { DepositsTypePage } from './pages/DepositsTypePage'
import { DepositsPage } from './pages/DepositsPage'
import { CreditsPage } from './pages/CreditsPage'
import { CreateRequestDepositPage } from './pages/RequestForOpeningDeposit'
import { CreateRequestCreditPage } from './pages/RequestForOpeningCredit'




export const useRoutes = isAutentificated => {
    if (isAutentificated) {
        return (
            <Switch>
                <Route path="/profile/create/" exact>
                    <CreatePage />
                </Route>
                <Route path="/profile/detail/" exact>
                    <DetailPage />
                </Route>
                <Route path="/credit_type/all/" exact>
                    <CreditsTypePage />
                </Route>
                <Route path="/deposit_type/all/" exact>
                    <DepositsTypePage />
                </Route>
                <Route path="/deposit/all/" exact>
                    <DepositsPage />
                </Route>
                <Route path="/credit/all/" exact>
                    <CreditsPage />
                </Route>
                <Route path="/deposit/request_for_opening/" exact>
                    <CreateRequestDepositPage />
                </Route>
                <Route path="/credit/request_for_opening/" exact>
                    <CreateRequestCreditPage />
                </Route>
                <Redirect to="/profile/detail/" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect path="/" exact />
        </Switch>
    )
}