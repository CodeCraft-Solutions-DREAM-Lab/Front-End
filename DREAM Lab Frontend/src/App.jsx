import ImageSlider from './Home/ImageSlider'
import SpeechBotCard from './Home/SpeechBotCard'
import './output.css'
import './App.css'

const OPTIONS = { dragFree: true, loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const unsplash_prefix = 'https://images.unsplash.com/photo-'
const unsplash_suffix = '?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
const IMAGES = [`${unsplash_prefix}1524781289445-ddf8f5695861${unsplash_suffix}`,
`${unsplash_prefix}1610194352361-4c81a6a8967e${unsplash_suffix}`,
`${unsplash_prefix}1618202133208-2907bebba9e1${unsplash_suffix}`,
`${unsplash_prefix}1548021682-1720ed403a5b${unsplash_suffix}`,
`${unsplash_prefix}1496753480864-3e588e0269b3${unsplash_suffix}`,
`${unsplash_prefix}1613346945084-35cccc812dd5${unsplash_suffix}`,
`${unsplash_prefix}1516681100942-77d8e7f9dd97${unsplash_suffix}`,]

function App() {
  return (
    <>
      <SpeechBotCard width='100%' height='18rem' />

      <br />
      <ImageSlider images={IMAGES} options={OPTIONS} />
      <br />
      <ImageSlider images={IMAGES} options={OPTIONS} />
      <br />
      <ImageSlider images={IMAGES} options={OPTIONS} />

    </>
  )
}

export default App
