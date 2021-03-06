import './App.css';
import TOC from './components/TOC';
import Subject from './components/Subject';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import ReadContent from './components/ReadContent';
import Control from './components/Control';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {  // App이 내부적으로 사용할 상태는 state를 사용한다.
      mode:'welcome',
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

  getReadContent() {
    var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          return data;
        }
        i = i + 1;
      }
  }

  getContent() {
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') { 
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent()
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc) {
        // add content to this.state.contents
        this.max_content_id = this.max_content_id+1;
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // ); 
        // state의 값을 바뀌겟지만 react가 모르기 때문에 setState()함수로 알려줘야 함.
        // 그래야 state변경을 알고 rerender를 할 것임.
        var _contents = this.state.contents.concat( // concat 원본 객체의 값을 결합해서 새로운 객체 리턴.
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        // 새로운 객체 리턴 방법. 객체 Object.assign, 배열 Array.from
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc) {
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while (i < _contents.length) {
          if (_contents[i].id === _id) {
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i = i + 1;
        }
        this.setState({
          contents:_contents,
          mode:'read'
        });
        console.log(_title, _desc);
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  render() {
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
        {/* <Subject title="React" sub="so fun"></Subject> */}
        <TOC
        onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id:Number(id)
          });
        }.bind(this)} // 120line -> contents의 객체의 값으로 이전 props, 이후 props 비교로 rerender를 결정해서 퍼포먼스를 향상 시킬 수 잇다.
        data={this.state.contents}></TOC> 
        <Control onChangeMode={function(_mode){
          if (_mode === 'delete') {
            if (window.confirm('really?')) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while (i < _contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1);
                  break;
                }
                i = i + 1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('deleted');
            }
          } else {
            this.setState({
              mode:_mode
            })  
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    )
  }
}
// State를 쓰는 것은 파일의 뚜껑을 열고 데이터가 바뀌엇다고 로직을 바꾸는 것을 하지않게 해준다.
export default App;
