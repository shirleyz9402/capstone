import React from 'react'
import {ReactReader} from 'react-reader'
import {
  Container,
  ReaderContainer,
  Bar,
  CloseButton,
  CloseIcon,
  FontSizeButton
} from '../containers/EpubContainer'



const storage = global.localStorage || null

export default class Reader extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      fullscreen: process.env.NODE_ENV !== 'production',
      location:
        storage && storage.getItem('epub-location')
          ? storage.getItem('epub-location')
          : 2,
      largeText: false
    }
    this.rendition = null
  }

  toggleFullscreen = () => {
    this.setState(
      {
        fullscreen: !this.state.fullscreen
      },
      () => {
        setTimeout(() => {
          const evt = document.createEvent('UIEvents')
          evt.initUIEvent('resize', true, false, global, 0)
        }, 1000)
      }
    )
  }

  onLocationChanged = location => {
    this.setState(
      {
        location
      },
      () => {
        storage && storage.setItem('epub-location', location)
      }
    )
  }

  onToggleFontSize = () => {
    const nextState = !this.state.largeText
    this.setState(
      {
        largeText: nextState
      },
      () => {
        this.rendition.themes.fontSize(nextState ? '140%' : '100%')
      }
    )
  }

  getRendition = rendition => {
    // Set inital font-size, and add a pointer to rendition for later updates
    const { largeText } = this.state
    this.rendition = rendition
    rendition.themes.fontSize(largeText ? '140%' : '100%')
  }

  render(){
    // console.log(this.props.book.url)
    const { location } = this.state
    return (
      <div>
      <Container>
        <Bar>
          <CloseButton onClick={this.toggleFullscreen}>
            Use full browser window
            <CloseIcon />
          </CloseButton>
        </Bar>
        <ReaderContainer>
          <ReactReader
            url={this.props.book}
            locationChanged={this.onLocationChanged}
            title={this.props.book.title}
            location={location}
            getRendition={this.getRendition}
          />
          <FontSizeButton onClick={this.onToggleFontSize}>
            Toggle font-size
          </FontSizeButton>
        </ReaderContainer>
      </Container>
      </div>
    )
  }
}
