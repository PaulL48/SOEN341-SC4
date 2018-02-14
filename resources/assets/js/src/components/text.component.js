import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './text.css';

export class Text extends Component {
    constructor(){
        super();
        this.state={
            
        };
    }
    render() {
        return (
            <div className="AuthenticatedRoutes">
                  <span id="title">Test React Component</span>
                  <span id="text">Steps to handle authenticated routes</span>
                  <span>1. Create an authenticated route in php</span>
                  <span>2. Add the react injection script : &lt;script src=&quot;&#123;&#123;mix&#40;&quot;js/NameOfTheComponent&quot;&#41;&#125;&#125;&quot;&gt; &lt;script/&gt;</span>
                  <span>3. Add mix.react &#40;&quot;resources/assets/js/src/components/NameOfTheComponent.js&quot;, &quot;public/js&quot;&#41;; In the webpack.mix.js file</span>
                  <span>4. Done, should work!</span>
            </div>
        );
    }
}

ReactDOM.render(<Text />, document.getElementById('component'));




