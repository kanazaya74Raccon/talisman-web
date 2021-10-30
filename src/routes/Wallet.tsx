import { Account, Wallet } from '@archetypes'
import { StateBanner } from '@archetypes/StateBanner'
import { device } from '@util/breakpoints'
import styled from 'styled-components'

const _Wallet = styled(({ className }) => {
  return (
    <section className={className}>
      <header>
        <div className="account-overview">
          <Wallet.Total />
          <Account.Button allAccounts />
        </div>
        <div className="banner">
          <StateBanner />
        </div>
      </header>
      <Wallet.Assets />
      <Wallet.Crowdloans />
      <Wallet.Staking />
    </section>
  )
})`
  width: 100%;
  max-width: 1280px;
  margin: 6rem auto;
  padding: 0 2.4rem;

  > * + * {
    margin-top: 4rem;
  }

  .account-overview {
    display: flex;
    flex-wrap: wrap-reverse;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;

    @media ${device.xxl} {
      width: auto;
      display: flex;
      flex-direction: column-reverse;
      align-items: start;
    }
  }

  .banner {
    min-width: 70%;
    flex: 1;
  }

  > header {
    display: flex;
    gap: 4rem;
    flex-wrap: wrap-reverse;
    align-items: center;
    margin-bottom: 4rem;
  }
`

export default _Wallet
