import styled from 'styled-components'

type ContentProps = {
  children: React.ReactNode,
  className: React.ReactNode,
}

const Content = styled(({ children, className }: ContentProps) => <main className={className}>{children}</main>)`
  display: block;
  min-height: 100vh;
  margin: 0 auto;
`

export default Content
