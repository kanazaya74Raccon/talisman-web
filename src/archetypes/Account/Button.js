import { 
  useState,
} from 'react'
import styled from 'styled-components'
import Identicon from '@polkadot/react-identicon';
import { Keyring } from '@polkadot/keyring';
import { 
  useAccount, 
  useGuardian
} from '@libs/talisman'
import { Button, Pendor } from '@components'
import { truncateString } from '@util/helpers'
import { ReactComponent as ChevronDown } from '@icons/chevron-down.svg'
import { useChainByGenesis } from '@libs/talisman'

// format an address based on chain ID, derived from genesis ID
// as returned from polkadot.js extension API
const Address = 
  ({
    address,
    genesis,
    truncate=false
  }) => {
    const keyring = new Keyring();
    const { id } = useChainByGenesis(genesis)
    const encoded = keyring.encodeAddress(address, id)

    return !!truncate
      ? truncateString(encoded, truncate[0]||4, truncate[1]||4)
      : encoded
  }

const Dropdown = styled(
  ({
    handleClose,
    className
  }) => {

    const { switchAccount } = useAccount()
    const { accounts } = useGuardian()

    return <span
      className={`account-picker ${className}`}
      >
      {
        accounts.map(({address, name, genesisHash, balance}) => 
          <div
            className='account'
            onClick={() => {
              switchAccount(address)
              handleClose()
            }}
            >
            <span className="left">
              <Identicon
                className='identicon'
                value={address}
                theme={'polkadot'}
              />
              <span
                className='name-address'
                >
                <span
                  className='name'
                  >
                  {truncateString(name, 10, 0)}
                </span>
                <span
                  className='address'
                  >
                  <Address 
                    address={address}
                    genesis={genesisHash}
                    truncate
                  />
                </span>
              </span>
            </span>
           
            <span className="right">
              <Pendor
                suffix=' KSM'
                require={!!balance?.total}
                >
                {balance?.total}
              </Pendor>
            </span>
          </div>
        )
      }
    </span>
  })
  `
    background: rgb(${({ theme }) => theme?.background});
    font-size: 0.8em;
    width: 26em;
    font-size: 1em;
    max-height: 0;
    overflow: hidden;
    border-radius: 1.2rem;
    box-shadow: 0 0 1.2rem rgba(0, 0, 0, 0.1);


    >.account{
      display: flex;
      align-items: center;
      padding: 1.2em;
      width: 100%;
      cursor: pointer;
      justify-content: space-between;
      transition: all 0.15s;

      span{
        display: flex;
        align-items: center;
      }

      .identicon{
        font-size: 2.6em;
      }

      .name-address{
        display: flex;
        align-items: flex-end;
        line-height: 1em;
        *{
           line-height: 1em;
        }
      }

      .name{
        margin-left: 0.4em;
        font-weight: bold;
        letter-spacing: -0.03em
      }

      .address{
        font-size: 0.85em;
        opacity: 0.5;
        margin-left: 0.6em;
      }

      &:hover{
        background: rgba(0,0,0,0.1)
      }
    }

    ${({open}) => !!open && `
      max-height: 40rem;
    `}
  `

const Unavailable =
  ({
    className
  }) => {
    return <Button
      className={`account-button ${className}`}
      small
      primary
      onClick={() => window.open('https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd', "_blank")}
      >
      Install Polkadot.js Extension
    </Button>
  }

const NoAccount = styled(
  ({
    className
  }) => {
    return <Button
      className={`account-button ${className}`}
      >
      {`Polkadot{.js}`}<br/>
      <span className='subtext'>Requires Configuration</span>
    </Button>
  })
  `
    text-align: center;
    line-height: 1em;
    display: block;
    padding: 0.6em;
    cursor: default;
    .subtext{
      font-size: 0.7em;
      opacity: 0.7;
      text-transform: uppercase;
      font-weight: var(--font-weight-regular)
    }
  `

const Authorized = styled(
  ({
    className
  }) => {
    const { address, name, balance } = useAccount()
    const [open, setOpen] = useState(false)

    return <span
      className={`account-button ${className}`}
      onMouseLeave={() => setOpen(false)}
      >
      <Identicon
        className='identicon'
        value={address}
        theme={'polkadot'}
      />
      <span
        className='selected-account'
        >
        <div>{name}</div>
        <div>
          <Pendor
            suffix=' KSM'
            require={!!balance?.total}
            >
            {balance?.total}
          </Pendor>
        </div>
      </span>

      <Button.Icon
        className='nav-toggle'
        onMouseEnter={() => setOpen(true)}
        >
        <ChevronDown/>
      </Button.Icon>

      <Dropdown 
        open={open}
        handleClose={() => setOpen(false)}
      />
    </span>
  })
  `
    font-size: inherit;
    display: flex;
    align-items: center;
    padding: 0;
    position: relative;

    >.identicon{
      margin-right:  0.3em;
      >svg{
        width: 2.5em;
        height: 2.5em;
      }
    }

    >.nav-toggle{
      margin-left: 0.5em;
    }

    >.selected-account{
      display: block;
      margin-left: 0.4em;
      >div{
        line-height: 1.3em;
        &:first-child{
          font-weight: var(--font-weight-bold);
          width: 6.7em;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        &:last-child{
          opacity: 0.3;
          font-size: 0.9em;
        }
      }
    }

    .account-picker{
      position: absolute;
      top: 100%;
      right: 0;
    }
  `


const AccountButton = () => {
  const { status } = useAccount()
  switch (status) {
    case 'AUTHORIZED': return <Authorized/>
    case 'UNAVAILABLE': return <Unavailable/>
    case 'NOACCOUNT': return <NoAccount/>
    default: return null
  }
}

export default AccountButton