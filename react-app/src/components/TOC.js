import { Component } from 'react';

class TOC extends Component {
  shouldComponentUpdate(newProps, newState) { // render 함수 먼저 실행됨.
    console.log('===> TOC render shouldComponentUpdate'
    ,newProps.data  // list.push, list.concat 을 구분지어서 쓰는이유. 불필요한 랜더링의 퍼포먼스의 차이를 해결할 수 잇다.
    ,this.props.data // 기존의 가지고 있던 props.data
  );
  if (this.props.data === newProps.data) {
    return false; // shouldComponentUpdate() return 값이 false면 해당컴포넌트의 render()함수를 실행시키지 않는다.
  }
  return true;
}
    render() { // render()가 호출되면 기존 props를 newProps로 초기화함.
        var lists = [];
        console.log(this.props.data); // 새로운 props.data
        var data = this.props.data;
        var i = 0;
        while(i < data.length) {
            lists.push(
            <li key={data[i].id}>
                <a 
                href={"content/"+data[i].id}
                data-id={data[i].id}
                onClick={function(e){
                    e.preventDefault();
                    this.props.onChangePage(e.target.dataset.id);
                }.bind(this)}>{data[i].title}
                </a>
            </li>);
            i = i + 1;
        }
      return (
        <nav>
          <ul>
            {lists}
          </ul>
        </nav>
      );
    }
  }

export default TOC; 