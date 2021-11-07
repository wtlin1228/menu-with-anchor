import {
  CategoryAnchorManagerProvider,
  CategoryChipPositionManagerProvider,
  ScrollSpyGroupManagerProvider,
} from './managers'

import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'

function App() {
  console.log('App rerender')

  return (
    <CategoryAnchorManagerProvider>
      <CategoryChipPositionManagerProvider>
        <ScrollSpyGroupManagerProvider>
          <div className="relative min-h-screen">
            <Header />
            <div className="container max-w-md min-h-screen mx-auto">
              <Menu />
              <Footer />
            </div>
          </div>
        </ScrollSpyGroupManagerProvider>
      </CategoryChipPositionManagerProvider>
    </CategoryAnchorManagerProvider>
  )
}

export default App
