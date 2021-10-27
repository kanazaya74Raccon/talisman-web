import { ReactComponent as TalismanHandLogo } from '@assets/hand-red-black.svg'
import { ReactComponent as CrowdloansLogo } from '@assets/icons/crowdloans.svg'
import { ReactComponent as DiscordMobileLogo } from '@assets/icons/discord-mobile.svg'
import { ReactComponent as GithubMobileLogo } from '@assets/icons/github-mobile.svg'
import { ReactComponent as MediumMobileLogo } from '@assets/icons/medium-mobile.svg'
import { ReactComponent as MoreHorizontal } from '@assets/icons/more-horizontal.svg'
import { ReactComponent as PortfolioLogo } from '@assets/icons/portfolio.svg'
import { ReactComponent as SwapLogo } from '@assets/icons/swap.svg'
import { ReactComponent as TwitterMobileLogo } from '@assets/icons/twitter-mobile.svg'
import { Field } from '@components'
import Menu from '@components/Menu'
import { useExtension } from '@libs/talisman'
import { useMediaQuery } from '@util/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export default function HeaderState(props) {
  const isMobile = useMediaQuery('(max-width: 700px)')
  const [mobileMenuOpen, dispatch] = useReducer((state = false, action) =>
    action === 'toggle' ? !state : action === 'open' ? true : action === 'close' ? false : state
  )

  return <Header {...props} isMobile={isMobile} mobileMenuOpen={mobileMenuOpen} dispatch={dispatch} />
}

const mainRoutes = [
  { name: 'Portfolio', url: '/portfolio', icon: <PortfolioLogo alt="Portfolio" /> },
  {
    name: 'Crowdloans',
    url: '/crowdloans',
    icon: <CrowdloansLogo alt="Crowdloans" />,
  },
  { name: 'Buy DOT/KSM', url: '/buy', icon: <PortfolioLogo alt="Portfolio" /> },
]

const subRoutes = [
  {
    name: 'Request Features',
    url: 'https://talisman.canny.io/feature-requests',
    icon: <SwapLogo alt="Request Features" />,
  },
  { name: 'GitHub', url: 'https://github.com/talismansociety', icon: <GithubMobileLogo alt="GitHub" /> },
  {
    name: 'Discord',
    url: 'https://discord.gg/rQgTD9SGtU',
    icon: <DiscordMobileLogo alt="Discord" />,
  },
  { name: 'Twitter', url: 'https://twitter.com/wearetalisman', icon: <TwitterMobileLogo alt="Twitter" /> },
  { name: 'Medium', url: 'https://medium.com/we-are-talisman', icon: <MediumMobileLogo alt="Medium" /> },
]

const Header = styled(({ className, isMobile, mobileMenuOpen, dispatch }) => {
  const { t, i18n } = useTranslation('nav')
  const { status: extensionStatus } = useExtension()
  const homeRoute = ['LOADING', 'DISCONNECTED'].includes(extensionStatus) ? '/' : '/portfolio'

  const changeLanguage = language => {
    i18n.changeLanguage(language)
  }

  return (
    <header className={className}>
      <span>
        <NavLink exact to={homeRoute} className="logo">
          <TalismanHandLogo />
        </NavLink>
      </span>
      {!isMobile && (
        <nav className="main-nav">
          <NavLink exact to="/portfolio">
            {t('Portfolio')}
          </NavLink>
          <NavLink to="/crowdloans">{t('Crowdloans')}</NavLink>
          <NavLink to="/buy">{t('Buy')}</NavLink>
        </nav>
      )}
      <div className="menu-nav">
        <Field.Select
          options={i18n.languages.map(language => {
            return {
              key: language,
              value: t(language),
            }
          })}
          onChange={changeLanguage}
        />
        <Menu
          dropdownAlignment="right"
          ButtonComponent={
            <button className="mobile-nav-button">
              <MoreHorizontal />
            </button>
          }
        >
          <AnimatePresence>
            <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ul>
                {isMobile &&
                  mainRoutes.map(route => {
                    return (
                      <li key={route.name}>
                        <NavLink to={route.url}>
                          <span>{t(route.name)}</span>
                          {route.icon}
                        </NavLink>
                      </li>
                    )
                  })}
                {subRoutes.map(route => {
                  return (
                    <li key={route.name}>
                      <a href={route.url} target="_blank" rel="noreferrer noopener">
                        <span>{t(route.name)}</span>
                        {route.icon}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </motion.nav>
          </AnimatePresence>
        </Menu>
      </div>
    </header>
  )
})`
  display: grid;
  grid-template: 1fr / 1fr 1fr 1fr;
  padding: 0 2.4rem;
  width: 100%;
  box-shadow: 0 0 2.4rem rgba(0, 0, 0, 0.05);
  background: var(--color-controlBackground);

  > * {
    display: flex;
    align-items: center;

    &:nth-child(3n + 1) {
      justify-self: start;
    }
    &:nth-child(3n + 2) {
      justify-self: center;
    }
    &:nth-child(3n + 3) {
      justify-self: end;
    }
  }

  .logo {
    display: block;
    font-size: 3.2rem;
    color: var(--color-text);

    svg {
      display: block;
      width: auto;
      height: 1em;
    }
  }

  .main-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;

    > * {
      padding: 0.75rem 1rem;
      border-radius: 1rem;
      position: relative;

      &.active {
        color: var(--color-text);
        background: var(--color-activeBackground);
      }
    }
  }

  .menu-nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .external-nav {
    > a {
      font-size: 2.4rem;
      color: var(--color-primary);

      &:hover {
        color: var(--color-foreground);
      }
      &:active {
        color: var(--color-primary);
      }
      &:not(:first-child) {
        margin-left: 1.5rem;
      }

      > svg {
        display: block;
      }
    }
    > a.text-pill {
      padding: 0.8rem 1.2rem;
      border-radius: 999999rem;
      line-height: 1.4rem;
      font-size: 1.4rem;
      font-weight: 500;
      color: rgb(${({ theme }) => theme?.background});
      background: var(--color-primary);
      text-align: center;

      &:hover {
        background: var(--color-foreground);
      }
      &:active {
        background: var(--color-primary);
      }
    }
  }

  .mobile-nav-button {
    display: flex;
    align-items: center;
    border: none;
    cursor: pointer;
    background: var(--color-activeBackground);
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-radius: 1rem;
    transition: all 0.15s ease-in-out;
  }
  .mobile-nav {
    display: grid;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: calc(100% + 1rem);
    right: 1rem;
    padding: 1rem 2rem;
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.1);
    border-radius: 1.6rem;
    background: var(--color-controlBackground);

    > a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;

      > svg {
        border-radius: 100px;
        background: var(--color-activeBackground);
        color: var(--color-primary);
        font-size: 2.4rem;
        margin-left: 5rem;
      }
    }
  }

  @media only screen and (max-width: 913px) {
    .external-nav > a.text-pill {
      display: none;
    }
  }

  @media only screen and (max-width: 700px) {
    grid-template: 1fr / 1fr 1fr;

    > * {
      display: flex;
      align-items: center;

      &:nth-child(3n + 1) {
        justify-self: start;
      }
      &:nth-child(3n + 2) {
        justify-self: end;
      }
    }

    .logo svg {
      height: 1.5em;
    }

    .account-button {
      font-size: 0.8em;
    }
  }
`
