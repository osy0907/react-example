import './App.css';
import TOC from './components/TOC';
import Subject from './components/Subject';
import Content from './components/Content';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {  // App이 내부적으로 사용할 상태는 state를 사용한다.
      subject:{title:"WEB", sub:"World wide web!"},
      contents: [
        {id:1, title:"HTML", desc:"HTML is for information"},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'Javascript', desc:'Javascript is for interactive'}
      ]
    }
  }
  render() {
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}>
        </Subject>
        <Subject title="React" sub="so fun"></Subject>
        <TOC
        data={this.state.contents}></TOC>
        <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
      </div>
    )
  }
}
// State를 쓰는 것은 파일의 뚜껑을 열고 데이터가 바뀌엇다고 로직을 바꾸는 것을 하지않게 해준다.
export default App;
