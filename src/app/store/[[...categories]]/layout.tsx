import React from 'react'

function Layout({children}:{children : React.ReactNode}) {
  return (
    <div>
        <nav>Navegacion entre categorys</nav>
        {children}
    </div>
  )
}

export default Layout