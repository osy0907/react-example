import './App.css';
import TOC from './components/TOC';
import Subject from './components/Subject';
import Content from './components/Content';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {  // App이 내부적으로 사용할 상태는 state를 사용한다.
      mode:'read',
      selected_content_id:2,
      subject:{title:"WEB", sub:"World wide web!"},
      welcome:{title:'Welcome', desc:'Hello, React!'},
      contents: [
        {id:1, title:"HTML", desc:"HTML is for information"},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'Javascript', desc:'Javascript is for interactive'}
      ]
    }
  }
  render() {
    var _title, _desc = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
    }
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'})
          }.bind(this)}
          >
        </Subject>
        {/* <header>
            <h1><a href="/" onClick={function(e){ // react에서는 이벤트 함수가 호출될 때 첫 번째 매개변수의 값으로 event라는 객체를 주입해 주기로 약속돼 있다.
            console.log(e.metaKey);               // onClick func 안에서는 this가 컴포넌트 자기자신을 가르키지 않고 아무값도 셋팅되어 있지 않음.
            e.preventDefault();
            // this.state.mode = 'welcome';
            this.setState({
              mode:'welcome'
            });
            }.bind(this)}>{this.state.subject.title}</a></h1> // func 내부 this는 아무것도 가르키지 않는데 bind함수에 객체를 인자로 주면 객체가 주입 된 해당 함수를 리턴
            {this.state.subject.sub}
        </header>  */}
        <Subject title="React" sub="so fun"></Subject>
        <TOC
        onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id:Number(id)
          });
        }.bind(this)}
        data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    )
  }
}
// State를 쓰는 것은 파일의 뚜껑을 열고 데이터가 바뀌엇다고 로직을 바꾸는 것을 하지않게 해준다.
export default App;
