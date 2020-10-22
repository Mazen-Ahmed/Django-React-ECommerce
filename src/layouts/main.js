import React, { Component } from 'react'
import NavBar from './navbar'
import Footer from './footer'


class Main extends Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
      }
    render() {
        return (
            <div className='flex flex-col min-h-screen bg-gray-100 w-full' ref={this.wrapper} >
                <NavBar/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}
export default Main;